import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { environment } from '../../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  // Login com email e senha
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token', 'true')
      if (res.user?.emailVerified == true) {
        this.router.navigate(['/header']);
      } else {
        this.sendEmailForVerification(res.user);
        alert('Verifique seu email, um link foi enviado');
      }
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    });
  }

  // Cadastro com email e senha
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(async res => {
      if (res.user) {
        await this.sendEmailForVerification(res.user);  // Agora aguarda a execução corretamente
        alert('Registro realizado com sucesso! Verifique seu email para ativar sua conta.');
        this.router.navigate(['/login']);
      }
    }).catch(err => {
      alert(err.message);
      console.error('Erro ao cadastrar:', err);
    });
  }

  // Sair da conta
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    });
  }

  // Redefinição de senha
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/recuperar-senha']);
    }, err => {
      alert('Algo deu errado');
    });
  }

  // Verificação de Email
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

  //Método para fazer login com o google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(async res => {
      this.router.navigate(['/cadastro']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid))
    }).catch(err => {
      alert(err.message);
    });
  }
}
