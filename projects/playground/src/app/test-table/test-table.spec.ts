import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTable } from './test-table';

describe('TestTable', () => {
  let component: TestTable;
  let fixture: ComponentFixture<TestTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestTable],
    }).compileComponents();

    fixture = TestBed.createComponent(TestTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debounces filter changes and keeps the loading state until results are applied', async () => {
    vi.useFakeTimers();

    try {
      const projectFilter = fixture.nativeElement.querySelectorAll(
        '.tp-table__filter-row input',
      )[1] as HTMLInputElement;
      projectFilter.value = 'Project 099';
      projectFilter.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();

      await vi.advanceTimersByTimeAsync(499);
      fixture.detectChanges();

      const table = fixture.nativeElement.querySelector('.tp-table__container') as HTMLElement;
      expect(table.getAttribute('aria-busy')).toBe('true');
      const loadingRow = fixture.nativeElement.querySelector(
        '.tp-table__row--loading',
      ) as HTMLTableRowElement;
      expect(loadingRow).toBeTruthy();
      const firstDataRow = fixture.nativeElement.querySelector(
        'tbody tr:not(.tp-table__filter-row)',
      ) as HTMLTableRowElement;
      expect(firstDataRow.querySelectorAll('.tp-table__cell-value')[1].textContent).toContain(
        'Project 001',
      );

      await vi.advanceTimersByTimeAsync(1);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(table.getAttribute('aria-busy')).toBe('false');
      expect(fixture.nativeElement.querySelector('.tp-table__row--loading')).toBeNull();
      const resultRow = fixture.nativeElement.querySelector(
        'tbody tr:not(.tp-table__filter-row)',
      ) as HTMLTableRowElement;
      expect(resultRow.querySelectorAll('.tp-table__cell-value')[1].textContent).toContain(
        'Project 099',
      );
    } finally {
      vi.useRealTimers();
    }
  });

  it('reloads for one second while preserving filter values', async () => {
    vi.useFakeTimers();

    try {
      const projectFilter = fixture.nativeElement.querySelectorAll(
        '.tp-table__filter-row input',
      )[1] as HTMLInputElement;
      projectFilter.value = 'Project 099';
      projectFilter.dispatchEvent(new Event('input', { bubbles: true }));
      fixture.detectChanges();
      await vi.advanceTimersByTimeAsync(500);
      fixture.detectChanges();
      await fixture.whenStable();

      const reload = fixture.nativeElement.querySelector('.tp-table__reload') as HTMLButtonElement;
      reload.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const table = fixture.nativeElement.querySelector('.tp-table__container') as HTMLElement;
      expect(table.getAttribute('aria-busy')).toBe('true');
      expect(fixture.nativeElement.querySelector('.tp-table__loading-row')).toBeTruthy();
      expect(reload.disabled).toBe(true);

      await vi.advanceTimersByTimeAsync(999);
      fixture.detectChanges();
      expect(table.getAttribute('aria-busy')).toBe('true');

      await vi.advanceTimersByTimeAsync(1);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(table.getAttribute('aria-busy')).toBe('false');
      expect(reload.disabled).toBe(false);
      expect(projectFilter.value).toBe('Project 099');
      const resultRow = fixture.nativeElement.querySelector(
        'tbody tr:not(.tp-table__filter-row)',
      ) as HTMLTableRowElement;
      expect(resultRow.querySelectorAll('.tp-table__cell-value')[1].textContent).toContain(
        'Project 099',
      );
    } finally {
      vi.useRealTimers();
    }
  });
});
