import { isDevMode } from "@angular/core";

if (isDevMode()) {
  // We are loading version of app which uses JIT
  require('./app.module');
}
else {
  // Here we want to load a special entry file for AOT
  require('./main.aot');
}
