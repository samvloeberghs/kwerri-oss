import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationsComponent {
  increment = output<void>();
  decrement = output<void>();
}
