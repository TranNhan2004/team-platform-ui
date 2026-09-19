import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TpInputMultiselect, TpSelectOption } from 'ui';
import { displayProjectOption, PLAYGROUND_PROJECTS } from '../project-options';

@Component({
  selector: 'app-test-input-multiselect',
  imports: [TpInputMultiselect],
  templateUrl: './test-input-multiselect.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInputMultiselect {
  protected readonly projectOptions = PLAYGROUND_PROJECTS;
  protected readonly selectedProjects = signal<TpSelectOption[]>([
    PLAYGROUND_PROJECTS[0],
    PLAYGROUND_PROJECTS[3],
  ]);
  protected readonly displayProject = displayProjectOption;

  protected selectedProjectText(): string {
    return (
      this.selectedProjects()
        .map((project) => displayProjectOption(project))
        .join(', ') || 'None'
    );
  }
}
