import { Component, signal } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import {
  Avatar,
  BellNotification,
  Button,
  Card,
  Chip,
  Dialog,
  SearchBar,
  Skeleton,
  TextButton,
} from 'ui';

@Component({
  selector: 'app-root',
  imports: [Avatar, BellNotification, Button, Card, Chip, Dialog, SearchBar, Skeleton, TextButton],
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

  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass('material-symbols-outlined');
  }
}
