import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperationsComponent {
  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
}
