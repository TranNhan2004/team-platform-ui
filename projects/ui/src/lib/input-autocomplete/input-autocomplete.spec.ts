import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpInputAutocomplete } from './input-autocomplete';

describe('InputAutocomplete', () => {
  let component: TpInputAutocomplete;
  let fixture: ComponentFixture<TpInputAutocomplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpInputAutocomplete],
    }).compileComponents();

    fixture = TestBed.createComponent(TpInputAutocomplete);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update its single value with free text', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = 'Custom project';
    input.dispatchEvent(new Event('input'));

    expect(component.value()).toBe('Custom project');
  });

  it('should filter options case-insensitively', async () => {
    fixture.componentRef.setInput('options', ['Angular', 'React', 'Vue']);
    component.value.set('aNg');
    fixture.detectChanges();
    await fixture.whenStable();

    const filteredOptions = (
      component as unknown as { filteredOptions: () => readonly string[] }
    ).filteredOptions();

    expect(filteredOptions).toEqual(['Angular']);
  });

  it('should have no suggestions for a query with no matches', async () => {
    fixture.componentRef.setInput('options', ['Angular']);
    component.value.set('Svelte');
    fixture.detectChanges();
    await fixture.whenStable();

    const filteredOptions = (
      component as unknown as { filteredOptions: () => readonly string[] }
    ).filteredOptions();

    expect(filteredOptions).toEqual([]);
  });

  it('should show the required error after an empty input is touched', async () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    await fixture.whenStable();

    const error = fixture.nativeElement.querySelector(
      '.tp-input-autocomplete__error',
    ) as HTMLElement;

    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(error.textContent?.trim()).toBe('This field is required');
  });
});
