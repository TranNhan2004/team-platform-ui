# 1. Description

The table template calls `rowText` twice and `displayCellText` once for every visible cell, repeating resolver and stringification work.

# 2. Fix Apply

Compute one cell presentation object per cell with the full tooltip text and truncated display text, then bind both values from it.

# 3. Issue Impact Scope

Impacts rendering cost for large tables and columns with expensive value callbacks.
