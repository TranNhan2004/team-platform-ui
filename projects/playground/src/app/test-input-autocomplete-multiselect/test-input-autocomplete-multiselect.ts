import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TpInputAutocompleteMultiselect, TpSelectOption } from 'ui';
import {
  displayProjectOption,
  PLAYGROUND_PROJECTS,
  searchProjectOptions,
} from '../project-options';

@Component({
  selector: 'app-test-input-autocomplete-multiselect',
  imports: [TpInputAutocompleteMultiselect],
  templateUrl: './test-input-autocomplete-multiselect.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInputAutocompleteMultiselect {
  protected readonly projectOptions = signal(PLAYGROUND_PROJECTS);
  protected readonly selectedProjects = signal<TpSelectOption[]>([
    PLAYGROUND_PROJECTS[0],
    PLAYGROUND_PROJECTS[3],
  ]);
  protected readonly displayProject = displayProjectOption;

  protected searchProjects(query: string): void {
    this.projectOptions.set(searchProjectOptions(query));
  }

  protected selectedProjectText(): string {
    return (
      this.selectedProjects()
        .map((project) => displayProjectOption(project))
        .join(', ') || 'None'
    );
  }
}
