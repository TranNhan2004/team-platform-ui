export type TpSelectOptionPrimitive = string | number | boolean;
export type TpSelectOption = TpSelectOptionPrimitive | object;
export type TpSelectOptionDisplayFn = (option: TpSelectOption) => string;

export function getSelectOptionText(
  option: TpSelectOption | null | undefined,
  displayWith: TpSelectOptionDisplayFn | null,
): string {
  if (option === null || option === undefined) return '';

  if (displayWith) return String(displayWith(option) ?? '');

  return typeof option === 'object' ? '' : String(option);
}
