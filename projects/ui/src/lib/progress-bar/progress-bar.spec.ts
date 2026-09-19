import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatProgressBar } from '@angular/material/progress-bar';

import { TpProgressBar } from './progress-bar';

describe('ProgressBar', () => {
  let component: TpProgressBar;
  let fixture: ComponentFixture<TpProgressBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpProgressBar],
    }).compileComponents();

    fixture = TestBed.createComponent(TpProgressBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use blue by default', () => {
    const progressBar = fixture.nativeElement.querySelector('mat-progress-bar') as HTMLElement;

    expect(progressBar.style.getPropertyValue('--tp-progress-bar-color')).toBe(
      'var(--tp-color-blue-500)',
    );
  });

  it('should use the selected shared component color', async () => {
    fixture.componentRef.setInput('color', 'red');
    fixture.detectChanges();
    await fixture.whenStable();

    const progressBar = fixture.nativeElement.querySelector('mat-progress-bar') as HTMLElement;

    expect(progressBar.style.getPropertyValue('--tp-progress-bar-color')).toBe(
      'var(--tp-color-red-500)',
    );
  });

  it('should pass progress values and accessibility inputs to Material', async () => {
    fixture.componentRef.setInput('mode', 'buffer');
    fixture.componentRef.setInput('value', 40);
    fixture.componentRef.setInput('bufferValue', 75);
    fixture.componentRef.setInput('ariaLabel', 'Upload progress');
    fixture.detectChanges();
    await fixture.whenStable();

    const progressBarDebugElement = fixture.debugElement.query(By.css('mat-progress-bar'));
    const progressBarElement = progressBarDebugElement.nativeElement as HTMLElement;
    const progressBar = progressBarDebugElement.componentInstance as MatProgressBar;

    expect(progressBar.mode).toBe('buffer');
    expect(progressBar.value).toBe(40);
    expect(progressBar.bufferValue).toBe(75);
    expect(progressBarElement.getAttribute('aria-label')).toBe('Upload progress');
    expect(progressBarElement.getAttribute('aria-valuenow')).toBe('40');
  });
});
