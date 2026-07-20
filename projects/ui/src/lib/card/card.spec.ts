import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpCard } from './card';

describe('Card', () => {
  let component: TpCard;
  let fixture: ComponentFixture<TpCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TpCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
