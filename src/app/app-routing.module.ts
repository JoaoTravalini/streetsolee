import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/autenticacao/login/login.component';
import { CadastroComponent } from './components/autenticacao/cadastro/cadastro.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { RecuperarsenhaComponent } from './components/autenticacao/recuperarsenha/recuperarsenha.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'recuperar-senha', component: RecuperarsenhaComponent},
  { path: 'header', component: HeaderComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
