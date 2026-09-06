# 1. Description

`TpTable.goToPageOptions` currently allocates an array from page 1 through `pageCount`; server data can make that array unbounded.

# 2. Fix Apply

Generate only a bounded, sorted window of page choices around the current page and the first/last pages.

# 3. Issue Impact Scope

Impacts large server-side tables by preventing page-navigation rendering from consuming excessive memory or blocking the UI.
