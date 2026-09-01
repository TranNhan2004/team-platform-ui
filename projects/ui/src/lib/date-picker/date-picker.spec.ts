import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DateAdapter } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';

import { TP_DEFAULT_MAX_DATE, TP_DEFAULT_MIN_DATE, TpDatePicker } from './date-picker';

describe('DatePicker', () => {
  let component: TpDatePicker;
  let fixture: ComponentFixture<TpDatePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TpDatePicker] }).compileComponents();
    fixture = TestBed.createComponent(TpDatePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render only a calendar trigger visibly', () => {
    const trigger = fixture.nativeElement.querySelector('.tp-date-picker__trigger');
    const internalInput = fixture.nativeElement.querySelector('.tp-date-picker__input');

    expect(trigger).toBeTruthy();
    expect(internalInput.getAttribute('aria-hidden')).toBe('true');
  });

  it('should use the default date range', () => {
    const datepickerInput = fixture.debugElement
      .query(By.directive(MatDatepickerInput))
      .injector.get(MatDatepickerInput<Date>);

    expect(datepickerInput.min).toEqual(TP_DEFAULT_MIN_DATE);
    expect(datepickerInput.max).toEqual(TP_DEFAULT_MAX_DATE);
  });

  it('should use unambiguous short weekday names', () => {
    const dateAdapter = fixture.debugElement.injector.get(DateAdapter<Date>);

    expect(dateAdapter.getDayOfWeekNames('narrow')).toEqual(dateAdapter.getDayOfWeekNames('short'));
  });

  it('should start at the selected date', async () => {
    const selected = new Date(2040, 8, 10);
    component.value.set(selected);
    fixture.detectChanges();
    await fixture.whenStable();

    const picker = fixture.debugElement
      .query(By.directive(MatDatepicker))
      .injector.get(MatDatepicker<Date>);

    expect(picker.startAt).toEqual(selected);
  });

  it('should prefer opening below the trigger', () => {
    const picker = fixture.debugElement
      .query(By.directive(MatDatepicker))
      .injector.get(MatDatepicker<Date>);

    expect(picker.yPosition).toBe('below');
  });
});
