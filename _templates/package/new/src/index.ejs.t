---
to: packages/<%= h.changeCase.param(name) %>/src/index.ts
---
export * from './<%= h.changeCase.param(name) %>';
