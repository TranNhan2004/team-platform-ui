# 1. Description

Count, diameter, stroke, avatar size, and table numeric values can receive non-finite or invalid ranges and pass them into rendering calculations.

# 2. Fix Apply

Add shared finite-number transforms and clamp presentation values to safe non-negative/positive ranges before computing styles.

# 3. Issue Impact Scope

Impacts badges, spinners, avatars, and pagination under malformed numeric inputs.
