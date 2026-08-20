---
name: GitHub connector path calls
description: CodeExecution GitHub proxy calls may reject dynamically composed paths.
---

When using the GitHub connection inside CodeExecution, call `proxyFetch` with a literal API path where possible. Dynamically composed path strings can be rejected as not starting with `/`, even when they visibly do.

**Why:** The connector proxy's runtime path validation can behave differently for dynamic values in the execution sandbox.

**How to apply:** For one-off repository updates, prefer direct, literal REST endpoints and generate only request bodies dynamically. Use the authenticated GitHub connection rather than exposing or requesting a personal token.