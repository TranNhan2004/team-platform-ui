import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  createTpDefaultMaxDate,
  createTpDefaultMinDate,
  TpDatePicker,
} from '../date-picker/date-picker';
import {
  createValidationErrorId,
  TpValidationErrors,
  validationErrorMessage,
} from '../utils/form-validation';

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
  imports: [TpDatePicker, MatFormFieldModule, MatInputModule],
  templateUrl: './input-date-picker.html',
  styleUrl: './input-date-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TpInputDatePicker implements FormValueControl<Date | null> {
  value = model<Date | null>(null);
  touched = model(false);
  errors = input<TpValidationErrors>([]);
  invalid = input(false);

  title = input('');
  placeholder = input('Select date');
  dateFormat = input<TpDateFormat>('DD-MM-YYYY');
  minDate = input<Date>(createTpDefaultMinDate());
  maxDate = input<Date>(createTpDefaultMaxDate());
  disabled = input(false);
  readonly = input(false);
  required = input(false);
  error = input<string | null>(null);
  requiredMessage = input('This field is required');
  name = input('');
  width = input('100%');
  maxWidth = input('none');
  height = input('var(--tp-control-height-md)');
  maxHeight = input('var(--tp-control-height-lg)');

  protected readonly errorId = createValidationErrorId('tp-input-date-picker-error');
  protected readonly hasRequiredError = computed(() => this.required() && !this.value());
  protected readonly showError = computed(
    () =>
      !!this.error() ||
      this.invalid() ||
      this.errors().length > 0 ||
      (this.touched() && this.hasRequiredError()),
  );
  protected readonly displayedError = computed(() =>
    this.error() ?? validationErrorMessage(this.errors(), this.requiredMessage()),
  );

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
    this.touched.set(true);
  }

  protected clearOnKeydown(event: KeyboardEvent): void {
    if ((event.key !== 'Backspace' && event.key !== 'Delete') || !this.value()) return;

    event.preventDefault();
    this.value.set(null);
    this.touched.set(true);
  }

  protected markAsTouched(): void {
    this.touched.set(true);
  }
}
