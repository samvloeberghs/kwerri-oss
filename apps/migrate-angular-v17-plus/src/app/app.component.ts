import { Component, computed } from '@angular/core';

import { CurrentCountComponent } from '../components/current-count/current-count.component';
import { OperationsComponent } from '../components/operations/operations.component';
import { StateService } from '../services/state.service';

@Component({
  standalone: true,
  imports: [CurrentCountComponent, OperationsComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public readonly numbers = computed<number[]>(() => {
    const currentCount = this.stateService.count();
    const fix = currentCount < 0 ? -1 : 1;
    return [...Array(Math.abs(currentCount)).keys()].map((e) => (e + 1) * fix);
  });

  constructor(public readonly stateService: StateService) {

  }

  public increment() {
    this.stateService.count.update((count) => count + 1);
  }

  public decrement() {
    this.stateService.count.update((count) => count - 1);
  }

}
