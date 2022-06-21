import {expect} from "chai"
import {withDefaults} from "../src"

const defaults = {a: 1, b: {c: 2, d: 3}}

test("withDefaults should equal defaults when options is {}", () => {
    expect(withDefaults({}, defaults)).to.deep.equal(defaults)
})

test('withDefaults should merge defaults into options', () => {
	expect(withDefaults({a: 2}, defaults)).to.deep.equal({
		a: 2,
		b: {c: 2, d: 3},
	});
});

test("withDefaults should deeply merge defaults into options", () => {
    expect(withDefaults({a: 2, b: {c: 4}}, defaults)).to.deep.equal({
        a: 2,
        b: {c: 4, d: 3},
    })
})
