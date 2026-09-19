import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TpInputAutocompleteSingleselect, TpSelectOption } from 'ui';
import {
  displayProjectOption,
  PLAYGROUND_PROJECTS,
  searchProjectOptions,
} from '../project-options';

@Component({
  selector: 'app-test-input-autocomplete-singleselect',
  imports: [TpInputAutocompleteSingleselect],
  templateUrl: './test-input-autocomplete-singleselect.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInputAutocompleteSingleselect {
  protected readonly projectOptions = signal(PLAYGROUND_PROJECTS);
  protected readonly selectedProject = signal<TpSelectOption | null>(null);
  protected readonly displayProject = displayProjectOption;

  protected searchProjects(query: string): void {
    this.projectOptions.set(searchProjectOptions(query));
  }

  protected selectedProjectText(): string {
    return displayProjectOption(this.selectedProject()) || 'None';
  }
}
