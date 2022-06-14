---
to: "<%= withTest ? `plugins/plugin-${h.changeCase.param(name)}/test/${h.changeCase.param(name)}.test.ts` : null %>"
---
import {expect} from 'chai';
import {<%= h.changeCase.camel(name) %>} from '../src';

/** @test {<%= h.changeCase.camel(name) %>} */
test('<%= h.changeCase.camel(name) %>', () => {

});
