import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TpTextArea } from 'ui';

@Component({
  selector: 'app-test-text-area',
  imports: [TpTextArea],
  templateUrl: './test-text-area.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestTextArea {}
