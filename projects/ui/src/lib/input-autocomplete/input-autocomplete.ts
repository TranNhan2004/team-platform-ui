import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Spinner } from '../spinner/spinner';

export type TpAutocompleteOption = string;

export type TpInputAutocompleteContentSize = 'sm' | 'md' | 'lg';

const CONTENT_SIZE_MAP: Record<TpInputAutocompleteContentSize, string> = {
  sm: 'var(--tp-text-sm)',
  md: 'var(--tp-text-md)',
  lg: 'var(--tp-text-lg)',
};

@Component({
  selector: 'tp-input-autocomplete',
  imports: [MatAutocompleteModule, MatFormFieldModule, MatInputModule, Spinner],
  templateUrl: './input-autocomplete.html',
  styleUrl: './input-autocomplete.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputAutocomplete implements FormValueControl<string> {
  value = model('');
  touched = model(false);

  options = input<readonly TpAutocompleteOption[]>([]);
  loading = input(false);
  title = input('');
  placeholder = input('');
  required = input(false);
  disabled = input(false);
  readonly = input(false);
  name = input('');
  autocomplete = input<string | null>(null);
  ariaLabel = input<string | null>(null);
  hint = input<string | null>(null);
  error = input<string | null>(null);
  requiredMessage = input('This field is required');
  width = input('100%');
  maxWidth = input('none');
  height = input('var(--tp-control-height-md)');
  maxHeight = input('var(--tp-control-height-lg)');
  contentSize = input<TpInputAutocompleteContentSize>('md');

  protected readonly query = computed(() => this.value().trim());

  protected readonly filteredOptions = computed(() => {
    const query = this.query().toLocaleLowerCase();

    return query
      ? this.options().filter((option) => option.toLocaleLowerCase().includes(query))
      : [];
  });

  protected readonly contentFontSize = computed(() => CONTENT_SIZE_MAP[this.contentSize()]);

  protected readonly isEmpty = computed(() => this.value().trim() === '');

  protected readonly hasRequiredError = computed(() => this.required() && this.isEmpty());

  protected readonly showError = computed(
    () => !!this.error() || (this.touched() && this.hasRequiredError()),
  );

  protected readonly displayedError = computed(() => this.error() ?? this.requiredMessage());

  protected updateValue(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }

  protected selectOption(event: MatAutocompleteSelectedEvent): void {
    this.value.set(event.option.value as TpAutocompleteOption);
  }

  protected markAsTouched(): void {
    this.touched.set(true);
  }
}
