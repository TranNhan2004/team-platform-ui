import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TP_COMPONENT_COLOR_MAP, TpComponentColor } from '../utils/component-color';

export type TpSlideToggleColor = TpComponentColor;
export type TpSlideToggleLabelPosition = 'before' | 'after';

@Component({
  selector: 'tp-slide-toggle',
  imports: [MatSlideToggleModule, NgStyle],
  templateUrl: './slide-toggle.html',
  styleUrl: './slide-toggle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TpSlideToggle implements FormCheckboxControl {
  checked = model(false);
  touched = model(false);

  color = input<TpSlideToggleColor>('blue');
  disabled = input(false);
  required = input(false);
  labelPosition = input<TpSlideToggleLabelPosition>('after');
  name = input('');
  ariaLabel = input<string | null>(null);
  ariaLabelledby = input<string | null>(null);
  ariaDescribedby = input('');
  tabIndex = input(0);
  disableRipple = input(false);
  hideIcon = input(false);
  disabledInteractive = input(false);

  protected readonly slideToggleStyle = computed(() => {
    const color = TP_COMPONENT_COLOR_MAP[this.color()];

    return {
      '--tp-slide-toggle-color': color.color,
      '--tp-slide-toggle-contrast-color': color.contrast,
    };
  });

  protected updateChecked(event: MatSlideToggleChange): void {
    this.checked.set(event.checked);
    this.touched.set(true);
  }
}
