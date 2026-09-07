import { NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TP_COMPONENT_COLOR_MAP, TpComponentColor } from '../utils/component-color';

export type TpChipColor = TpComponentColor;
export type TpChipSize = 'sm' | 'md' | 'lg';
export type TpChipVariant = 'filled' | 'outlined' | 'tonal' | 'text';

@Component({
  selector: 'tp-chip',
  imports: [MatChipsModule, MatTooltipModule, NgClass, NgStyle],
  templateUrl: './chip.html',
  styleUrl: './chip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TpChip {
  color = input<TpChipColor>('blue');
  size = input<TpChipSize>('md');
  variant = input<TpChipVariant>('filled');
  tooltipTitle = input<string | null>(null);
  fontSize = input<string | null>(null);
  fontWeight = input<string | null>(null);

  protected readonly chipStyle = computed(() => {
    const color = TP_COMPONENT_COLOR_MAP[this.color()];

    return {
      '--tp-chip-color': color.color,
      '--tp-chip-label-color': color.contrast,
      '--tp-chip-tonal-bg': color.container,
      fontSize: this.fontSize(),
      fontWeight: this.fontWeight(),
    };
  });

  protected readonly chipClass = computed(() => ({
    [`tp-chip--${this.size()}`]: true,
    [`tp-chip--${this.variant()}`]: true,
  }));
}
