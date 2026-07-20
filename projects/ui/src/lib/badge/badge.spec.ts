import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpBadge } from './badge';

describe('Badge', () => {
  let component: TpBadge;
  let fixture: ComponentFixture<TpBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(TpBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
