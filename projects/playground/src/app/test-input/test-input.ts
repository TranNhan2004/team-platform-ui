import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TpInput } from 'ui';

@Component({
  selector: 'app-test-input',
  imports: [TpInput],
  templateUrl: './test-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInput {}
