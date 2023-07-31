import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'sv-kwerri',
    templateUrl: './kwerri.component.html',
    styleUrls: ['./kwerri.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive
    ]
})
export class KwerriComponent {

    generalConditionsShown = false;

    toggleGeneralConditionsShown($event: Event) {
        $event.preventDefault();
        this.generalConditionsShown = !this.generalConditionsShown;
    }

}
