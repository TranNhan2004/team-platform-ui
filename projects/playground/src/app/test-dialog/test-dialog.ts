import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TpButton, TpDialog, TpTextButton } from 'ui';

@Component({
  selector: 'app-test-dialog',
  imports: [TpButton, TpDialog, TpTextButton],
  templateUrl: './test-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDialog {}
