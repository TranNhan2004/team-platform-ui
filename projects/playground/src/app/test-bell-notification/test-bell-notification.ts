import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TpBellNotification } from 'ui';

@Component({
  selector: 'app-test-bell-notification',
  imports: [TpBellNotification],
  templateUrl: './test-bell-notification.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestBellNotification {}
