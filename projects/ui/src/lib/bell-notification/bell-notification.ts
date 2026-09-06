import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { nonNegativeIntegerAttribute } from '../utils/number-input';

@Component({
  selector: 'tp-bell-notification',
  imports: [MatBadgeModule, MatButtonModule, MatTooltipModule],
  templateUrl: './bell-notification.html',
  styleUrl: './bell-notification.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TpBellNotification {
  count = input(0, { transform: nonNegativeIntegerAttribute });
  ariaLabel = input('Notifications');
  tooltipTitle = input<string | null>('Notifications');
  disabled = input(false);

  onClick = output<MouseEvent>();

  protected readonly notificationCount = computed(() => Math.max(0, Math.floor(this.count())));

  protected readonly badgeText = computed(() => {
    const count = this.notificationCount();
    return count > 99 ? '99+' : count.toString();
  });

  protected readonly accessibleLabel = computed(() => {
    const count = this.notificationCount();
    return count > 0 ? `${this.ariaLabel()}, ${count} unread` : this.ariaLabel();
  });
}
