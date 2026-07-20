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
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
