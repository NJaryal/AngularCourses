import { User } from './../../common/models/user.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/auth/_services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from 'src/app/common/services/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User;
  language: string;
  constructor(private authenticationService: AuthService,
    private translate: TranslateService,
    private mainService: LoaderService) {

  }

  ngOnInit() {
    this.mainService.currentLanguageData.subscribe(language => this.language = language);
    this.translate.use(this.language);
    this.authenticationService.userSubject.subscribe(user => {
      this.user = user;
    });
  }

  onLogOut() {
    this.authenticationService.logout();
  }

  onLangTranslate(lang: string) {
    this.translate.use(lang);
  }


}
