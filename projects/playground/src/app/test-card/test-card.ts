import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TpCard } from 'ui';

@Component({
  selector: 'app-test-card',
  imports: [TpCard],
  templateUrl: './test-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestCard {}
