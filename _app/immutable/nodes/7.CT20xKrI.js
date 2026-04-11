import { A as from_html, G as child, O as append, q as sibling, st as reset } from "../chunks/Db9Uo94o.js";
import "../chunks/8XMRajqd.js";
import { t as Fader } from "../chunks/Dx-mlh8-.js";
//#region src/routes/tests/fader/+page.svelte
var root = from_html(`<div style="width: 300px; padding: 20px; background: #222;"><!> <!> <!></div>`);
function _page($$anchor) {
	function handleChange(index, value) {
		console.log("Fader changed:", index, value);
	}
	var div = root();
	var node = child(div);
	Fader(node, {
		index: 0,
		onChange: handleChange
	});
	var node_1 = sibling(node, 2);
	Fader(node_1, {
		index: 1,
		onChange: handleChange
	});
	Fader(sibling(node_1, 2), {
		index: 2,
		onChange: handleChange
	});
	reset(div);
	append($$anchor, div);
}
//#endregion
export { _page as component };
