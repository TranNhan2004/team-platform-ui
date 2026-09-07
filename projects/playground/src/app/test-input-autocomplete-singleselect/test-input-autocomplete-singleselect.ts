import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TpInputAutocompleteSingleselect } from 'ui';

@Component({
  selector: 'app-test-input-autocomplete-singleselect',
  imports: [TpInputAutocompleteSingleselect],
  templateUrl: './test-input-autocomplete-singleselect.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInputAutocompleteSingleselect {
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
}
