# 1. Description

`TpInputMultiselect` loops over the raw options array with `track option`, while its selection logic already treats options as unique.

# 2. Fix Apply

Render the computed unique option list so each repeated option has one stable tracking key.

# 3. Issue Impact Scope

Impacts option rendering when callers provide duplicate values and prevents Angular duplicate-key errors.
