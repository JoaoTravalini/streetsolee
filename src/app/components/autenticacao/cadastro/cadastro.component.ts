import { Component } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  // Registro
  public name: string = '';
  public email: string = '';
  public tel: string = '';
  public gender: string = '';
  public password: string = '';
  public confirmPassword: string = '';

  constructor(private auth: AuthService) { }

  // Registro com email e senha
  register() {
    if (this.name === '' || this.email === '' || this.tel === '' || 
        this.gender === '' || this.password === '' || this.confirmPassword === '') {
      alert('Preencha todos os campos!');
      return;
    }

    if (!this.validateEmail(this.email)) {
      alert('Por favor, insira um e-mail válido!');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (this.password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres!');
      return;
    }

    this.auth.register(this.email, this.password);

    // Limpa os campos
    this.name = '';
    this.email = '';
    this.tel = '';
    this.gender = '';
    this.password = '';
    this.confirmPassword = '';
  }

  private validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }
}
