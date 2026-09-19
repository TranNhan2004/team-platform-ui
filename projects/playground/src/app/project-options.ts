import { TpSelectOption } from 'ui';

export interface PlaygroundProject {
  id: string;
  name: string;
}

export const PLAYGROUND_PROJECTS: readonly PlaygroundProject[] = [
  { id: 'platform-api', name: 'Platform API' },
  { id: 'platform-ui', name: 'Platform UI' },
  { id: 'project-atlas', name: 'Project Atlas' },
  { id: 'project-nova', name: 'Project Nova' },
  { id: 'platform-api-1', name: 'Platform API 1' },
  { id: 'platform-ui-1', name: 'Platform UI 1' },
  { id: 'project-atlas-1', name: 'Project Atlas 1' },
  { id: 'project-nova-1', name: 'Project Nova 1' },
];

export function displayProjectOption(option: TpSelectOption | null): string {
  if (option === null) return '';
  if (typeof option === 'object' && 'name' in option) return String(option.name);
  return String(option);
}

export function searchProjectOptions(query: string): readonly PlaygroundProject[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  if (!normalizedQuery) return PLAYGROUND_PROJECTS;

  return PLAYGROUND_PROJECTS.filter(
    (project) =>
      project.id.toLocaleLowerCase().includes(normalizedQuery) ||
      project.name.toLocaleLowerCase().includes(normalizedQuery),
  );
}
