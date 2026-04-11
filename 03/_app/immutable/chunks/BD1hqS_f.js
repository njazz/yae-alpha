import { A as from_html, D as set_text, E as if_block, F as event, G as child, H as template_effect, K as first_child, L as get, O as append, T as index, X as state, Y as set, _ as set_class, b as component, c as spread_props, it as push, k as comment, o as prop, q as sibling, rt as pop, st as reset, w as each } from "./Db9Uo94o.js";
import "./8XMRajqd.js";
//#region src/lib/components/Tabs.svelte
var root_1 = from_html(`<button> </button>`);
var root = from_html(`<div class="container svelte-126ak3w"><div class="headers svelte-126ak3w"></div> <div class="content svelte-126ak3w"><!></div></div>`);
function Tabs($$anchor, $$props) {
	push($$props, true);
	let tabs = prop($$props, "tabs", 19, () => []);
	let activeIndex = state(0);
	var div = root();
	var div_1 = child(div);
	each(div_1, 21, tabs, index, ($$anchor, tab, index) => {
		var button = root_1();
		let classes;
		var text = child(button, true);
		reset(button);
		template_effect(() => {
			classes = set_class(button, 1, "svelte-126ak3w", null, classes, { selected: get(activeIndex) === index });
			set_text(text, get(tab).label);
		});
		event("click", button, () => set(activeIndex, index, true));
		append($$anchor, button);
	});
	reset(div_1);
	var div_2 = sibling(div_1, 2);
	var node = child(div_2);
	var consequent = ($$anchor) => {
		var fragment = comment();
		component(first_child(fragment), () => tabs()[get(activeIndex)].content, ($$anchor, $$component) => {
			$$component($$anchor, spread_props(() => tabs()[get(activeIndex)].props));
		});
		append($$anchor, fragment);
	};
	if_block(node, ($$render) => {
		if (tabs()[get(activeIndex)]) $$render(consequent);
	});
	reset(div_2);
	reset(div);
	append($$anchor, div);
	pop();
}
//#endregion
export { Tabs as t };
