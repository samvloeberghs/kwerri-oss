import { inject, Injectable } from '@angular/core';

import 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-highlight/prism-line-highlight';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';

import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';

declare const Prism: any;

@Injectable()
export class HighlightService {

    private readonly document = inject(DOCUMENT);

    highlightAll(): Observable<void> {
        return new Observable(observer => {
            Prism.highlightAllUnder(this.document, false, () => {
                observer.next();
                observer.complete();
            });
        })
    }
}
