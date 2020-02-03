import { LoaderService } from './../../common/services/loader.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, AlertService } from '../../common/auth/_services';
import { NgxSpinnerService } from "ngx-spinner";
import { Store } from '@ngrx/store';
import { AppState,selectAuthenticationState  } from '../../store/app.state';
import { User } from 'src/app/common/models/user.model';
import { Observable } from 'rxjs';
import { Login } from 'src/app/store/actions/auth.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string = null;
  language: string;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    public mainService: LoaderService,
    private translate: TranslateService,
    private store: Store<AppState>
  ) {  this.getState = this.store.select(selectAuthenticationState);}

  ngOnInit() {
    this.spinner.show();

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.spinner.hide();
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.spinner.show();
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const actionPayload = {
      username: this.loginForm.value["username"],
      password: this.loginForm.value["password"]
    };
    this.store.dispatch(new Login(actionPayload));
    this.spinner.hide();
  }
}

