import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TpAvatar } from 'ui';

@Component({
  selector: 'app-test-avatar',
  imports: [TpAvatar],
  templateUrl: './test-avatar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestAvatar {}
