import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpButton } from './button';

@Component({
  imports: [TpButton],
  template: '<tp-button [variant]="variant">Visible label</tp-button>',
})
class TpButtonTestHost {
  variant: 'filled' | 'outlined' | 'tonal' = 'filled';
}

describe('Button', () => {
  let component: TpButton;
  let fixture: ComponentFixture<TpButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpButton],
    }).compileComponents();

    fixture = TestBed.createComponent(TpButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the click event', () => {
    const onClick = vi.fn();
    component.onClick.subscribe(onClick);

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
  });

  it.each(['filled', 'outlined', 'tonal'] as const)(
    'should project its label for the %s variant',
    (variant) => {
      const hostFixture = TestBed.createComponent(TpButtonTestHost);
      hostFixture.componentInstance.variant = variant;
      hostFixture.detectChanges();

      const label = hostFixture.nativeElement.querySelector('.mdc-button__label') as HTMLElement;

      expect(label.textContent?.trim()).toBe('Visible label');
    },
  );

  it.each(['outlined', 'tonal'] as const)(
    'should use the button color as the %s text color',
    async (variant) => {
      fixture.componentRef.setInput('color', 'red');
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();
      await fixture.whenStable();

      const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

      expect(button.style.getPropertyValue('--tp-button-color')).toBe('var(--tp-color-red-500)');
      expect(button.classList.contains(`tp-button--${variant}`)).toBe(true);
    },
  );

  it('should use the contrast color for filled button text', async () => {
    fixture.componentRef.setInput('color', 'blue');
    fixture.detectChanges();
    await fixture.whenStable();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.style.getPropertyValue('--tp-button-contrast-color')).toBe(
      'var(--tp-color-white)',
    );
  });

  it('should apply explicit dimension constraints', async () => {
    fixture.componentRef.setInput('width', '12rem');
    fixture.componentRef.setInput('maxWidth', '16rem');
    fixture.componentRef.setInput('height', '40px');
    fixture.componentRef.setInput('maxHeight', '44px');
    fixture.detectChanges();
    await fixture.whenStable();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.style.width).toBe('12rem');
    expect(button.style.maxWidth).toBe('16rem');
    expect(button.style.height).toBe('40px');
    expect(button.style.maxHeight).toBe('44px');
  });
});
