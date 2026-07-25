import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'tp-search-bar',
  imports: [MatInputModule, FormField],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TpSearchBar {
  width = input('100%');
  maxWidth = input('640px');
  placeholder = input('Search');
  ariaLabel = input('Search');
  searchAfter = input(300);
  onSearch = output<string>();

  private readonly searchModel = signal('');
  protected readonly searchField = form(this.searchModel);

  constructor() {
    let initialized = false;

    effect((onCleanup) => {
      const value = this.searchModel();

      if (!initialized) {
        initialized = true;
        return;
      }

      const timeout = setTimeout(() => this.onSearch.emit(value.trim()), this.searchAfter());
      onCleanup(() => clearTimeout(timeout));
    });
  }
}
