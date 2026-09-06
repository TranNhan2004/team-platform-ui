# 1. Description

The dialog is implemented as a custom fixed overlay in `projects/ui/src/lib/dialog/dialog.html` and currently has no CDK focus trap or automatic focus capture/restoration.

# 2. Fix Apply

Add `CdkTrapFocus` with auto-capture to the dialog surface, handle Escape on the active backdrop, and let the dialog restore focus when it closes.

# 3. Issue Impact Scope

Impacts keyboard and assistive-technology users of `TpDialog`, especially when multiple dialogs or interactive controls are present.
