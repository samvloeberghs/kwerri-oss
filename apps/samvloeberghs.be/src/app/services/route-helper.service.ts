import { inject, Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JsonLdService, SeoSocialShareData, SeoSocialShareService } from 'ngx-seo';

import { BehaviorSubject, Observable } from 'rxjs';
import { fixExternalUrl } from '../fix-external-url';
import { environment } from '../environment';

// inject in root
@Injectable({
  providedIn: 'root',
})
export class RouteHelper {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly seoSocialShareService = inject(SeoSocialShareService);
  private readonly jsonLdService = inject(JsonLdService);

  public readonly currentUrl$: Observable<string>;
  private readonly currentUrl = new BehaviorSubject<string>('');
  private readonly routes = ['/', '/', '/posts', '/talks-workshops', '/projects', '/about', '/kwerri'];

  constructor(
  ) {
    this.setupRouting();
    this.currentUrl$ = this.currentUrl.asObservable();
  }

  keyboardNavigate(key: number) {
    if (this.routes[key]) {
      this.router.navigateByUrl(this.routes[key]);
    }
  }

  private setupRouting() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
    ).subscribe((route: ActivatedRoute) => {
      const seo: any = route.snapshot.data['seo'];
      this.currentUrl.next(this.router.routerState.snapshot.url);
      if (seo) {
        const jsonLd = this.jsonLdService.getObject('Website', {
          name: seo.title,
          url: environment.url + fixExternalUrl(this.router.routerState.snapshot.url),
        });
        this.jsonLdService.setData(jsonLd);
        const seoData: SeoSocialShareData = {
          title: seo.title,
          description: seo.description,
          image: environment.url + seo.shareImg,
          author: environment.seo.author,
          url: environment.url + fixExternalUrl(this.router.routerState.snapshot.url),
          type: 'website',
        };
        this.seoSocialShareService.setData(seoData);
      } else {
        const jsonLd = this.jsonLdService.getObject('Website', {
          name: environment.seo.title,
          url: environment.url,
        });
        this.jsonLdService.setData(jsonLd);
        const seoData: SeoSocialShareData = {
          title: environment.seo.title,
          description: environment.seo.description,
          image: environment.url + environment.seo.shareImg,
          author: environment.seo.author,
          url: environment.url,
          type: 'website',
        };
        this.seoSocialShareService.setData(seoData);
      }
    });
  }

}
