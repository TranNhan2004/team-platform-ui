import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  Injectable,
  inject,
  input,
  model,
  viewChild,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, NativeDateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

export const TP_DEFAULT_MIN_DATE = new Date(1900, 0, 1);
export const TP_DEFAULT_MAX_DATE = new Date(2100, 0, 1);

export function createTpDefaultMinDate(): Date {
  return new Date(1900, 0, 1);
}

export function createTpDefaultMaxDate(): Date {
  return new Date(2100, 0, 1);
}

@Injectable()
class TpDateAdapter extends NativeDateAdapter {
  override getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    return super.getDayOfWeekNames(style === 'narrow' ? 'short' : style);
  }
}

@Component({
  selector: 'tp-date-picker',
  imports: [MatButtonModule, MatDatepickerModule, MatInputModule],
  providers: [provideNativeDateAdapter(), { provide: DateAdapter, useClass: TpDateAdapter }],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TpDatePicker implements FormValueControl<Date | null> {
  value = model<Date | null>(null);

  minDate = input<Date>(createTpDefaultMinDate());
  maxDate = input<Date>(createTpDefaultMaxDate());
  disabled = input(false);
  ariaLabel = input('Choose date');

  private readonly picker = viewChild.required<MatDatepicker<Date>>('picker');
  private readonly scrollDispatcher = inject(ScrollDispatcher);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly startAt = computed(() => this.value() ?? new Date());

  constructor() {
    this.scrollDispatcher
      .scrolled()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.picker().close());
  }

  open(): void {
    if (!this.disabled()) {
      this.picker().open();
    }
  }

  protected selectDate(date: Date | null): void {
    this.value.set(date);
  }
}
