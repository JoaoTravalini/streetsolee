import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  images: string[] = [
    '../../../../assets/images/airjordan.jpg',
    '../../../../assets/images/nikedunk.jpg',
    '../../../../assets/images/puma180.jpg'
  ];
  currentImageIndex = 0;
  intervalId: any;

  public email: string = '';
  public password: string = '';

  constructor (private auth: AuthService) { }

  ngOnInit() {
    this.startImageCarousel();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Controla o tempo em que o carrossel de imagens muda e faz um loop circular
  startImageCarousel() {
    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 3000); 
  }

  // Login com google
  signInWithGoogle() {
    this.auth.googleSignIn();
  }

  // Login com email e senha
  login() {
    if(this.email === '' || this.password === '') {
      alert('Preencha todos os campos!');
      return;
    }

    this.auth.login(this.email, this.password);

    this.email = '';
    this.password = '';
  }
}
