import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TpInputSingleselect } from 'ui';

@Component({
  selector: 'app-test-input-singleselect',
  imports: [TpInputSingleselect],
  templateUrl: './test-input-singleselect.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInputSingleselect {
  protected readonly projectOptions = [
    'Platform API',
    'Platform UI',
    'Project Atlas',
    'Project Nova',
    'Platform API 1',
    'Platform UI 1',
    'Project Atlas 1',
    'Project Nova 1',
    '1',
    '2',
    '3',
  ];
  protected readonly selectedProject = signal<string | null>(null);
}
