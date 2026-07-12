import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TP_COMPONENT_COLOR_MAP, TpComponentColor } from '../utils/component-color';

export type TpButtonColor = TpComponentColor;
type TpButtonSize = 'sm' | 'md' | 'lg';
type TpButtonVariant = 'filled' | 'outlined' | 'tonal';

@Component({
  selector: 'tp-button',
  imports: [MatButtonModule, MatTooltipModule, NgClass, NgStyle, NgTemplateOutlet],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  color = input<TpButtonColor>('blue');
  size = input<TpButtonSize>('md');
  variant = input<TpButtonVariant>('filled');
  disabled = input(false);
  fullWidth = input(false);
  tooltipTitle = input<string | null>(null);

  protected readonly buttonStyle = computed(() => {
    const color = TP_COMPONENT_COLOR_MAP[this.color()];

    return {
      '--tp-button-color': color.color,
      '--tp-button-contrast-color': color.contrast,
      '--tp-button-tonal-bg': color.container,
    };
  });

  protected readonly buttonClass = computed(() => ({
    'tp-button--sm': this.size() === 'sm',
    'tp-button--md': this.size() === 'md',
    'tp-button--lg': this.size() === 'lg',
    'tp-button--full': this.fullWidth(),
    'tp-button--filled': this.variant() === 'filled',
    'tp-button--outlined': this.variant() === 'outlined',
    'tp-button--tonal': this.variant() === 'tonal',
  }));
}
