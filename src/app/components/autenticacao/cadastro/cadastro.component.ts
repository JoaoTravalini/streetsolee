import { Component } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  public email: string = '';
  public password: string = '';
  public confirmPassword: string = '';
  public name: string = '';
  public tel: string = '';
  public gender: string = '';

  constructor(private auth: AuthService) { }

  // Login com email e senha
  register() {
    if (this.email === '' || this.password === '') {
      alert('Preencha todos os campos!');
      return;
    } else if (this.password != this.confirmPassword) {
      alert('Os campos senha e confirmação de senha devem ser idênticos!');
    }

    this.auth.register(this.email, this.password);

    // Todos os dados preenchidos no cadastro podem ser salvos a partir daqui
    console.log(this.email, this.password, this.name, this.tel, this.gender);

    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.name = '';
    this.tel = '';
    this.gender = '';
  }
}
