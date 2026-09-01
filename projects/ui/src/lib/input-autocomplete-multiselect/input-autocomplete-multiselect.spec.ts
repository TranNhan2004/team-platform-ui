import { ComponentFixture, TestBed } from '@angular/core/testing';

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

  it('should toggle one selected value', () => {
    const toggleOption = (component as unknown as { toggleOption: (option: string) => void })
      .toggleOption;

    toggleOption.call(component, 'Platform UI');
    expect(component.value()).toEqual(['Platform UI']);

    toggleOption.call(component, 'Platform UI');
    expect(component.value()).toEqual([]);
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
