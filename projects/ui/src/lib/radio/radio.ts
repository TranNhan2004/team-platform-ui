import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'tp-radio',
  imports: [MatRadioModule],
  templateUrl: './radio.html',
  styleUrl: './radio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Radio {
  checked = model(false);
  touched = model(false);

  label = input('');
  disabled = input(false);
  required = input(false);
  name = input('');
  value = input<unknown>(null);
  ariaLabel = input<string | null>(null);

  protected updateChecked(event: MatRadioChange): void {
    this.checked.set(event.source.checked);
    this.touched.set(true);
  }
}
