import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  standalone: true,
  imports: [NgIf, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault],
  selector: 'app-current-count',
  templateUrl: './current-count.component.html',
  styleUrl: './current-count.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentCountComponent {
  @Input() count: number = 0;
  @Input() numbers: number[] = [];
}
