import { Component } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';

@Component({
  selector: 'app-recuperarsenha',
  templateUrl: './recuperarsenha.component.html',
  styleUrl: './recuperarsenha.component.scss'
})
export class RecuperarsenhaComponent {

  public email: string = '';

  constructor(private auth: AuthService) { }

  forgotPassword() {
    this.auth.forgotPassword(this.email);

    this.email = '';

    alert('Um link foi enviado para seu email para a redefinição de senha');
  }
}
