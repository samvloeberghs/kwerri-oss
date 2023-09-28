import {
    AfterViewChecked,
    Component,
    inject,
    OnInit,
    PLATFORM_ID,
    ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { map, skip, switchMap, take } from 'rxjs/operators';
import { JsonLdService, SeoSocialShareData, SeoSocialShareService } from 'ngx-seo';
import { DatePipe, DOCUMENT, isPlatformBrowser, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';

import { Post } from './post.model';
import { DataService } from '../../../services/data.service';
import { fixExternalUrl } from '../../../fix-external-url';
import { environment } from '../../../environment';
import { HireMeComponent } from '../hire-me/hire-me.component';
import { HighlightService } from '../highlight.service';
import { BehaviorSubject } from 'rxjs';

// TODO(sv): fix this type
declare const window: any;

@Component({
    selector: 'sv-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    providers: [
        HighlightService
    ],
    imports: [
        NgIf,
        DatePipe,
        NgFor,
        HireMeComponent,
        NgTemplateOutlet,
    ]
})
export class PostComponent implements OnInit, AfterViewChecked {

    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    private readonly dataService = inject(DataService);
    private readonly seoSocialShareService = inject(SeoSocialShareService);
    private readonly sanitizer = inject(DomSanitizer);
    private readonly jsonLdService = inject(JsonLdService);
    private readonly highlightService = inject(HighlightService);
    private readonly document = inject(DOCUMENT);
    private readonly platformId = inject(PLATFORM_ID);

    public post!: Post;
    public error: any;
    private highlighted$$ = new BehaviorSubject(false);

    ngOnInit() {
        const slug = this.route.snapshot.params['slug'];
        this.dataService
            .getData('/assets/post-data/data.json')
            .pipe(
                map((posts: Post[]): Post => {
                    return posts.find((post: Post) => {
                        return post.slug === slug;
                    }) as Post;
                }),
                switchMap((post: Post) => {
                        this.post = post;
                        const jsonLd = this.jsonLdService.getObject('BlogPosting', {
                            name: `${ post.title } - Posts - ${ environment.seo.title }`,
                            url: environment.url + fixExternalUrl(this.router.routerState.snapshot.url),
                            author: this.jsonLdService.getObject('Person', {
                                name: 'Sam Vloeberghs',
                            }, undefined),
                            publisher: this.jsonLdService.getObject('Person', {
                                name: 'Sam Vloeberghs',
                            }, undefined),
                            headline: post.title,
                            description: post.short,
                            image: `${ environment.url }/${ post.imgShare }`,
                            dateCreated: post.publishDatetime,
                            datePublished: post.publishDatetime,
                            dateModified: post.updateDatetime,
                        });
                        this.jsonLdService.setData(jsonLd);
                        const seoData: SeoSocialShareData = {
                            title: `${ post.title } - Posts - ${ environment.seo.title }`,
                            description: post.short,
                            image: `${ environment.url }${ post.imgShare }`,
                            url: environment.url + fixExternalUrl(this.router.routerState.snapshot.url),
                            type: 'article',
                            author: post.author,
                            published: post.publishDatetime,
                            modified: post.updateDatetime,
                        };
                        this.seoSocialShareService.setData(seoData);
                        return this.dataService.getDataText(`/assets/post-data/${ slug }/post.html`);
                    },
                ),
            )
            .subscribe({
                next: content => {
                    this.post.content = this.sanitizer.bypassSecurityTrustHtml(content);
                    this.post.toc = this.parseContentToc(content);
                    setTimeout(() => {
                        this.startCheckingScrollForToc(`/posts/${ this.post.slug }`);
                    }, 0);
                },
                error: error => {
                    console.log(error);
                    this.error = error;
                    this.router.navigateByUrl('/not-found', {
                        skipLocationChange: true,
                    });
                },
            });
    }

    ngAfterViewChecked() {
        if (this.post && this.post.content && !this.highlighted$$.value) {
            this.highlightService.highlightAll().subscribe(() => {
                this.highlighted$$.next(true);
            });
        }
    }

    private parseContentToc(content: string) {
        const el = this.document.createElement('div');
        el.innerHTML = content;

        const selector = 'h2, h3, h4, h5';
        const headings: NodeListOf<HTMLElement> = el.querySelectorAll(selector);
        const toc = [];
        for (let i = 0; i < headings.length; i++) {
            if (!headings[i].id || headings[i].classList.contains('codetitle')) {
                continue;
            }
            toc.push({
                title: headings[i].title ? headings[i].title : headings[i].textContent,
                link: headings[i].id,
                active: i === 0,
                level: headings[i].tagName.toLowerCase(),
            });
        }
        return toc;
    }

    private startCheckingScrollForToc(route: string) {
        if (isPlatformBrowser(this.platformId)) {
            window.setTocObserver(this.document, route);
        }
    }

}
