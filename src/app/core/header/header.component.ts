import { User } from './../../common/models/user.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/auth/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User;
  constructor(private authenticationService: AuthService) { }

  ngOnInit() {
    this.authenticationService.userSubject.subscribe(user => {
      this.user = user;
    });
  }

  onLogOut() {
    this.authenticationService.logout();
  }

}
