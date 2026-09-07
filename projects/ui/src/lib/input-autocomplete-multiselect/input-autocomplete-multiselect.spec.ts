import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { TpInputAutocompleteMultiselect } from './input-autocomplete-multiselect';

describe('TpInputAutocompleteMultiselect', () => {
  let component: TpInputAutocompleteMultiselect;
  let fixture: ComponentFixture<TpInputAutocompleteMultiselect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpInputAutocompleteMultiselect],
    }).compileComponents();

    fixture = TestBed.createComponent(TpInputAutocompleteMultiselect);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an up or down chevron based on the panel state', () => {
    const arrowButton = fixture.nativeElement.querySelector(
      '.tp-input-autocomplete-multiselect__trailing-action',
    ) as HTMLButtonElement;
    const arrow = arrowButton.querySelector('.tp-icon') as HTMLElement;

    expect(arrow.textContent?.trim()).toBe('keyboard_arrow_down');
    (component as unknown as { optionsOpen: { set: (open: boolean) => void } }).optionsOpen.set(
      true,
    );
    fixture.detectChanges();

    expect(arrow.textContent?.trim()).toBe('keyboard_arrow_up');
    expect(arrowButton.getAttribute('aria-expanded')).toBe('true');
  });

  it('should filter options case-insensitively from typed text', async () => {
    fixture.componentRef.setInput('options', ['Platform API', 'Platform UI', 'Project Atlas']);
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector(
      '.tp-input-autocomplete-multiselect__trigger',
    ) as HTMLInputElement;
    input.value = 'ui';
    input.dispatchEvent(new Event('input'));

    const filteredOptions = (
      component as unknown as { filteredOptions: () => readonly string[] }
    ).filteredOptions();
    expect(filteredOptions).toEqual(['Platform UI']);
  });

  it('should place the typing input immediately after selected chips', async () => {
    component.value.set(['Platform API', 'Platform UI']);
    fixture.detectChanges();
    await fixture.whenStable();

    const valueContainer = fixture.nativeElement.querySelector(
      '.tp-input-autocomplete-multiselect__value',
    ) as HTMLElement;
    const triggerInput = fixture.nativeElement.querySelector(
      '.tp-input-autocomplete-multiselect__trigger',
    ) as HTMLInputElement;

    expect(valueContainer.lastElementChild).toBe(triggerInput);
  });

  it('should keep the title floating above selected values', async () => {
    fixture.componentRef.setInput('title', 'Projects');
    component.value.set(['Platform API']);
    fixture.detectChanges();
    await fixture.whenStable();

    const title = fixture.nativeElement.querySelector('.mat-mdc-floating-label') as HTMLElement;
    const chips = fixture.nativeElement.querySelectorAll(
      '.tp-input-autocomplete-multiselect__chip-label',
    ) as NodeListOf<HTMLElement>;

    expect(title.classList).toContain('mdc-floating-label--float-above');
    expect(chips[0].textContent?.trim()).toBe('Platform API');
  });

  it('should toggle one selected value', () => {
    const toggleOption = (component as unknown as { toggleOption: (option: string) => void })
      .toggleOption;

    toggleOption.call(component, 'Platform UI');
    expect(component.value()).toEqual(['Platform UI']);

    toggleOption.call(component, 'Platform UI');
    expect(component.value()).toEqual([]);
  });

  it('should update the panel position after a pointer selection', () => {
    const updatePanelPosition = vi.spyOn(
      component as unknown as { updatePanelPosition: () => void },
      'updatePanelPosition',
    );
    const toggleOptionFromPointer = (
      component as unknown as {
        toggleOptionFromPointer: (option: string, event: MouseEvent) => void;
      }
    ).toggleOptionFromPointer;

    toggleOptionFromPointer.call(component, 'Platform UI', new MouseEvent('click'));

    expect(updatePanelPosition).toHaveBeenCalledOnce();
  });

  it('should select only the matching options when selecting all', async () => {
    fixture.componentRef.setInput('options', ['Platform API', 'Platform UI', 'Project Atlas']);
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector(
      '.tp-input-autocomplete-multiselect__trigger',
    ) as HTMLInputElement;
    input.value = 'platform';
    input.dispatchEvent(new Event('input'));

    const toggleAll = (component as unknown as { toggleAllFilteredOptions: () => void })
      .toggleAllFilteredOptions;
    toggleAll.call(component);

    expect(component.value()).toEqual(['Platform API', 'Platform UI']);
  });

  it('should show a required error once touched without selections', async () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector(
      '.tp-input-autocomplete-multiselect__trigger',
    ) as HTMLInputElement;
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    await fixture.whenStable();

    const error = fixture.nativeElement.querySelector(
      '.tp-input-autocomplete-multiselect__error',
    ) as HTMLElement;
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(error.textContent?.trim()).toBe('This field is required');
  });
});
