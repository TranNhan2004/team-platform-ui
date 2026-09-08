import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TpInputSingleselect, TpSelectOption } from 'ui';
import { displayProjectOption, PLAYGROUND_PROJECTS } from '../project-options';

@Component({
  selector: 'app-test-input-singleselect',
  imports: [TpInputSingleselect],
  templateUrl: './test-input-singleselect.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInputSingleselect {
  protected readonly projectOptions = PLAYGROUND_PROJECTS;
  protected readonly selectedProject = signal<TpSelectOption | null>(null);
  protected readonly displayProject = displayProjectOption;

  protected selectedProjectText(): string {
    return displayProjectOption(this.selectedProject()) || 'None';
  }
}
