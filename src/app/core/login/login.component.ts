import { LoaderService } from './../../common/services/loader.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, AlertService } from '../../common/auth/_services';
import { NgxSpinnerService } from "ngx-spinner";
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { User } from 'src/app/common/models/user.model';
import { Observable } from 'rxjs';
import { LogIn } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  user: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    public mainService: LoaderService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.spinner.hide();

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.spinner.show();

    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value);
    if (localStorage.getItem('currentUser') === 'Unauthorized') {
      alert("Unauthorized User");
      this.loading = false;
    }
    this.spinner.hide();
    const payload = {
      email: this.user.username,
      password: this.user.password
    };
    this.store.dispatch(new LogIn(payload));
  }
}

