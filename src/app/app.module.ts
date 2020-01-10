

// MUST BE IN THIS ORDER!
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import { enableProdMode, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeModule } from '@angular/upgrade/static';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoursesModule } from './courses/courses.module';
import {BreadcrumbModule} from 'angular-crumbs';
import { FormsModule } from '@angular/forms';

if (!isDevMode()) {
  enableProdMode();
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UpgradeModule,
    AppRoutingModule,
    BreadcrumbModule,
    CoreModule,
    CoursesModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
  ngDoBootstrap() {
    // Bootstrap main app
    this.upgrade.bootstrap(document.body, ['admin']);
  }
  }

if (isDevMode()) {
  platformBrowserDynamic().bootstrapModule(AppModule);
}


