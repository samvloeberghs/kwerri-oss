import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  // imports: [CommonModule],
  selector: 'app-current-count',
  templateUrl: './current-count.component.html',
  styleUrl: './current-count.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentCountComponent {
  @Input() count: number = 0;
  @Input() numbers: number[] = [];
}
