import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  images: string[] = [
    '../../../../assets/images/airjordan.jpg',
    '../../../../assets/images/nikedunk.jpg',
    '../../../../assets/images/puma180.jpg'
  ];
  currentImageIndex = 0;
  intervalId: any;

  public email: string = '';
  public password: string = '';

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.startImageCarousel();
  }

  ngAfterViewInit() {
    this.setupPanelSwitch();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startImageCarousel() {
    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      const overlay = document.querySelector<HTMLElement>('.overlay');
      if (overlay) {
        overlay.style.backgroundImage = `url('${this.images[this.currentImageIndex]}')`;
      }
    }, 3000);
  }

  setupPanelSwitch() {
    const registerButton = document.getElementById('register');
    const loginButton = document.getElementById('login');
    const container = document.getElementById('container');
    
    if (registerButton && loginButton && container) {
      registerButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
      });
      
      loginButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
      });
    }
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }

  login() {
    if (this.email === '' || this.password === '') {
      alert('Preencha todos os campos!');
      return;
    }
    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
