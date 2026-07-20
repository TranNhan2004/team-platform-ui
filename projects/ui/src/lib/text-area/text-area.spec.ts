import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpTextArea } from './text-area';

describe('TextArea', () => {
  let component: TpTextArea;
  let fixture: ComponentFixture<TpTextArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpTextArea],
    }).compileComponents();

    fixture = TestBed.createComponent(TpTextArea);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enforce a minimum of three rows', async () => {
    fixture.componentRef.setInput('rows', 1);
    fixture.detectChanges();
    await fixture.whenStable();

    const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;

    expect(textarea.rows).toBe(3);
  });

  it('should show a character counter when a limit is set', async () => {
    fixture.componentRef.setInput('maxLength', 10);
    component.value.set('Hello');
    fixture.detectChanges();
    await fixture.whenStable();

    const hints = Array.from(fixture.nativeElement.querySelectorAll('mat-hint')) as HTMLElement[];

    expect(hints.at(-1)?.textContent?.trim()).toBe('5/10');
  });

  it('should hide the character counter when no limit is set', () => {
    expect(fixture.nativeElement.querySelector('mat-hint')).toBeNull();
  });

  it('should show the required error after an empty textarea is touched', async () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    await fixture.whenStable();

    const textarea = fixture.nativeElement.querySelector('textarea') as HTMLTextAreaElement;
    textarea.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    await fixture.whenStable();

    const error = fixture.nativeElement.querySelector('.tp-text-area__error') as HTMLElement;

    expect(textarea.getAttribute('aria-invalid')).toBe('true');
    expect(error.textContent?.trim()).toBe('This field is required');
  });

  it('should apply width and max-width', async () => {
    fixture.componentRef.setInput('width', '480px');
    fixture.componentRef.setInput('maxWidth', '100%');
    fixture.detectChanges();
    await fixture.whenStable();

    const formField = fixture.nativeElement.querySelector('mat-form-field') as HTMLElement;

    expect(formField.style.width).toBe('480px');
    expect(formField.style.maxWidth).toBe('100%');
  });
});
