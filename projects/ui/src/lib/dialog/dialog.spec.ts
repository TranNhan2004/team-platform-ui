import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpDialog } from './dialog';

describe('Dialog', () => {
  let component: TpDialog;
  let fixture: ComponentFixture<TpDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(TpDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
