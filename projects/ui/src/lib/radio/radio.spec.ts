import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpRadio } from './radio';

describe('Radio', () => {
  let component: TpRadio;
  let fixture: ComponentFixture<TpRadio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpRadio],
    }).compileComponents();

    fixture = TestBed.createComponent(TpRadio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
