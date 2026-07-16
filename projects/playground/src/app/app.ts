import { Component, signal } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import {
  Avatar,
  BellNotification,
  Button,
  Card,
  Chip,
  DatePicker,
  Dialog,
  Input,
  InputDatePicker,
  SearchBar,
  Skeleton,
  TextButton,
} from 'ui';

@Component({
  selector: 'app-root',
  imports: [
    Avatar,
    BellNotification,
    Button,
    Card,
    Chip,
    DatePicker,
    Dialog,
    Input,
    InputDatePicker,
    SearchBar,
    Skeleton,
    TextButton,
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
  protected readonly selectedDate = signal<Date | null>(new Date(2032, 5, 15));
  protected readonly calendarDate = signal<Date | null>(null);
  protected readonly minPlaygroundDate = new Date(2025, 0, 1);
  protected readonly maxPlaygroundDate = new Date(2030, 11, 31);

  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
