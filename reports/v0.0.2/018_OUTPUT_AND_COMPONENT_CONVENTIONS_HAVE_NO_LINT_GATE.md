# 1. Description

The project has no lint target that checks explicit `output()` property names, so the `on` naming convention can regress silently.

# 2. Fix Apply

Add a small repository lint script and npm command that scans UI TypeScript output declarations and fails when an explicit output property lacks the `on` prefix.

# 3. Issue Impact Scope

Impacts maintainability and API consistency for every exported UI component.
