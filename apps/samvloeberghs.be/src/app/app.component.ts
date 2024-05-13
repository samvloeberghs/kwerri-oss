import { Component, HostListener, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { RouteHelper } from './services/route-helper.service';
import { environment } from './environment';
import { SeoSocialShareService } from 'ngx-seo';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [
      DatePipe,
      AsyncPipe,
      RouterLinkActive,
      RouterOutlet,
      RouterLink,
  ],
  selector: 'sv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit{
  private readonly routeHelper = inject(RouteHelper);
  private readonly seoSocialShareService = inject(SeoSocialShareService);

  public readonly today = new Date();
  public readonly currentUrl$ = this.routeHelper.currentUrl$;
  public mobileNavToggled = false;

  public ngOnInit(): void {
    this.seoSocialShareService.setTwitterSiteCreator(environment.twitterSiteCreator);
    this.seoSocialShareService.setTwitterCard('summary_large_image');
  }

  public toggleMobileNav(event?: any, block = false) {
    this.mobileNavToggled = !this.mobileNavToggled;
    if (block) {
      event.preventDefault();
    }
  }

  public navigateMobile() {
    this.toggleMobileNav();
  }

  @HostListener('document:keydown', ['$event'])
  private onKeydownHandler(event: KeyboardEvent) {
    this.routeHelper.keyboardNavigate(+event.key);
  }
}
