import { NgStyle } from '@angular/common';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'tp-dialog',
  imports: [CdkTrapFocus, MatButtonModule, MatDialogModule, NgStyle],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TpDialog {
  open = model(false);
  title = input('Dialog');
  ariaLabel = input<string | null>(null);
  color = input('var(--tp-color-surface-elevated)');
  textColor = input('var(--tp-color-text-primary)');
  borderColor = input('var(--tp-color-border)');
  width = input('min(90vw, 560px)');
  maxWidth = input('560px');
  height = input('auto');
  maxHeight = input('90vh');
  closeOnBackdrop = input(true);
  closeOnEscape = input(true);

  onOpen = output<void>();
  onClose = output<void>();

  protected readonly isOpen = this.open;

  protected readonly dialogStyle = computed(() => ({
    '--tp-dialog-color': this.color(),
    '--tp-dialog-text-color': this.textColor(),
    '--tp-dialog-border-color': this.borderColor(),
    width: this.width(),
    maxWidth: this.maxWidth(),
    height: this.height(),
    maxHeight: this.maxHeight(),
  }));

  openDialog(): void {
    if (this.isOpen()) return;

    this.isOpen.set(true);
    this.onOpen.emit();
  }

  closeDialog(): void {
    if (!this.isOpen()) return;

    this.isOpen.set(false);
    this.onClose.emit();
  }

  protected handleBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdrop() && event.target === event.currentTarget) {
      this.closeDialog();
    }
  }

  protected handleEscape(event: Event): void {
    event.stopPropagation();
    if (this.isOpen() && this.closeOnEscape()) {
      this.closeDialog();
    }
  }
}
