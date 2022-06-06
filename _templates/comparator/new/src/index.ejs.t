---
inject: true
to: packages/comparators/src/index.ts
append: true
---
import { <%= h.changeCase.camel(name) %>Comparator } from './<%= h.changeCase.param(name) %>.comparator';
