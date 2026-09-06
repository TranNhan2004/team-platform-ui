# 1. Description

`TpInput` sets `--tp-input-height` and `--tp-input-max-height` on the host and repeats the same bindings on the internal form field.

# 2. Fix Apply

Remove the duplicate host bindings and keep one internal form-field binding for the component’s sizing variables.

# 3. Issue Impact Scope

Impacts style evaluation and makes the input sizing source unambiguous.
