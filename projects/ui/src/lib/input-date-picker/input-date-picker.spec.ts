import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TP_DEFAULT_MAX_DATE, TP_DEFAULT_MIN_DATE, TpDatePicker } from '../date-picker/date-picker';

import { TpInputDatePicker } from './input-date-picker';

describe('InputDatePicker', () => {
  let component: TpInputDatePicker;
  let fixture: ComponentFixture<TpInputDatePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpInputDatePicker],
    }).compileComponents();

    fixture = TestBed.createComponent(TpInputDatePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the required marker without a title', async () => {
    fixture.componentRef.setInput('title', '');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    await fixture.whenStable();

    const marker = fixture.nativeElement.querySelector(
      '.tp-input-date-picker__required-marker',
    ) as HTMLElement;

    expect(marker.textContent).toBe('*');
  });

  it('should default its allowed range to 1 January 1900 through 1 January 2100', () => {
    const datePicker = fixture.debugElement.query(By.directive(TpDatePicker))
      .componentInstance as TpDatePicker;

    expect(datePicker.minDate()).toEqual(TP_DEFAULT_MIN_DATE);
    expect(datePicker.maxDate()).toEqual(TP_DEFAULT_MAX_DATE);
  });

  it('should update its signal value when the reused date picker selects a date', () => {
    const selectedDate = new Date(2030, 3, 12);
    const datePicker = fixture.debugElement.query(By.directive(TpDatePicker))
      .componentInstance as TpDatePicker;

    datePicker.value.set(selectedDate);

    expect(component.value()).toEqual(selectedDate);
  });

  it.each([
    ['DD-MM-YYYY', '09-07-2032'],
    ['DD-MMM-YYYY', '09-Jul-2032'],
    ['MM-DD-YYYY', '07-09-2032'],
    ['YYYY-MM-DD', '2032-07-09'],
  ] as const)('should display %s without changing the Date value', async (format, expected) => {
    const date = new Date(2032, 6, 9);
    component.value.set(date);
    fixture.componentRef.setInput('dateFormat', format);
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    expect(input.value).toBe(expected);
    expect(component.value()).toBe(date);
  });

  it('should apply height and max-height control tokens', async () => {
    fixture.componentRef.setInput('height', '36px');
    fixture.componentRef.setInput('maxHeight', '44px');
    fixture.detectChanges();
    await fixture.whenStable();

    const formField = fixture.nativeElement.querySelector('mat-form-field') as HTMLElement;

    expect(formField.style.getPropertyValue('--tp-input-date-picker-height')).toBe('36px');
    expect(formField.style.getPropertyValue('--tp-input-date-picker-max-height')).toBe('44px');
  });
});
