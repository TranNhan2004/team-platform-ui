import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  viewChild,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TpCheckbox } from '../checkbox/checkbox';
import { TpSpinner } from '../spinner/spinner';
import { truncateText } from '../utils/text-wrapping';

export type TpMultiselectOption = string;
export type TpInputMultiselectChipDisplayMode = 'inline' | 'new-line';
export type TpInputMultiselectContentSize = 'sm' | 'md' | 'lg';

const CONTENT_SIZE_MAP: Record<TpInputMultiselectContentSize, string> = {
  sm: 'var(--tp-text-sm)',
  md: 'var(--tp-text-md)',
  lg: 'var(--tp-text-lg)',
};

@Component({
  selector: 'tp-input-multiselect',
  imports: [
    TpCheckbox,
    MatAutocompleteModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    TpSpinner,
  ],
  templateUrl: './input-multiselect.html',
  styleUrl: './input-multiselect.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TpInputMultiselect implements FormValueControl<string[]> {
  value = model<string[]>([]);
  touched = model(false);

  options = input<readonly TpMultiselectOption[]>([]);
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
  minHeight = input('var(--tp-control-height-md)');
  maxHeight = input('none');
  contentSize = input<TpInputMultiselectContentSize>('md');
  maxChipContentLength = input<number | undefined>(undefined);
  maxChips = input<number | undefined>(undefined);
  chipDisplayMode = input<TpInputMultiselectChipDisplayMode>('inline');

  protected readonly selectAllOptionValue = '__tp-input-multiselect-select-all__';
  private readonly destroyRef = inject(DestroyRef);
  private readonly optionsTrigger = viewChild(MatAutocompleteTrigger);
  private readonly optionsPanel = viewChild(MatAutocomplete);
  private readonly triggerInput = viewChild<ElementRef<HTMLInputElement>>('triggerInput');
  private panelReopenQueued = false;
  private panelPositionUpdateQueued = false;
  private pendingPanelScrollTop: number | undefined;
  private panelReopenTimeout: ReturnType<typeof setTimeout> | undefined;
  private panelPositionTimeout: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    this.destroyRef.onDestroy(() => this.cancelPendingCallbacks());
  }

  protected readonly selectedValues = computed(() => [...new Set(this.value())]);

  protected readonly visibleSelectedValues = computed(() => {
    const maxChips = this.maxChips();

    if (maxChips === undefined) {
      return this.selectedValues();
    }

    return this.selectedValues().slice(0, Math.max(0, maxChips));
  });

  protected readonly hiddenSelectedCount = computed(
    () => this.selectedValues().length - this.visibleSelectedValues().length,
  );

  protected readonly allSelected = computed(() => {
    const options = this.uniqueOptions();
    return options.length > 0 && options.every((option) => this.isSelected(option));
  });

  protected readonly someSelected = computed(() =>
    this.uniqueOptions().some((option) => this.isSelected(option)),
  );

  protected readonly selectAllLabel = computed(() =>
    this.allSelected() ? 'Unselect all' : 'Select all',
  );

  protected readonly contentFontSize = computed(() => CONTENT_SIZE_MAP[this.contentSize()]);

  protected readonly floatLabel = computed<'always' | 'auto'>(() =>
    this.selectedValues().length ? 'always' : 'auto',
  );

  protected readonly isEmpty = computed(() => this.selectedValues().length === 0);

  protected readonly hasRequiredError = computed(() => this.required() && this.isEmpty());

  protected readonly showError = computed(
    () => !!this.error() || (this.touched() && this.hasRequiredError()),
  );

  protected readonly displayedError = computed(() => this.error() ?? this.requiredMessage());

  protected selectOption(event: MatAutocompleteSelectedEvent): void {
    const option = event.option.value as TpMultiselectOption;
    const scrollTop = this.optionsPanel()?._getScrollTop() ?? 0;

    if (option === this.selectAllOptionValue) {
      this.toggleAll();
    } else {
      this.toggleOption(option);
    }

    // Checkbox selections own the displayed state. Remove Material's transient
    // option selection so a row does not remain highlighted after it changes.
    event.option.deselect(false);
    event.option.setInactiveStyles();
    this.clearTriggerValue();
    this.reopenOptions(scrollTop);
  }

  protected toggleOptionFromPointer(option: TpMultiselectOption, event: MouseEvent): void {
    // Keep pointer selections in the existing panel instead of recreating it.
    event.stopPropagation();

    if (option === this.selectAllOptionValue) {
      this.toggleAll();
    } else {
      this.toggleOption(option);
    }

    this.updatePanelPosition();
  }

  protected removeOption(option: TpMultiselectOption, event: MouseEvent): void {
    event.stopPropagation();
    this.value.update((values) => values.filter((value) => value !== option));
    this.touched.set(true);
    this.updatePanelPosition();
  }

  protected clearAll(event: MouseEvent): void {
    event.stopPropagation();
    this.value.set([]);
    this.clearTriggerValue();
    this.touched.set(true);
    this.updatePanelPosition();
  }

  protected openOptions(event?: Event): void {
    event?.stopPropagation();

    if (!this.disabled() && !this.readonly()) {
      this.optionsTrigger()?.openPanel();
    }
  }

  protected markAsTouched(): void {
    this.touched.set(true);
  }

  protected isSelected(option: TpMultiselectOption): boolean {
    return this.selectedValues().includes(option);
  }

  protected chipText(value: string): string {
    return truncateText(value, this.maxChipContentLength());
  }

  private toggleOption(option: TpMultiselectOption): void {
    this.value.update((values) =>
      values.includes(option) ? values.filter((value) => value !== option) : [...values, option],
    );
    this.touched.set(true);
  }

  private toggleAll(): void {
    this.value.set(this.allSelected() ? [] : this.uniqueOptions());
    this.touched.set(true);
  }

  private uniqueOptions(): TpMultiselectOption[] {
    return [...new Set(this.options())];
  }

  private clearTriggerValue(): void {
    const triggerInput = this.triggerInput()?.nativeElement;

    if (triggerInput) {
      triggerInput.value = '';
    }
  }

  private reopenOptions(scrollTop: number): void {
    if (this.destroyRef.destroyed) return;

    this.pendingPanelScrollTop = scrollTop;
    this.clearPanelReopenTimeout();

    if (this.panelReopenQueued) return;

    this.panelReopenQueued = true;
    queueMicrotask(() => {
      this.panelReopenQueued = false;
      if (this.destroyRef.destroyed) return;

      const pendingScrollTop = this.pendingPanelScrollTop;
      this.pendingPanelScrollTop = undefined;
      if (pendingScrollTop === undefined) return;

      this.optionsTrigger()?.openPanel();
      queueMicrotask(() => {
        if (!this.destroyRef.destroyed) {
          this.restorePanelScroll(pendingScrollTop);
        }
      });
      this.panelReopenTimeout = setTimeout(() => {
        this.panelReopenTimeout = undefined;

        if (!this.destroyRef.destroyed) {
          this.restorePanelScroll(pendingScrollTop);
        }
      });
    });
  }

  private restorePanelScroll(scrollTop: number): void {
    this.optionsPanel()?._setScrollTop(scrollTop);
  }

  private updatePanelPosition(): void {
    if (this.destroyRef.destroyed) return;

    this.clearPanelPositionTimeout();

    if (this.panelPositionUpdateQueued) return;

    this.panelPositionUpdateQueued = true;
    queueMicrotask(() => {
      this.panelPositionUpdateQueued = false;
      if (this.destroyRef.destroyed) return;

      this.optionsTrigger()?.updatePosition();
      this.panelPositionTimeout = setTimeout(() => {
        this.panelPositionTimeout = undefined;

        if (!this.destroyRef.destroyed) {
          this.optionsTrigger()?.updatePosition();
        }
      });
    });
  }

  private cancelPendingCallbacks(): void {
    this.clearPanelReopenTimeout();
    this.clearPanelPositionTimeout();
    this.pendingPanelScrollTop = undefined;
    this.panelReopenQueued = false;
    this.panelPositionUpdateQueued = false;
  }

  private clearPanelReopenTimeout(): void {
    if (this.panelReopenTimeout !== undefined) {
      clearTimeout(this.panelReopenTimeout);
      this.panelReopenTimeout = undefined;
    }
  }

  private clearPanelPositionTimeout(): void {
    if (this.panelPositionTimeout !== undefined) {
      clearTimeout(this.panelPositionTimeout);
      this.panelPositionTimeout = undefined;
    }
  }
}
