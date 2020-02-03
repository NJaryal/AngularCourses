import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {
  isFullScreenLoader: boolean;
  constructor() { }

  private languageData = new BehaviorSubject('en');
  currentLanguageData = this.languageData.asObservable();

  changeLanguageData(data: string) {
    this.languageData.next(data);
  }
}
