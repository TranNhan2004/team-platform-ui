import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'tp-avatar',
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Avatar {
  src = input<string | null>(null);
  alt = input('User avatar');
  size = input(40);
  tooltipTitle = input<string | null>(null);
  disabled = input(false);

  onClick = output<MouseEvent>();

  private readonly failedSrc = signal<string | null>(null);

  protected readonly hasImage = computed(() => {
    const src = this.src()?.trim();
    return !!src && this.failedSrc() !== src;
  });

  protected handleImageError(): void {
    this.failedSrc.set(this.src()?.trim() || null);
  }
}
