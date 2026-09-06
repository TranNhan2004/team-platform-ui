import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TpSkeleton } from 'ui';

@Component({
  selector: 'app-test-skeleton',
  imports: [TpSkeleton],
  templateUrl: './test-skeleton.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestSkeleton {}
