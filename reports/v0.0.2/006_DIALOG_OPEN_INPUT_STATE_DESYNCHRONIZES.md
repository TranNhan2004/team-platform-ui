# 1. Description

`TpDialog` uses a `linkedSignal` copy of the `open` input; closing locally can leave the parent input true and prevent a consistent reopen cycle.

# 2. Fix Apply

Use a writable model for `open` and bind the template directly to that model so internal and external state share one source of truth.

# 3. Issue Impact Scope

Impacts programmatic open/close control and consumers using one-way or two-way dialog state.
