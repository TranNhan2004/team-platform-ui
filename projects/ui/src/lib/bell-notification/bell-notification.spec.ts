import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpBellNotification } from './bell-notification';

describe('BellNotification', () => {
  let component: TpBellNotification;
  let fixture: ComponentFixture<TpBellNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpBellNotification],
    }).compileComponents();

    fixture = TestBed.createComponent(TpBellNotification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
