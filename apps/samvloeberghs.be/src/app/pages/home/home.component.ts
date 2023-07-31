import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '../../services/data.service';
import { Post } from '../posts/post/post.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'sv-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        NgIf,
        RouterLink,
        AsyncPipe
    ]
})
export class HomeComponent {

    public readonly lastPost$: Observable<Post> = inject(DataService)
        .getData('/assets/post-data/data.json')
        .pipe(
            map(response => response[0] as Post),
        );

}
