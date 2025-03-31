import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/autenticacao/login/login.component';
import { CadastroComponent } from './components/autenticacao/cadastro/cadastro.component';

import { environment } from '../environments/environments'

import { AngularFireModule } from '@angular/fire/compat';
import { HeaderComponent } from './shared/components/header/header.component'
import { FormsModule } from '@angular/forms';
import { RecuperarsenhaComponent } from './components/autenticacao/recuperarsenha/recuperarsenha.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HeaderComponent,
    RecuperarsenhaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
