import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { TpComponentColor } from '../utils/component-color';

export type TpCheckboxColor = TpComponentColor;

@Component({
  selector: 'tp-checkbox',
  imports: [MatCheckboxModule, NgStyle],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TpCheckbox implements FormCheckboxControl {
  checked = model(false);
  touched = model(false);

  color = input<TpCheckboxColor>('blue');
  disabled = input(false);
  indeterminate = input(false);
  required = input(false);
  name = input('');
  nativeValue = input('on');
  ariaLabel = input<string | null>(null);
  tabIndex = input(0);

  protected readonly selectedColorStyle = computed(() => ({
    '--tp-checkbox-selected-color': `var(--tp-color-${this.color()}-600)`,
    '--tp-checkbox-selected-pressed-color': `var(--tp-color-${this.color()}-700)`,
  }));

  protected updateChecked(event: MatCheckboxChange): void {
    this.checked.set(event.checked);
    this.touched.set(true);
  }
}
