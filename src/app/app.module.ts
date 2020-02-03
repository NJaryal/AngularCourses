import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './courses/courses.module';
import {BreadcrumbModule} from 'angular-crumbs';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthGuard } from './common/auth/_guards/auth.guard';
import { AlertService, AuthService, UserService } from './common/auth/_services';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './common/_helpers';
import { AlertComponent } from './common/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderService } from './common/services/loader.service';
import { reducer } from './store/reducers/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from './store/effects/auth.effects';
import { reducers } from './store/app.state';
import { TranslateService} from '@ngx-translate/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
    BrowserAnimationsModule,
    EffectsModule.forRoot([AuthenticationEffects]),
    StoreModule.forRoot(reducers, {}),
    NgbModule,
  ],
  providers: [
    AuthGuard,
    AlertService,
    TranslateService,
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
