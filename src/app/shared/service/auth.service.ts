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
