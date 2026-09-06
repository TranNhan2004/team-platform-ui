# 1. Description

`TpChip` applies `fontSize` and `fontWeight` to both the Material chip and its nested content span.

# 2. Fix Apply

Keep one style binding on the chip host and let the content inherit those values.

# 3. Issue Impact Scope

Impacts chip cascade predictability and creates redundant inline style work.
