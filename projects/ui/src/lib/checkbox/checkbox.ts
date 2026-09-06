import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'tp-checkbox',
  imports: [MatCheckboxModule],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TpCheckbox implements FormCheckboxControl {
  checked = model(false);
  touched = model(false);

  disabled = input(false);
  indeterminate = input(false);
  required = input(false);
  name = input('');
  nativeValue = input('on');
  ariaLabel = input<string | null>(null);
  tabIndex = input(0);

  protected updateChecked(event: MatCheckboxChange): void {
    this.checked.set(event.checked);
    this.touched.set(true);
  }
}
