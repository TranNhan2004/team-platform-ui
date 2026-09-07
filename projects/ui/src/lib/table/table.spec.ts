import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';

import {
  TpTable,
  TpTableActionContent,
  TpTableColumn,
  TpTableEmptyContent,
  TpTableFilterContent,
} from './table';

interface User {
  id: number;
  name: string;
  score: number;
}

const columns: TpTableColumn<User>[] = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'score', title: 'Score', sortable: true },
];

const rows: User[] = [
  { id: 1, name: 'Zoe', score: 10 },
  { id: 2, name: 'Amy', score: 20 },
  { id: 3, name: 'Long content that should be shortened by the table', score: 30 },
];

@Component({
  imports: [TpTable, TpTableActionContent, MatMenuModule],
  template: `
    <tp-table [data]="data" [config]="config" [actionColumn]="actionColumn">
      <ng-template tpTableActionContent let-row>
        <button mat-menu-item type="button" class="test-projected-action">
          View {{ row.name }}
        </button>
      </ng-template>
    </tp-table>
  `,
})
class TpTableActionTemplateHost {
  readonly columns = columns;
  readonly rows = rows;
  readonly data = { rows: this.rows };
  readonly config = { columns: this.columns };
  readonly actionColumn = { enabled: true };
}

@Component({
  imports: [TpTable, TpTableFilterContent],
  template: `
    <tp-table [data]="data" [config]="config">
      <ng-template tpTableFilter="name">
        <span class="test-name-filter">Project filter</span>
      </ng-template>
      <ng-template tpTableFilter="score">
        <span class="test-score-filter">Score filter</span>
      </ng-template>
    </tp-table>
  `,
})
class TpTableFilterTemplateHost {
  readonly columns = columns;
  readonly rows = rows;
  readonly data = { rows: this.rows };
  readonly config = { columns: this.columns, filter: { enabled: true } };
}

@Component({
  imports: [TpTable, TpTableEmptyContent],
  template: `
    <tp-table [data]="data" [config]="config">
      <ng-template tpTableEmpty let-colSpan="colSpan">
        <span class="test-empty-content">Nothing found ({{ colSpan }} columns)</span>
      </ng-template>
    </tp-table>
  `,
})
class TpTableEmptyTemplateHost {
  readonly columns = columns;
  readonly data = { rows: [] as User[] };
  readonly config = { columns: this.columns };
}

describe('TpTable', () => {
  let component: TpTable<User>;
  let fixture: ComponentFixture<TpTable<User>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpTable],
    }).compileComponents();

    fixture = TestBed.createComponent(TpTable<User>);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('config', { columns });
    fixture.componentRef.setInput('data', { rows });
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('uses the supplied max height for the scrollable table viewport', async () => {
    fixture.componentRef.setInput('config', { columns, maxHeight: 240 });
    fixture.detectChanges();
    await fixture.whenStable();

    const viewport = fixture.nativeElement.querySelector(
      '.tp-table__scroll-container',
    ) as HTMLElement;
    expect(viewport.style.maxHeight).toBe('240px');
  });

  it('paginates client rows and reports the ordinal range', async () => {
    fixture.componentRef.setInput('data', {
      rows: Array.from({ length: 25 }, (_value, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        score: index,
      })),
    });
    fixture.componentRef.setInput('config', { columns, pagination: { pageSize: 20 } });
    fixture.detectChanges();

    const next = fixture.nativeElement.querySelector(
      'button[aria-label="Next page"]',
    ) as HTMLButtonElement;
    next.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('[aria-label="Current page"]').textContent).toBe(
      '2',
    );
    expect(fixture.nativeElement.querySelector('.tp-table__row-range').textContent.trim()).toBe(
      '21 - 25',
    );
    expect(fixture.nativeElement.querySelectorAll('tbody tr')).toHaveLength(5);
    expect(fixture.nativeElement.querySelector('.tp-table__footer')).toBeTruthy();
  });

  it('uses Material selects for the pagination controls', () => {
    expect(fixture.nativeElement.querySelectorAll('.tp-table__pagination-select')).toHaveLength(2);
  });

  it('shows the reload control without pagination when reload is enabled', async () => {
    fixture.componentRef.setInput('config', {
      columns,
      pagination: { enabled: false },
      reload: { enabled: true, title: 'Refresh data' },
    });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.tp-table__footer')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.tp-table__reload-title').textContent.trim()).toBe(
      'Refresh data',
    );
    expect(fixture.nativeElement.querySelector('.tp-table__reload')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.tp-table__pagination')).toBeNull();
  });

  it('hides the footer when reload and pagination are disabled', async () => {
    fixture.componentRef.setInput('config', {
      columns,
      pagination: { enabled: false },
      reload: { enabled: false },
    });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.tp-table__footer')).toBeNull();
  });

  it('emits reload when the reload icon is clicked', async () => {
    fixture.componentRef.setInput('config', { columns, reload: { enabled: true } });
    fixture.detectChanges();
    await fixture.whenStable();

    const onReload = vi.fn();
    component.onReload.subscribe(onReload);
    (fixture.nativeElement.querySelector('.tp-table__reload') as HTMLButtonElement).click();

    expect(onReload).toHaveBeenCalledTimes(1);
  });

  it('supports host-controlled disable states for reload and page navigation', async () => {
    fixture.componentRef.setInput('data', {
      rows: Array.from({ length: 25 }, (_value, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        score: index,
      })),
    });
    fixture.componentRef.setInput('config', {
      columns,
      pagination: {
        prevPageButtonDisabled: true,
        nextPageButtonDisabled: true,
        page: 2,
      },
      reload: { enabled: true, buttonDisabled: true },
    });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(
      (fixture.nativeElement.querySelector('.tp-table__reload') as HTMLButtonElement).disabled,
    ).toBe(true);
    expect(
      (
        fixture.nativeElement.querySelector(
          'button[aria-label="Previous page"]',
        ) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
    expect(
      (fixture.nativeElement.querySelector('button[aria-label="Next page"]') as HTMLButtonElement)
        .disabled,
    ).toBe(true);
  });

  it('uses the default empty message when no rows are available', async () => {
    fixture.componentRef.setInput('data', { rows: [] });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.tp-table__empty-row').textContent.trim()).toBe(
      'No data available',
    );
  });

  it('renders a projected empty-state template instead of the default message', async () => {
    const hostFixture = TestBed.createComponent(TpTableEmptyTemplateHost);
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    expect(hostFixture.nativeElement.querySelector('.test-empty-content').textContent.trim()).toBe(
      'Nothing found (2 columns)',
    );
    expect(
      hostFixture.nativeElement.querySelector('.tp-table__empty-row').textContent,
    ).not.toContain('No data available');
  });

  it('shows the loading bar in the first data row and while the table is empty', async () => {
    fixture.componentRef.setInput('state', { loading: { enabled: true } });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.tp-table__row--loading')).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('.tp-table__container').getAttribute('aria-busy'),
    ).toBe('true');

    fixture.componentRef.setInput('data', { rows: [] });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.tp-table__loading-row')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.tp-table__empty-row')).toBeNull();
  });

  it('sorts ascending then descending when the same header is selected', async () => {
    const nameHeader = fixture.nativeElement.querySelector(
      '.tp-table__sort-button',
    ) as HTMLButtonElement;

    nameHeader.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.tp-table__sort-button--active')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('tbody td').textContent.trim()).toBe('Amy');

    nameHeader.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.tp-table__sort-icon').textContent.trim()).toBe(
      'arrow_downward',
    );
    expect(fixture.nativeElement.querySelector('tbody td').textContent.trim()).toBe('Zoe');
  });

  it('emits a selected row only when rows are enabled as clickable', () => {
    const onRowClick = vi.fn();
    component.onRowClick.subscribe(onRowClick);

    const firstRow = fixture.nativeElement.querySelector('tbody tr') as HTMLTableRowElement;
    firstRow.click();
    expect(onRowClick).not.toHaveBeenCalled();

    fixture.componentRef.setInput('config', { columns, rowsClickable: true });
    fixture.detectChanges();
    firstRow.click();
    expect(onRowClick).toHaveBeenCalledWith(rows[0]);
  });

  it('uses text-wrapping and preserves the full cell value for the tooltip', async () => {
    fixture.componentRef.setInput('config', { columns, maxCellContentLength: 12 });
    fixture.detectChanges();
    await fixture.whenStable();

    const cell = fixture.nativeElement.querySelectorAll('.tp-table__cell-value')[4] as HTMLElement;
    const tooltip = fixture.debugElement
      .queryAll(By.directive(MatTooltip))[4]
      .injector.get(MatTooltip);
    expect(cell.textContent.trim()).toBe('Long cont...');
    expect(tooltip.message).toBe(rows[2].name);
  });

  it('renders keyed projected filter content in a row below the headers', async () => {
    const hostFixture = TestBed.createComponent(TpTableFilterTemplateHost);
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    const filterRow = hostFixture.nativeElement.querySelector(
      '.tp-table__filter-row',
    ) as HTMLTableRowElement;
    expect(filterRow).toBeTruthy();
    expect(filterRow.querySelector('.test-name-filter')?.textContent?.trim()).toBe(
      'Project filter',
    );
    expect(filterRow.querySelector('.test-score-filter')?.textContent?.trim()).toBe('Score filter');
    expect(filterRow.querySelectorAll('td')).toHaveLength(columns.length);
  });

  it('renders projected action content with the row that opened the menu', async () => {
    const hostFixture = TestBed.createComponent(TpTableActionTemplateHost);
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    const actionTrigger = hostFixture.nativeElement.querySelector(
      '.tp-table__action-trigger',
    ) as HTMLButtonElement;
    actionTrigger.click();
    hostFixture.detectChanges();
    await hostFixture.whenStable();

    const action = document.querySelector('.test-projected-action') as HTMLButtonElement;
    expect(action.textContent?.trim()).toBe('View Zoe');
  });
});
