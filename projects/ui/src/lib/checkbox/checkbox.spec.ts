import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpCheckbox } from './checkbox';

describe('Checkbox', () => {
  let component: TpCheckbox;
  let fixture: ComponentFixture<TpCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpCheckbox],
    }).compileComponents();

    fixture = TestBed.createComponent(TpCheckbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use blue for selected states by default', () => {
    const checkbox = fixture.nativeElement.querySelector('mat-checkbox') as HTMLElement;

    expect(checkbox.style.getPropertyValue('--tp-checkbox-selected-color')).toBe(
      'var(--tp-color-blue-600)',
    );
  });

  it('should allow overriding the selected-state color', async () => {
    fixture.componentRef.setInput('color', 'red');
    fixture.detectChanges();
    await fixture.whenStable();

    const checkbox = fixture.nativeElement.querySelector('mat-checkbox') as HTMLElement;

    expect(checkbox.style.getPropertyValue('--tp-checkbox-selected-color')).toBe(
      'var(--tp-color-red-600)',
    );
    expect(checkbox.style.getPropertyValue('--tp-checkbox-selected-pressed-color')).toBe(
      'var(--tp-color-red-700)',
    );
  });
});
