import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TpRadio } from 'ui';

@Component({
  selector: 'app-test-radio',
  imports: [TpRadio],
  templateUrl: './test-radio.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestRadio {
  protected readonly selectedPlan = signal('starter');

  protected selectPlan(plan: string, checked: boolean): void {
    if (checked) {
      this.selectedPlan.set(plan);
    }
  }
}
