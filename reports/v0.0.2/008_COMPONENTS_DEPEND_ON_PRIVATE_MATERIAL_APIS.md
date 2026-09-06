# 1. Description

The components call private Material members such as `MatSelect._positions`, `MatAutocomplete._getScrollTop`, `_setScrollTop`, and `MatOption.setInactiveStyles`.

# 2. Fix Apply

Remove private positioning/scroll-state manipulation and rely on public option, panel, and trigger APIs.

# 3. Issue Impact Scope

Impacts compatibility with Angular Material patch/minor updates and reduces upgrade breakage risk.
