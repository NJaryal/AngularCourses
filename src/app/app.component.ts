import { Component, OnInit } from '@angular/core';
import { LoaderService } from './common/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public loaderService: LoaderService) {

  }
  title = 'courses-app';

  ngOnInit() {
    this.loaderService.isFullScreenLoader = false;
  }

}
