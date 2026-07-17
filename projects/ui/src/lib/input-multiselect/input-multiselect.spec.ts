import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMultiselect } from './input-multiselect';

describe('InputMultiselect', () => {
  let component: InputMultiselect;
  let fixture: ComponentFixture<InputMultiselect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputMultiselect],
    }).compileComponents();

    fixture = TestBed.createComponent(InputMultiselect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
