import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from 'src/app/common/services/loader.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  language: string;
  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.translate.use(this.language);
  }

}
