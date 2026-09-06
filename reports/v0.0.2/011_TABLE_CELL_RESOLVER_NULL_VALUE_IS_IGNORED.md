# 1. Description

`cellValue` uses nullish coalescing after invoking `column.value`, so an intentional `null`/`undefined` resolver result falls back to the row property.

# 2. Fix Apply

Treat the presence of `column.value` as authoritative and call the row-property fallback only when no resolver was supplied.

# 3. Issue Impact Scope

Impacts custom table columns that intentionally hide or blank a cell.
