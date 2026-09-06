# 1. Description

`TpInputDatePicker` exposes `required` but has no touched/error state; its visible input is always readonly, so native required validation cannot report an empty date.

# 2. Fix Apply

Add Signal Forms validation inputs, touched tracking, an invalid/error presentation, and connect the date control to the error description.

# 3. Issue Impact Scope

Impacts required date fields and prevents empty values from being silently accepted in forms.
