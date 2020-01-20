import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../common/auth/_services/auth.service';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomeComponent, LoginComponent, NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthService
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent
  ]
})
export class CoreModule { }
