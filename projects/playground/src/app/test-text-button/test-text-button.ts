import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TpTextButton } from 'ui';

@Component({
  selector: 'app-test-text-button',
  imports: [TpTextButton],
  templateUrl: './test-text-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestTextButton {}
