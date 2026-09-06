# 1. Description

Server totals and pagination values are converted and used without consistently sanitizing non-finite or negative values.

# 2. Fix Apply

Normalize total rows, page sizes, and page-size options to finite positive integers before deriving page counts and ranges.

# 3. Issue Impact Scope

Impacts malformed or hostile pagination configuration and keeps navigation state finite.
