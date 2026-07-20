import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpSpinner } from './spinner';

describe('Spinner', () => {
  let component: TpSpinner;
  let fixture: ComponentFixture<TpSpinner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpSpinner],
    }).compileComponents();

    fixture = TestBed.createComponent(TpSpinner);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use blue by default', () => {
    const spinner = fixture.nativeElement.querySelector('mat-spinner') as HTMLElement;

    expect(spinner.style.getPropertyValue('--tp-spinner-color')).toBe(
      'var(--tp-color-blue-500)',
    );
  });

  it('should use the selected shared component color', async () => {
    fixture.componentRef.setInput('color', 'red');
    fixture.detectChanges();
    await fixture.whenStable();

    const spinner = fixture.nativeElement.querySelector('mat-spinner') as HTMLElement;

    expect(spinner.style.getPropertyValue('--tp-spinner-color')).toBe(
      'var(--tp-color-red-500)',
    );
  });

  it('should pass its dimensions to the Material spinner', async () => {
    fixture.componentRef.setInput('diameter', 32);
    fixture.componentRef.setInput('strokeWidth', 3);
    fixture.detectChanges();
    await fixture.whenStable();

    const spinner = fixture.nativeElement.querySelector('mat-spinner') as HTMLElement;

    expect(spinner.style.width).toBe('32px');
    expect(spinner.style.height).toBe('32px');
  });
});
