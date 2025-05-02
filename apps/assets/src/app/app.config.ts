import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
    provideClientHydration,
    withEventReplay,
} from '@angular/platform-browser';
import {
    QueryClient,
    provideTanStackQuery,
} from '@tanstack/angular-query-experimental';

import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withFetch()),
        provideTanStackQuery(new QueryClient()),
        provideClientHydration(withEventReplay()),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),
    ],
};
