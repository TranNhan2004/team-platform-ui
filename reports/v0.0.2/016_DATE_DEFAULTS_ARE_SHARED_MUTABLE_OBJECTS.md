# 1. Description

Date input defaults reference exported `Date` objects directly, allowing external mutation to affect later component instances.

# 2. Fix Apply

Keep the public constants for compatibility but create a fresh `Date` instance for each input default.

# 3. Issue Impact Scope

Impacts date-picker isolation when a caller mutates a supplied/default date object.
