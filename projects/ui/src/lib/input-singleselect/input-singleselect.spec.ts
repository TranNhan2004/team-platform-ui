import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TpInputSingleselect } from './input-singleselect';

describe('InputSingleselect', () => {
  let component: TpInputSingleselect;
  let fixture: ComponentFixture<TpInputSingleselect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpInputSingleselect],
    }).compileComponents();

    fixture = TestBed.createComponent(TpInputSingleselect);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should keep one selected value', () => {
    const selectOption = (
      component as unknown as { selectOption: (event: { value: string }) => void }
    ).selectOption;

    selectOption.call(component, { value: 'Platform UI' });

    expect(component.value()).toBe('Platform UI');
  });

  it('should clear the selected value from its trailing button', () => {
    component.value.set('Platform UI');
    fixture.detectChanges();

    const clearButton = fixture.nativeElement.querySelector(
      '.tp-input-singleselect__clear',
    ) as HTMLButtonElement;
    clearButton.click();

    expect(component.value()).toBeNull();
  });

  it('should accept the provided options', async () => {
    fixture.componentRef.setInput('options', ['Platform API', 'Platform UI']);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.options()).toEqual(['Platform API', 'Platform UI']);
  });

  it('should show the required error after the select loses focus', async () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    await fixture.whenStable();

    const select = fixture.nativeElement.querySelector('mat-select') as HTMLElement;
    select.dispatchEvent(new Event('focusout'));
    fixture.detectChanges();
    await fixture.whenStable();

    const error = fixture.nativeElement.querySelector(
      '.tp-input-singleselect__error',
    ) as HTMLElement;

    expect(error.textContent?.trim()).toBe('This field is required');
  });
});
