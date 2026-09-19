import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TpProgressBar } from 'ui';

@Component({
  selector: 'app-test-progress-bar',
  imports: [TpProgressBar],
  templateUrl: './test-progress-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestProgressBar {
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
