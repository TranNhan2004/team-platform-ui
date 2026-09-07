import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TpButton } from 'ui';

@Component({
  selector: 'app-test-button',
  imports: [TpButton],
  templateUrl: './test-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestButton {
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
  protected readonly buttonVariants = ['filled', 'outlined', 'tonal'] as const;
}
