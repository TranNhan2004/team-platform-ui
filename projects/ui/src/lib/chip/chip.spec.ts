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
});
