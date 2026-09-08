import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { TpInputAutocompleteSingleselect } from './input-autocomplete-singleselect';

describe('InputAutocompleteSingleselect', () => {
  let component: TpInputAutocompleteSingleselect;
  let fixture: ComponentFixture<TpInputAutocompleteSingleselect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpInputAutocompleteSingleselect],
    }).compileComponents();

    fixture = TestBed.createComponent(TpInputAutocompleteSingleselect);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow overriding loading and no-results messages', () => {
    fixture.componentRef.setInput('loadingMessage', 'Fetching projects');
    fixture.componentRef.setInput('noResultsMessage', 'No projects found');

    expect(component.loadingMessage()).toBe('Fetching projects');
    expect(component.noResultsMessage()).toBe('No projects found');
  });

  it('should update its single value and emit the trimmed search text', () => {
    const onSearch = vi.fn();
    component.onSearch.subscribe(onSearch);

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = ' Custom project ';
    input.dispatchEvent(new Event('input'));

    expect(component.value()).toBe(' Custom project ');
    expect(onSearch).toHaveBeenCalledWith('Custom project');
  });

  it('should display server-provided object options using displayWith', async () => {
    const options = [
      { id: 'ng', name: 'Angular' },
      { id: 'rx', name: 'React' },
    ];
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('displayWith', (option: unknown) =>
      typeof option === 'object' && option !== null
        ? (option as { name: string }).name
        : String(option),
    );
    fixture.detectChanges();
    await fixture.whenStable();

    const optionText = (component as unknown as { optionText: (option: unknown) => string })
      .optionText;
    expect(optionText.call(component, options[0])).toBe('Angular');

    const selectOption = (
      component as unknown as { selectOption: (event: { option: { value: unknown } }) => void }
    ).selectOption;
    selectOption.call(component, { option: { value: options[1] } });

    expect(component.value()).toBe(options[1]);
    expect((component as unknown as { inputText: () => string }).inputText()).toBe('React');
  });

  it('should emit an empty search when the input is cleared', () => {
    const onSearch = vi.fn();
    component.onSearch.subscribe(onSearch);

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = '';
    input.dispatchEvent(new Event('input'));

    expect(onSearch).toHaveBeenCalledWith('');
  });

  it('should show the required error after an empty input is touched', async () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    await fixture.whenStable();

    const error = fixture.nativeElement.querySelector(
      '.tp-input-autocomplete-singleselect__error',
    ) as HTMLElement;

    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(error.textContent?.trim()).toBe('This field is required');
  });
});
