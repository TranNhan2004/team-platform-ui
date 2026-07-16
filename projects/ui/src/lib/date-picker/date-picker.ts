import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  viewChild,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { Overlay } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, NativeDateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import {
  MAT_DATEPICKER_SCROLL_STRATEGY,
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export const TP_DEFAULT_MIN_DATE = new Date(1900, 0, 1);
export const TP_DEFAULT_MAX_DATE = new Date(2100, 0, 1);

class TpDateAdapter extends NativeDateAdapter {
  override getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    return super.getDayOfWeekNames(style === 'narrow' ? 'short' : style);
  }
}

@Component({
  selector: 'tp-date-picker',
  imports: [MatButtonModule, MatDatepickerModule, MatIconModule, MatInputModule],
  providers: [
    provideNativeDateAdapter(),
    { provide: DateAdapter, useClass: TpDateAdapter },
    {
      provide: MAT_DATEPICKER_SCROLL_STRATEGY,
      useFactory: (overlay: Overlay) => () => overlay.scrollStrategies.block(),
      deps: [Overlay],
    },
  ],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePicker implements FormValueControl<Date | null> {
  value = model<Date | null>(null);

  minDate = input<Date>(TP_DEFAULT_MIN_DATE);
  maxDate = input<Date>(TP_DEFAULT_MAX_DATE);
  disabled = input(false);
  ariaLabel = input('Choose date');

  private readonly picker = viewChild.required<MatDatepicker<Date>>('picker');
  protected readonly startAt = computed(() => this.value() ?? new Date());

  open(): void {
    if (!this.disabled()) {
      this.picker().open();
    }
  }

  protected selectDate(date: Date | null): void {
    this.value.set(date);
  }
}
