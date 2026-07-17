import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TP_COMPONENT_COLOR_MAP, TpComponentColor } from '../utils/component-color';

export type TpSpinnerColor = TpComponentColor;

@Component({
  selector: 'tp-spinner',
  imports: [MatProgressSpinnerModule, NgStyle],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Spinner {
  color = input<TpSpinnerColor>('blue');
  diameter = input(48, { transform: numberAttribute });
  strokeWidth = input(4, { transform: numberAttribute });
  ariaLabel = input('Loading');

  protected readonly spinnerStyle = computed(() => ({
    '--tp-spinner-color': TP_COMPONENT_COLOR_MAP[this.color()].color,
  }));
}
