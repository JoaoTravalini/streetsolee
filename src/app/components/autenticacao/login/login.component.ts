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

  constructor (private auth: AuthService) { }

  ngOnInit() {
    this.startImageCarousel();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startImageCarousel() {
    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }, 3000); 
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }
}
