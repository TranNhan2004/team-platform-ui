import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  viewChild,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  FlexibleConnectedPositionStrategyOrigin,
  Overlay,
} from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, NativeDateAdapter, provideNativeDateAdapter } from '@angular/material/core';
import {
  MAT_DATEPICKER_SCROLL_STRATEGY,
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

export const TP_DEFAULT_MIN_DATE = new Date(1900, 0, 1);
export const TP_DEFAULT_MAX_DATE = new Date(2100, 0, 1);

const BELOW_POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
  { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
];

class TpDateAdapter extends NativeDateAdapter {
  override getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    return super.getDayOfWeekNames(style === 'narrow' ? 'short' : style);
  }
}

@Component({
  selector: 'tp-date-picker',
  imports: [MatButtonModule, MatDatepickerModule, MatInputModule],
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
export class TpDatePicker implements FormValueControl<Date | null> {
  value = model<Date | null>(null);

  minDate = input<Date>(TP_DEFAULT_MIN_DATE);
  maxDate = input<Date>(TP_DEFAULT_MAX_DATE);
  disabled = input(false);
  ariaLabel = input('Choose date');

  private readonly overlay = inject(Overlay);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly picker = viewChild.required<MatDatepicker<Date>>('picker');
  protected readonly startAt = computed(() => this.value() ?? new Date());

  open(): void {
    if (!this.disabled()) {
      this.configureBelowOnlyStrategy();
      this.picker().open();
    }
  }

  protected selectDate(date: Date | null): void {
    this.value.set(date);
  }

  private configureBelowOnlyStrategy(): void {
    const picker = this.picker() as unknown as {
      _getDropdownStrategy(): FlexibleConnectedPositionStrategy;
    };

    // MatDatepicker offers only a preferred Y position. Configure its strategy
    // before opening so the initial layout has no above-trigger fallback.
    picker._getDropdownStrategy = () =>
      this.overlay
        .position()
        .flexibleConnectedTo(this.getBelowOrigin())
        .withTransformOriginOn('.mat-datepicker-content')
        .withFlexibleDimensions(false)
        .withViewportMargin(8)
        .withPush(false)
        .withLockedPosition()
        .withPositions(BELOW_POSITIONS);
  }

  private getBelowOrigin(): FlexibleConnectedPositionStrategyOrigin {
    const trigger = (this.host.nativeElement as HTMLElement).querySelector(
      '.tp-date-picker__trigger',
    ) as HTMLButtonElement | null;

    if (!trigger) throw new Error('Date picker trigger is unavailable');
    const rect = trigger.getBoundingClientRect();
    return { x: rect.left, y: rect.bottom, width: rect.width, height: 0 };
  }
}
