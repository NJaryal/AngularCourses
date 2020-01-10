import { platformBrowser } from '@angular/platform-browser';
 // This file will be available during the compilation
import { AppModuleNgFactory } from './app.module.ngfactory';

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
