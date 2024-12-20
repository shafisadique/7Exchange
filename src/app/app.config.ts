import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideCharts, withDefaultRegisterables, } from 'ng2-charts';
import { provideToastr } from 'ngx-toastr';


import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { routes } from './app.routes';
import { tokenInterceptor } from './shared/interceptor/token.interceptor';
import { loadingInterceptor } from './shared/interceptor/loading.interceptor';
import { errorIntercepter } from './shared/interceptor/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withInterceptors([tokenInterceptor,loadingInterceptor])),
    provideCharts(withDefaultRegisterables()),
    provideRouter(routes),
    {
      provide: DateAdapter,
      useFactory: adapterFactory

    },
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }).providers!
  ]
};
