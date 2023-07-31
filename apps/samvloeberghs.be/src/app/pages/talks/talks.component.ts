import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'sv-talks',
    templateUrl: './talks.component.html',
    styleUrls: ['./talks.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive
    ]
})
export class TalksComponent {

}
