import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Post } from './post/post.model';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'sv-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
    DatePipe,
    AsyncPipe,
    RouterLink
]
})
export class PostsComponent {

    private readonly router = inject(Router);

    public readonly posts$: Observable<Post[]> = inject(DataService)
        .getData('/assets/post-data/data.json')
        .pipe(
            map(response => response as Post[]),
            tap({
                error: (error) => {
                    console.log(error);
                    this.router.navigateByUrl('/not-found');
                },
            }),
        );

}
