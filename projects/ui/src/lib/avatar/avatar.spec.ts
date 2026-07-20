import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpAvatar } from './avatar';

describe('Avatar', () => {
  let component: TpAvatar;
  let fixture: ComponentFixture<TpAvatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpAvatar],
    }).compileComponents();

    fixture = TestBed.createComponent(TpAvatar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
