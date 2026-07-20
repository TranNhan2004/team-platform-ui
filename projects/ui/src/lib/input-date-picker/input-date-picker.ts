import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TP_DEFAULT_MAX_DATE, TP_DEFAULT_MIN_DATE, TpDatePicker } from '../date-picker/date-picker';

export type TpDateFormat = 'DD-MM-YYYY' | 'DD-MMM-YYYY' | 'MM-DD-YYYY' | 'YYYY-MM-DD';

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

@Component({
  selector: 'tp-input-date-picker',
  host: {
    '[style.--tp-input-date-picker-height]': 'height()',
    '[style.--tp-input-date-picker-max-height]': 'maxHeight()',
  },
  imports: [TpDatePicker, MatFormFieldModule, MatInputModule],
  templateUrl: './input-date-picker.html',
  styleUrl: './input-date-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TpInputDatePicker implements FormValueControl<Date | null> {
  value = model<Date | null>(null);

  title = input('Date');
  dateFormat = input<TpDateFormat>('DD-MM-YYYY');
  minDate = input<Date>(TP_DEFAULT_MIN_DATE);
  maxDate = input<Date>(TP_DEFAULT_MAX_DATE);
  disabled = input(false);
  readonly = input(false);
  required = input(false);
  name = input('');
  width = input('100%');
  maxWidth = input('none');
  height = input('var(--tp-control-height-md)');
  maxHeight = input('var(--tp-control-height-lg)');

  protected readonly formattedValue = computed(() => {
    const date = this.value();
    if (!date) return '';

    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const year = date.getFullYear();

    switch (this.dateFormat()) {
      case 'DD-MMM-YYYY':
        return `${day}-${MONTH_NAMES[date.getMonth()]}-${year}`;
      case 'MM-DD-YYYY':
        return `${month}-${day}-${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      default:
        return `${day}-${month}-${year}`;
    }
  });

  protected selectDate(date: Date | null): void {
    this.value.set(date);
  }
}
