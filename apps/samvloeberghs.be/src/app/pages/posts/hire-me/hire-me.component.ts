import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sv-hire-me',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
      RouterLink,
  ],
  templateUrl: './hire-me.component.html',
  styleUrls: ['./hire-me.component.scss'],
})
export class HireMeComponent {

}
