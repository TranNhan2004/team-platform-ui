import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpTextButton } from './text-button';

describe('TextButton', () => {
  let component: TpTextButton;
  let fixture: ComponentFixture<TpTextButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpTextButton],
    }).compileComponents();

    fixture = TestBed.createComponent(TpTextButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
