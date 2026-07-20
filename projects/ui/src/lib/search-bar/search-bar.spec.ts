import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { TpSearchBar } from './search-bar';

describe('SearchBar', () => {
  let component: TpSearchBar;
  let fixture: ComponentFixture<TpSearchBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpSearchBar],
    }).compileComponents();

    fixture = TestBed.createComponent(TpSearchBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind with Signal Forms and emit a trimmed value after 300ms', async () => {
    vi.useFakeTimers();
    const emittedValues: string[] = [];
    component.onSearch.subscribe((value) => emittedValues.push(value));

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = '  project  ';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    await vi.advanceTimersByTimeAsync(299);
    expect(emittedValues).toEqual([]);

    await vi.advanceTimersByTimeAsync(1);
    expect(emittedValues).toEqual(['project']);

    vi.useRealTimers();
  });
});
