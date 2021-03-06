import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './courses/courses.module';
import {BreadcrumbModule} from 'angular-crumbs';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './common/auth/_guards/auth.guard';
import { AlertService, AuthService, UserService } from './common/auth/_services';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './common/_helpers';
import { AlertComponent } from './common/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderService } from './common/services/loader.service';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BreadcrumbModule,
    CoreModule,
    CoursesModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthService,
    UserService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
