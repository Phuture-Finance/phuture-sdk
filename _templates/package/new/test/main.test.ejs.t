---
to: "<%= withTest ? `packages/${h.changeCase.param(name)}/test/${h.changeCase.param(name)}.test.ts` : null %>"
---
import test from 'ava';
import {<%= h.changeCase.camel(name) %>} from '../src';

/** @test {<%= h.changeCase.camel(name) %>} */
test('<%= h.changeCase.camel(name) %>', (t) => {

});
