import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpTextButton } from './text-button';

describe('TextButton', () => {
  let component: TpTextButton;
  let fixture: ComponentFixture<TpTextButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpTextButton],
    }).compileComponents();

    fixture = TestBed.createComponent(TpTextButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the click event', () => {
    const onClick = vi.fn();
    component.onClick.subscribe(onClick);

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
  });

  it.each(['circle', 'elip', 'rect'] as const)(
    'should apply the %s press effect shape',
    async (pressEffectShape) => {
      fixture.componentRef.setInput('pressEffectShape', pressEffectShape);
      fixture.detectChanges();
      await fixture.whenStable();

      const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

      expect(button.classList.contains(`tp-text-button--shape-${pressEffectShape}`)).toBe(true);
      expect(button.classList.contains(`tp-text-button--hover-shape-${pressEffectShape}`)).toBe(
        true,
      );
    },
  );

  it('should apply an explicit hover shape independently from the press effect shape', async () => {
    fixture.componentRef.setInput('pressEffectShape', 'rect');
    fixture.componentRef.setInput('hoverShape', 'circle');
    fixture.detectChanges();
    await fixture.whenStable();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;

    expect(button.classList.contains('tp-text-button--shape-rect')).toBe(true);
    expect(button.classList.contains('tp-text-button--hover-shape-circle')).toBe(true);
  });
});
