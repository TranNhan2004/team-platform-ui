import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TpSearchBar } from 'ui';

@Component({
  selector: 'app-test-search-bar',
  imports: [TpSearchBar],
  templateUrl: './test-search-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestSearchBar {
  protected readonly searchValue = signal('');
}
