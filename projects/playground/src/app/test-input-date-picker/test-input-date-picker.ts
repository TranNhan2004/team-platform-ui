import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TpInputDatePicker } from 'ui';

@Component({
  selector: 'app-test-input-date-picker',
  imports: [TpInputDatePicker],
  templateUrl: './test-input-date-picker.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInputDatePicker {
  protected readonly selectedDate = signal<Date | null>(new Date(2032, 5, 15));
  protected readonly minPlaygroundDate = new Date(2025, 0, 1);
  protected readonly maxPlaygroundDate = new Date(2030, 11, 31);
}
