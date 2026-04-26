import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AppStore } from './store/app.state';

export const appConfig: ApplicationConfig = {
  providers: [
    AppStore,
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
