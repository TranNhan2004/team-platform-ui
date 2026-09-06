import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TpSpinner } from 'ui';

@Component({
  selector: 'app-test-spinner',
  imports: [TpSpinner],
  templateUrl: './test-spinner.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestSpinner {
  protected readonly colors = [
    'gray',
    'red',
    'pink',
    'amber',
    'orange',
    'yellow',
    'green',
    'emerald',
    'teal',
    'blue',
    'cyan',
    'purple',
    'violet',
    'indigo',
  ] as const;
}
