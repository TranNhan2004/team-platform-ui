import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpChip } from './chip';

describe('Chip', () => {
  let component: TpChip;
  let fixture: ComponentFixture<TpChip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpChip],
    }).compileComponents();

    fixture = TestBed.createComponent(TpChip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply explicit typography and center projected content', async () => {
    fixture.componentRef.setInput('fontSize', '18px');
    fixture.componentRef.setInput('fontWeight', '700');
    fixture.detectChanges();
    await fixture.whenStable();

    const chip = fixture.nativeElement.querySelector('mat-chip') as HTMLElement;
    const content = chip.querySelector('.tp-chip__content') as HTMLElement;

    expect(chip.style.fontSize).toBe('18px');
    expect(chip.style.fontWeight).toBe('700');
    expect(content.style.fontSize).toBe('');
    expect(content.style.fontWeight).toBe('');
  });
});
