import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoaderService } from '../common/services/loader.service';
import { LanguageTranslationModule } from '../common/language-translation/language-translation.module';
import { NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomeComponent, LoginComponent, NotFoundComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    LanguageTranslationModule,
    NgbDropdownModule,
  ],
  providers: [
    LoaderService
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NgbDropdownModule
  ]
})
export class CoreModule { }
