---
"git-json-resolver": major
---

⚠️ **Breaking change**: Arrays are no longer merged element-by-element under the default `merge` strategy.  
Only **plain objects** are merged by default. Arrays must now be handled with explicit strategies (e.g. `concat`, `unique`, or custom).

This change avoids unpredictable results when merging arrays of different lengths or semantics, making merging more predictable and safe.
