import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { TpComponentColor } from '../utils/component-color';

export type TpRadioColor = TpComponentColor;

@Component({
  selector: 'tp-radio',
  imports: [MatRadioModule, NgStyle],
  templateUrl: './radio.html',
  styleUrl: './radio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TpRadio {
  checked = model(false);
  touched = model(false);

  color = input<TpRadioColor>('blue');
  disabled = input(false);
  required = input(false);
  name = input('');
  value = input<unknown>(null);
  ariaLabel = input<string | null>(null);

  protected readonly selectedColorStyle = computed(() => ({
    '--tp-radio-selected-color': `var(--tp-color-${this.color()}-600)`,
    '--tp-radio-selected-pressed-color': `var(--tp-color-${this.color()}-700)`,
  }));

  protected updateChecked(event: MatRadioChange): void {
    this.checked.set(event.source.checked);
    this.touched.set(true);
  }
}
