import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  // imports: [CommonModule],
  selector: 'app-current-count',
  templateUrl: './current-count.component.html',
  styleUrl: './current-count.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentCountComponent {
  count = input<number>(0);
  numbers = input<number[]>([]);
}
