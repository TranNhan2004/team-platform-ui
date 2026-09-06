# 1. Description

Component styles combine inline style bindings with repeated `!important` declarations, especially around Material button, chip, and form-field internals.

# 2. Fix Apply

Remove unnecessary `!important` declarations, use Material design-token custom properties and component-scoped selectors, and retain inline styles only for explicit size inputs.

# 3. Issue Impact Scope

Impacts application theme/custom CSS overrides across the listed UI components.
