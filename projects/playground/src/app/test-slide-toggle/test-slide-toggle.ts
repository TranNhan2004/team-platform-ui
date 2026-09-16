import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TpSlideToggle } from 'ui';

@Component({
  selector: 'app-test-slide-toggle',
  imports: [TpSlideToggle],
  templateUrl: './test-slide-toggle.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestSlideToggle {
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
