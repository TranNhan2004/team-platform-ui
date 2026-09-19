import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatDivider } from '@angular/material/divider';

import { TpDivider } from './divider';

describe('TpDivider', () => {
  let component: TpDivider;
  let fixture: ComponentFixture<TpDivider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpDivider],
    }).compileComponents();

    fixture = TestBed.createComponent(TpDivider);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a horizontal divider with the shared border color by default', () => {
    const dividerDebugElement = fixture.debugElement.query(By.css('mat-divider'));
    const dividerElement = dividerDebugElement.nativeElement as HTMLElement;
    const divider = dividerDebugElement.componentInstance as MatDivider;

    expect(divider.vertical).toBe(false);
    expect(divider.inset).toBe(false);
    expect(dividerElement.getAttribute('role')).toBe('separator');
    expect(dividerElement.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('passes vertical and inset options to Material', async () => {
    fixture.componentRef.setInput('vertical', true);
    fixture.componentRef.setInput('inset', true);
    fixture.detectChanges();
    await fixture.whenStable();

    const dividerDebugElement = fixture.debugElement.query(By.css('mat-divider'));
    const dividerElement = dividerDebugElement.nativeElement as HTMLElement;
    const divider = dividerDebugElement.componentInstance as MatDivider;

    expect(divider.vertical).toBe(true);
    expect(divider.inset).toBe(true);
    expect(dividerElement.classList).toContain('mat-divider-vertical');
    expect(dividerElement.classList).toContain('mat-divider-inset');
    expect(dividerElement.getAttribute('aria-orientation')).toBe('vertical');
  });
});
