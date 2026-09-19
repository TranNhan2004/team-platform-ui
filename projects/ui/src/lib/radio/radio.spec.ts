import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpRadio } from './radio';

describe('Radio', () => {
  let component: TpRadio;
  let fixture: ComponentFixture<TpRadio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpRadio],
    }).compileComponents();

    fixture = TestBed.createComponent(TpRadio);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use blue for selected states by default', () => {
    const radio = fixture.nativeElement.querySelector('mat-radio-button') as HTMLElement;

    expect(radio.style.getPropertyValue('--tp-radio-selected-color')).toBe(
      'var(--tp-color-blue-600)',
    );
  });

  it('should allow overriding the selected-state color', async () => {
    fixture.componentRef.setInput('color', 'red');
    fixture.detectChanges();
    await fixture.whenStable();

    const radio = fixture.nativeElement.querySelector('mat-radio-button') as HTMLElement;

    expect(radio.style.getPropertyValue('--tp-radio-selected-color')).toBe(
      'var(--tp-color-red-600)',
    );
    expect(radio.style.getPropertyValue('--tp-radio-selected-pressed-color')).toBe(
      'var(--tp-color-red-700)',
    );
  });
});
