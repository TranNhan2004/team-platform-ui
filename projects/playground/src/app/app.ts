import { Component, signal } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import {
  TpAvatar,
  TpBellNotification,
  TpButton,
  TpCard,
  TpCheckbox,
  TpChip,
  TpDatePicker,
  TpDialog,
  TpInput,
  TpInputAutocomplete,
  TpInputDatePicker,
  TpInputMultiselect,
  TpInputSingleselect,
  TpRadio,
  TpSearchBar,
  TpSkeleton,
  TpSpinner,
  TpTextArea,
  TpTextButton,
} from 'ui';

@Component({
  selector: 'app-root',
  imports: [
    TpAvatar,
    TpBellNotification,
    TpButton,
    TpCard,
    TpChip,
    TpCheckbox,
    TpDatePicker,
    TpDialog,
    TpInput,
    TpInputAutocomplete,
    TpInputDatePicker,
    TpInputSingleselect,
    TpInputMultiselect,
    TpRadio,
    TpSearchBar,
    TpSkeleton,
    TpSpinner,
    TpTextButton,
    TpTextArea,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly colors = [
    'gray',
    'red',
    'pink',
    'amber',
    'orange',
    'yellow',
    'green',
    'emerald',
    'teal',
    'blue',
    'cyan',
    'purple',
    'violet',
    'indigo',
  ] as const;
  protected readonly buttonVariants = ['filled', 'outlined', 'tonal'] as const;
  protected readonly chipVariants = ['filled', 'outlined', 'tonal', 'text'] as const;
  protected readonly sizes = ['sm', 'md', 'lg'] as const;
  protected readonly searchValue = signal('');
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
  protected readonly selectedProjects = signal<string[]>(['Platform API', 'Project Nova']);
  protected readonly notificationsEnabled = signal(false);
  protected readonly selectedPlan = signal('starter');
  protected readonly selectedDate = signal<Date | null>(new Date(2032, 5, 15));
  protected readonly calendarDate = signal<Date | null>(null);
  protected readonly minPlaygroundDate = new Date(2025, 0, 1);
  protected readonly maxPlaygroundDate = new Date(2030, 11, 31);

  protected selectPlan(plan: string, checked: boolean): void {
    if (checked) {
      this.selectedPlan.set(plan);
    }
  }

  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
