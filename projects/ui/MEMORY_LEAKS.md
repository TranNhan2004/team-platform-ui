# Memory-Leak Audit

Scope: all component source files in `projects/ui/src/lib` were reviewed, including their templates and styles where relevant. Test files were excluded. The two transient-retention findings below have been resolved; they are retained as audit history.

Line numbers in each table refer to the component's TypeScript source file at the time of the audit.

## Avatar

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified | — | — | — | No action required. |

## Badge

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified | — | — | — | No action required. |

## BellNotification

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified | — | — | — | No action required. |

## Button

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified | — | — | — | No action required. |

## Card

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified | — | — | — | No action required. |

## Checkbox

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified | — | — | — | No action required. |

## Chip

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified | — | — | — | No action required. |

## DatePicker

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified | — | — | — | No action required. |

## Dialog

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified | — | — | — | No action required. Angular cleans up the `@HostListener` automatically. |

## Input

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified | — | — | — | No action required. |

## InputAutocomplete

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified | — | — | — | No action required. |

## InputDatePicker

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified | — | — | — | No action required. |

## InputMultiselect

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| 1 | Deferred panel-reopen and scroll-restoration callbacks are not cancelled during component destruction — resolved | 217 | 223 | Low | Resolved with `DestroyRef` cleanup for the timeout and `destroyRef.destroyed` guards before queued callbacks open the panel or change its scroll position. |
| 2 | Deferred panel-position callback is not cancelled during component destruction — resolved | 229 | 233 | Low | Resolved with the same destruction guard and timeout cleanup; pending position updates are coalesced. |

## InputSingleselect

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified | — | — | — | No action required. |

## Radio

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified | — | — | — | No action required. |

## SearchBar

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified | — | — | — | No action required. Its debounce timer is cleared through the `effect` cleanup callback. |

## Skeleton

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified | — | — | — | No action required. |

## Spinner

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified | — | — | — | No action required. |

## TextArea

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified | — | — | — | No action required. |

## TextButton

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified | — | — | — | No action required. |

## Utilities

| Ordinal Number | Risk Name | From Line | To Line | Type | How to fix |
| --- | --- | --- | --- | --- | --- |
| — | No application-owned memory-leak risk identified in `component-color.ts` or `text-wrapping.ts` | — | — | — | No action required; both modules are synchronous and do not own resources. |
