---
to: "<%= withTest ? `packages/comparators/test/${h.changeCase.param(name)}.comparator.test.ts` : null %>"
---
import {expect} from 'chai';
import {<%= h.changeCase.camel(name) %>Comparator} from '../src';

/** @test {<%= h.changeCase.camel(name) %>Comparator} */
test('<%= h.changeCase.camel(name) %>Comparator', () => {

});
