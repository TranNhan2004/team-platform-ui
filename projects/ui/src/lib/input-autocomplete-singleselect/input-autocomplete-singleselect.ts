import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  model,
  viewChild,
} from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { FormValueControl } from '@angular/forms/signals';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  MatAutocompleteTrigger,
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TpSpinner } from '../spinner/spinner';
import {
  createValidationErrorId,
  TpValidationErrors,
  validationErrorMessage,
} from '../utils/form-validation';

export type TpAutocompleteSingleselectOption = string;

export type TpInputAutocompleteSingleselectContentSize = 'sm' | 'md' | 'lg';

const CONTENT_SIZE_MAP: Record<TpInputAutocompleteSingleselectContentSize, string> = {
  sm: 'var(--tp-text-sm)',
  md: 'var(--tp-text-md)',
  lg: 'var(--tp-text-lg)',
};

@Component({
  selector: 'tp-input-autocomplete-singleselect',
  imports: [MatAutocompleteModule, MatFormFieldModule, MatInputModule, TpSpinner],
  templateUrl: './input-autocomplete-singleselect.html',
  styleUrl: './input-autocomplete-singleselect.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TpInputAutocompleteSingleselect implements FormValueControl<string> {
  value = model('');
  touched = model(false);
  errors = input<TpValidationErrors>([]);
  invalid = input(false);

  options = input<readonly TpAutocompleteSingleselectOption[]>([]);
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
  contentSize = input<TpInputAutocompleteSingleselectContentSize>('md');

  private readonly suggestionsTrigger = viewChild(MatAutocompleteTrigger);
  private readonly scrollDispatcher = inject(ScrollDispatcher);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.scrollDispatcher
      .scrolled()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.suggestionsTrigger()?.closePanel());
  }

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
  protected readonly errorId = createValidationErrorId('tp-input-autocomplete-singleselect-error');

  protected readonly showError = computed(
    () =>
      !!this.error() ||
      this.invalid() ||
      this.errors().length > 0 ||
      (this.touched() && this.hasRequiredError()),
  );

  protected readonly displayedError = computed(() =>
    this.error() ?? validationErrorMessage(this.errors(), this.requiredMessage()),
  );

  protected updateValue(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }

  protected selectOption(event: MatAutocompleteSelectedEvent): void {
    this.value.set(event.option.value as TpAutocompleteSingleselectOption);
  }

  protected markAsTouched(): void {
    this.touched.set(true);
  }
}
