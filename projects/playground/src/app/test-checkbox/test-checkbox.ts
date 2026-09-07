import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TpCheckbox } from 'ui';

@Component({
  selector: 'app-test-checkbox',
  imports: [TpCheckbox],
  templateUrl: './test-checkbox.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestCheckbox {
  protected readonly notificationsEnabled = signal(false);
}
