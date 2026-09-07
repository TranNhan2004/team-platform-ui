import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TpInputAutocompleteMultiselect } from 'ui';

@Component({
  selector: 'app-test-input-autocomplete-multiselect',
  imports: [TpInputAutocompleteMultiselect],
  templateUrl: './test-input-autocomplete-multiselect.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInputAutocompleteMultiselect {
  protected readonly projectOptions = [
    'Platform API',
    'Platform UI',
    'Project Atlas',
    'Project Nova',
    'Platform API 1',
    'Platform UI 1',
    'Project Atlas 1',
    'Project Nova 1',
    '1',
    '2',
    '3',
  ];
  protected readonly selectedProjects = signal<string[]>(['Platform API', 'Project Nova']);
}
