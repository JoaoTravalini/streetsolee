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
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/header']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    });
  }

  // Cadastro com email e senha
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      alert('Registrado com sucesso!');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/cadastro']);
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

  //método para fazer login com o google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(async res => {
      this.router.navigate(['/cadastro']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid))
    }).catch(err => {
      alert(err.message);
    });
  }
}
