import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TpDivider } from 'ui';

@Component({
  selector: 'app-test-divider',
  imports: [TpDivider],
  templateUrl: './test-divider.html',
  styleUrl: './test-divider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDivider {}
