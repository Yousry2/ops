import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'assets',
        pathMatch: 'full',
    },
    {
        path: 'assets',
        loadChildren: () =>
            import('@ops/assets-dashboard').then((m) => m.libRoutes),
    },
];
