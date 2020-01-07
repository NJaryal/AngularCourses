import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/auth/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthService) { }

  ngOnInit() {}

  onLogOut() {
    this.authenticationService.logout();
  }

}
