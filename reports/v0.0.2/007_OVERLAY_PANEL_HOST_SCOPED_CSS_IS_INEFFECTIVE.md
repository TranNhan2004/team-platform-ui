# 1. Description

Panel rules in the select/autocomplete stylesheets use `:host ::ng-deep`, which requires the CDK overlay panel to be a descendant of the component host.

# 2. Fix Apply

Move only overlay-panel selectors to global `::ng-deep` selectors scoped by their unique panel class; keep component form-field rules host-scoped.

# 3. Issue Impact Scope

Impacts option-panel feedback/layout styling for all select and autocomplete components.
