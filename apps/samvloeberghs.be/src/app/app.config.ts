import { ApplicationConfig, Injectable } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { fixExternalUrl } from './fix-external-url';
import { JsonLdService, SeoSocialShareService } from 'ngx-seo';
import { provideHttpClient } from '@angular/common/http';

@Injectable()
export class CustomLocationStrategy extends PathLocationStrategy {
    override prepareExternalUrl(internal: string): string {
        let externalUrl = super.prepareExternalUrl(internal);
        externalUrl = fixExternalUrl(externalUrl);
        return externalUrl;
    }
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideRouter([
            {
                path: '',
                loadChildren: () => import('./pages/home/routes').then(m => m.routes),
            },
            {
                path: 'kwerri',
                loadChildren: () => import('./pages/kwerri/routes').then(m => m.routes),
            },
            {
                path: 'about',
                loadChildren: () => import('./pages/about/routes').then(m => m.routes),
            },
            {
                path: 'talks-workshops',
                loadChildren: () => import('./pages/talks/routes').then(m => m.routes),
            },
            {
                path: 'projects',
                loadChildren: () => import('./pages/projects/routes').then(m => m.routes),
            },
            {
                path: 'posts',
                loadChildren: () => import('./pages/posts/routes').then(m => m.routes),
            },
            {
                path: 'not-found',
                component: NotFoundComponent
            },
            {
                path: '**',
                redirectTo: '/not-found'
            }
        ]),
        {
            provide: LocationStrategy,
            useClass: CustomLocationStrategy,
        },
        JsonLdService,
        SeoSocialShareService
    ],
};
