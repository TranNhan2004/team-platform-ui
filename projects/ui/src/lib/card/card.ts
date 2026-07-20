import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'tp-card',
  imports: [MatCardModule, NgStyle],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TpCard {
  color = input('var(--tp-color-surface)');
  textColor = input('var(--tp-color-text-primary)');
  borderColor = input('var(--tp-color-border)');
  width = input('100%');
  maxWidth = input('none');
  height = input('auto');
  maxHeight = input('none');

  protected readonly cardStyle = computed(() => ({
    '--tp-card-color': this.color(),
    '--tp-card-text-color': this.textColor(),
    '--tp-card-border-color': this.borderColor(),
    width: this.width(),
    maxWidth: this.maxWidth(),
    height: this.height(),
    maxHeight: this.maxHeight(),
  }));
}
