import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { TpInputMultiselect } from './input-multiselect';

describe('InputMultiselect', () => {
  let component: TpInputMultiselect;
  let fixture: ComponentFixture<TpInputMultiselect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TpInputMultiselect],
    }).compileComponents();

    fixture = TestBed.createComponent(TpInputMultiselect);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle one selected value', () => {
    const toggleOption = (
      component as unknown as { toggleOption: (option: string) => void }
    ).toggleOption;

    toggleOption.call(component, 'Platform UI');
    expect(component.value()).toEqual(['Platform UI']);

    toggleOption.call(component, 'Platform UI');
    expect(component.value()).toEqual([]);
  });

  it('should select and unselect every option', async () => {
    fixture.componentRef.setInput('options', ['Platform API', 'Platform UI']);
    fixture.detectChanges();
    await fixture.whenStable();

    const toggleAll = (component as unknown as { toggleAll: () => void }).toggleAll;
    toggleAll.call(component);
    expect(component.value()).toEqual(['Platform API', 'Platform UI']);

    toggleAll.call(component);
    expect(component.value()).toEqual([]);
  });

  it('should clear the trigger after a keyboard selection', async () => {
    fixture.componentRef.setInput('options', ['Platform API', 'Platform UI']);
    component.value.set(['Platform API', 'Platform UI']);
    fixture.detectChanges();
    await fixture.whenStable();

    const triggerInput = fixture.nativeElement.querySelector(
      '.tp-input-multiselect__trigger',
    ) as HTMLInputElement;
    triggerInput.value = '__tp-input-multiselect-select-all__';

    const selectOption = (
      component as unknown as {
        selectOption: (event: {
          option: {
            value: string;
            deselect: (emitEvent: boolean) => void;
            setInactiveStyles: () => void;
          };
        }) => void;
      }
    ).selectOption;
    selectOption.call(component, {
      option: {
        value: '__tp-input-multiselect-select-all__',
        deselect: () => undefined,
        setInactiveStyles: () => undefined,
      },
    });

    expect(component.value()).toEqual([]);
    expect(triggerInput.value).toBe('');
  });

  it('should limit visible chips and report the remainder', async () => {
    fixture.componentRef.setInput('maxChips', 1);
    component.value.set(['Platform API', 'Platform UI']);
    fixture.detectChanges();
    await fixture.whenStable();

    const visibleSelectedValues = (
      component as unknown as { visibleSelectedValues: () => readonly string[] }
    ).visibleSelectedValues();
    const hiddenSelectedCount = (
      component as unknown as { hiddenSelectedCount: () => number }
    ).hiddenSelectedCount();

    expect(visibleSelectedValues).toEqual(['Platform API']);
    expect(hiddenSelectedCount).toBe(1);
  });

  it('should clear every selected value', () => {
    component.value.set(['Platform API', 'Platform UI']);

    const clearAll = (
      component as unknown as { clearAll: (event: MouseEvent) => void }
    ).clearAll;
    clearAll.call(component, new MouseEvent('click'));

    expect(component.value()).toEqual([]);
  });

  it('should float the title when values are selected', () => {
    component.value.set(['Platform API']);

    const floatLabel = (component as unknown as { floatLabel: () => 'always' | 'auto' })
      .floatLabel();

    expect(floatLabel).toBe('always');
  });

  it('should keep the title floating above selected values', async () => {
    fixture.componentRef.setInput('title', 'Projects');
    component.value.set(['Platform API']);
    fixture.detectChanges();
    await fixture.whenStable();

    const title = fixture.nativeElement.querySelector('.mat-mdc-floating-label') as HTMLElement;
    const triggerInput = fixture.nativeElement.querySelector(
      '.tp-input-multiselect__trigger',
    ) as HTMLInputElement;

    expect(title.classList).toContain('mdc-floating-label--float-above');
    expect(triggerInput.value).toBe('Platform API');
  });

  it('should clear deferred panel callbacks when destroyed', async () => {
    vi.useFakeTimers();
    const deferredCallback = vi.fn();
    const internals = component as unknown as {
      pendingPanelScrollTop: number | undefined;
      panelPositionTimeout: ReturnType<typeof setTimeout> | undefined;
      panelReopenTimeout: ReturnType<typeof setTimeout> | undefined;
    };

    internals.pendingPanelScrollTop = 120;
    internals.panelReopenTimeout = setTimeout(deferredCallback, 0);
    internals.panelPositionTimeout = setTimeout(deferredCallback, 0);

    fixture.destroy();

    expect(internals.pendingPanelScrollTop).toBeUndefined();
    expect(internals.panelReopenTimeout).toBeUndefined();
    expect(internals.panelPositionTimeout).toBeUndefined();

    await vi.runAllTimersAsync();
    expect(deferredCallback).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('should coalesce deferred panel-position updates', async () => {
    vi.useFakeTimers();
    const internals = component as unknown as {
      optionsTrigger: () => { updatePosition: () => void } | undefined;
      panelPositionTimeout: ReturnType<typeof setTimeout> | undefined;
      updatePanelPosition: () => void;
    };
    const trigger = internals.optionsTrigger();
    const updatePosition = vi.spyOn(trigger!, 'updatePosition');

    internals.updatePanelPosition();
    internals.updatePanelPosition();
    await new Promise<void>((resolve) => queueMicrotask(resolve));

    expect(updatePosition).toHaveBeenCalledTimes(1);
    expect(internals.panelPositionTimeout).toBeDefined();

    await vi.advanceTimersByTimeAsync(0);
    expect(updatePosition).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });
});
