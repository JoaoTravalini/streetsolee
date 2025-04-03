import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

  // Imagens background
  images: string[] = [
    '../../../../assets/images/airjordan.jpg',
    '../../../../assets/images/nikedunk.jpg',
    '../../../../assets/images/puma180.jpg'
  ];
  currentImageIndex = 0;
  intervalId: any;

  // Login
  public email: string = '';
  public password: string = '';

  // Registro
  public registerEmail: string = '';
  public registerPassword: string = '';
  public confirmPassword: string = '';
  public name: string = '';
  public tel: string = '';
  public gender: string = '';

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

  signInWithGoogle(event: Event) {
    event?.preventDefault();
    this.auth.googleSignIn();
  }

  login() {
    if (this.email === '' || this.password === '') {
      alert('Preencha todos os campos!');
      return;
    }
    
    if (!this.validateEmail(this.email)) {
      alert('Por favor, insira um e-mail válido!');
      return;
    }
    
    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  register() {
    if (this.name === '' || this.registerEmail === '' || this.tel === '' || 
        this.gender === '' || this.registerPassword === '' || this.confirmPassword === '') {
      alert('Preencha todos os campos!');
      return;
    }

    if (!this.validateEmail(this.registerEmail)) {
      alert('Por favor, insira um e-mail válido!');
      return;
    }

    if (this.registerPassword !== this.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (this.registerPassword.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres!');
      return;
    }

    this.auth.register(this.registerEmail, this.registerPassword);
    
    // Limpa os campos
    this.name = '';
    this.registerEmail = '';
    this.tel = '';
    this.gender = '';
    this.registerPassword = '';
    this.confirmPassword = '';
  }

  private validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }
}