import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BellNotification } from './bell-notification';

describe('BellNotification', () => {
  let component: BellNotification;
  let fixture: ComponentFixture<BellNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BellNotification],
    }).compileComponents();

    fixture = TestBed.createComponent(BellNotification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
