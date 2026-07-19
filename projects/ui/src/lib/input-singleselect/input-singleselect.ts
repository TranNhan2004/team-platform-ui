import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Spinner } from '../spinner/spinner';

export type TpSingleselectOption = string;

export type TpInputSingleselectContentSize = 'sm' | 'md' | 'lg';

const CONTENT_SIZE_MAP: Record<TpInputSingleselectContentSize, string> = {
  sm: 'var(--tp-text-sm)',
  md: 'var(--tp-text-md)',
  lg: 'var(--tp-text-lg)',
};

@Component({
  selector: 'tp-input-singleselect',
  host: {
    '[style.--tp-input-singleselect-height]': 'height()',
    '[style.--tp-input-singleselect-max-height]': 'maxHeight()',
  },
  imports: [MatButtonModule, MatFormFieldModule, MatIconModule, MatSelectModule, Spinner],
  templateUrl: './input-singleselect.html',
  styleUrl: './input-singleselect.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSingleselect implements FormValueControl<string | null> {
  value = model<string | null>(null);
  touched = model(false);

  options = input<readonly TpSingleselectOption[]>([]);
  loading = input(false);
  title = input('');
  placeholder = input('');
  required = input(false);
  disabled = input(false);
  readonly = input(false);
  name = input('');
  ariaLabel = input<string | null>(null);
  hint = input<string | null>(null);
  error = input<string | null>(null);
  requiredMessage = input('This field is required');
  width = input('100%');
  maxWidth = input('none');
  height = input('var(--tp-control-height-md)');
  maxHeight = input('var(--tp-control-height-lg)');
  contentSize = input<TpInputSingleselectContentSize>('md');

  protected readonly contentFontSize = computed(() => CONTENT_SIZE_MAP[this.contentSize()]);

  protected readonly isEmpty = computed(() => {
    const value = this.value();
    return value === null || value.trim() === '';
  });

  protected readonly hasRequiredError = computed(() => this.required() && this.isEmpty());

  protected readonly showError = computed(
    () => !!this.error() || (this.touched() && this.hasRequiredError()),
  );

  protected readonly displayedError = computed(() => this.error() ?? this.requiredMessage());

  protected selectOption(event: MatSelectChange): void {
    this.value.set(event.value as TpSingleselectOption);
    this.touched.set(true);
  }

  protected clearValue(event: MouseEvent): void {
    event.stopPropagation();
    this.value.set(null);
    this.touched.set(true);
  }

  protected markAsTouched(): void {
    this.touched.set(true);
  }
}
