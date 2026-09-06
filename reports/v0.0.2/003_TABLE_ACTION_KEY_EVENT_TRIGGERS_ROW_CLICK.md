# 1. Description

Rows handle bubbled `keydown` events while their action menu trigger is also a keyboard control, so Enter or Space can activate both behaviors.

# 2. Fix Apply

Ignore row keyboard activation when the event target is a descendant control, while retaining keyboard activation on the row itself.

# 3. Issue Impact Scope

Impacts clickable tables with action columns and prevents unintended row navigation or selection.
