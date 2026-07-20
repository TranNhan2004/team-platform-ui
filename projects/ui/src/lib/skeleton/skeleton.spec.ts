import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpSkeleton } from './skeleton';

describe('Skeleton', () => {
  let component: TpSkeleton;
  let fixture: ComponentFixture<TpSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(TpSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
