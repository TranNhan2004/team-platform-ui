import { NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

export type TpTextButtonColor = 'gray' | 'white' | 'black';
export type TpTextButtonSize = 'sm' | 'md' | 'lg';
export type TpTextButtonAfterPressEffect = 'underline' | 'none';

const TEXT_BUTTON_COLOR_MAP: Record<TpTextButtonColor, string> = {
  gray: 'var(--tp-color-gray-500)',
  white: 'var(--tp-color-white)',
  black: 'var(--tp-color-black)',
};

@Component({
  selector: 'tp-text-button',
  imports: [MatButtonModule, MatTooltipModule, NgClass, NgStyle],
  templateUrl: './text-button.html',
  styleUrl: './text-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TpTextButton {
  color = input<TpTextButtonColor>('gray');
  size = input<TpTextButtonSize>('md');
  afterPressEffect = input<TpTextButtonAfterPressEffect>('none');
  disabled = input(false);
  fullWidth = input(false);
  tooltipTitle = input<string | null>(null);

  protected readonly textButtonStyle = computed(() => ({
    '--tp-text-button-color': TEXT_BUTTON_COLOR_MAP[this.color()],
  }));

  protected readonly textButtonClass = computed(() => ({
    [`tp-text-button--${this.size()}`]: true,
    'tp-text-button--full': this.fullWidth(),
    'tp-text-button--underline': this.afterPressEffect() === 'underline',
  }));
}
