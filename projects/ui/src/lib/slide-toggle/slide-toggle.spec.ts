import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatSlideToggle } from '@angular/material/slide-toggle';

import { TpSlideToggle } from './slide-toggle';

describe('SlideToggle', () => {
  let component: TpSlideToggle;
  let fixture: ComponentFixture<TpSlideToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpSlideToggle],
    }).compileComponents();

    fixture = TestBed.createComponent(TpSlideToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start unchecked and use blue by default', () => {
    const slideToggle = fixture.nativeElement.querySelector('mat-slide-toggle') as HTMLElement;

    expect(component.checked()).toBe(false);
    expect(slideToggle.style.getPropertyValue('--tp-slide-toggle-color')).toBe(
      'var(--tp-color-blue-500)',
    );
  });

  it('should use the selected shared component color', async () => {
    fixture.componentRef.setInput('color', 'red');
    fixture.detectChanges();
    await fixture.whenStable();

    const slideToggle = fixture.nativeElement.querySelector('mat-slide-toggle') as HTMLElement;

    expect(slideToggle.style.getPropertyValue('--tp-slide-toggle-color')).toBe(
      'var(--tp-color-red-500)',
    );
  });

  it('should pass Material options and update its checked model', async () => {
    fixture.componentRef.setInput('checked', true);
    fixture.componentRef.setInput('labelPosition', 'before');
    fixture.componentRef.setInput('ariaLabel', 'Enable notifications');
    fixture.componentRef.setInput('name', 'notifications');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    await fixture.whenStable();

    const slideToggleDebugElement = fixture.debugElement.query(By.css('mat-slide-toggle'));
    const slideToggleElement = slideToggleDebugElement.nativeElement as HTMLElement;
    const slideToggle = slideToggleDebugElement.componentInstance as MatSlideToggle;

    expect(slideToggle.checked).toBe(true);
    expect(slideToggle.labelPosition).toBe('before');
    expect(slideToggle.ariaLabel).toBe('Enable notifications');
    expect(slideToggle.name).toBe('notifications');
    expect(slideToggle.required).toBe(true);

    const switchElement = slideToggleElement.querySelector('button') as HTMLButtonElement;
    switchElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.checked()).toBe(false);
    expect(component.touched()).toBe(true);
  });
});
