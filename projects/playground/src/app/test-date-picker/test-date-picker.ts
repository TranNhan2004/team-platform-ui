import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TpDatePicker } from 'ui';

@Component({
  selector: 'app-test-date-picker',
  imports: [TpDatePicker],
  templateUrl: './test-date-picker.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDatePicker {
  protected readonly calendarDate = signal<Date | null>(null);
}
