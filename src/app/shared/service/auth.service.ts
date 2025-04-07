import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { environment } from '../../../environments/environments';
import * as jose from 'jose';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  async login(email: string, password: string) {
    try {
      const res = await this.fireauth.signInWithEmailAndPassword(email, password);
      if (res.user?.emailVerified) {
        const token = await this.generateJWTToken({ email });
        this.setJWTToken(token);
        this.router.navigate(['']);
      } else {
        await this.sendEmailForVerification(res.user);
        alert('Verifique seu email, um link foi enviado');
      }
    } catch (err: any) {
      alert(err.message);
      this.router.navigate(['/login']);
    }
  }

  async register(email: string, password: string) {
    try {
      const res = await this.fireauth.createUserWithEmailAndPassword(email, password);
      if (res.user) {
        await this.sendEmailForVerification(res.user);
        alert('Registro realizado com sucesso! Verifique seu email para ativar sua conta.');
        this.router.navigate(['/login']);
      }
    } catch (err: any) {
      alert(err.message);
    }
  }

  logout() {
    this.fireauth.signOut().then(() => {
      this.removeJWTToken();
      this.router.navigate(['/login']);
    });
  }

  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/recuperar-senha']);
    }).catch(() => {
      alert('Algo deu errado');
    });
  }

  async sendEmailForVerification(user: any) {
    try {
      if (user) {
        await user.sendEmailVerification();
        alert('Um link de verificação foi enviado para seu email.');
      }
    } catch (err) {
      console.error('Erro ao enviar email de verificação:', err);
    }
  }

  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(async res => {
      const token = await this.generateJWTToken({ email: res.user?.email });
      this.setJWTToken(token);
      this.router.navigate(['']);
    }).catch(err => {
      alert(err.message);
    });
  }

  // JWT --------------------------

  async generateJWTToken(payload: any): Promise<string> {
    const alg = 'HS256';
    const jwt = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer('urn:example:issuer')
      .setAudience('urn:example:audience')
      .sign(environment.secret);
    return jwt;
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      await jose.jwtVerify(token, environment.secret, {
        issuer: 'urn:example:issuer',
        audience: 'urn:example:audience'
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  decodeJWT(): any {
    const token = JSON.parse(localStorage.getItem('token') || 'null');
    try {
      return jose.decodeJwt(token);
    } catch {
      return null;
    }
  }

  setJWTToken(token: string) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  removeJWTToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && this.decodeJWT();
  }
}
