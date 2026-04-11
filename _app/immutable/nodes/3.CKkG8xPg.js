import { A as from_html, G as child, K as first_child, O as append, it as push, q as sibling, rt as pop, st as reset } from "../chunks/Db9Uo94o.js";
import "../chunks/8XMRajqd.js";
import { t as Scope } from "../chunks/BXVJss64.js";
//#region src/routes/tests/button/+page.svelte
var root = from_html(`<h1>Scope Test</h1> <div style="width:600px; height:200px; border:1px solid #444;"><!></div>`, 1);
function _page($$anchor, $$props) {
	push($$props, true);
	let buffer = new Float32Array(1024);
	setInterval(() => {
		for (let i = 0; i < buffer.length; i++) buffer[i] = Math.sin(i / 20 + Date.now() / 11);
	}, 16);
	var fragment = root();
	var div = sibling(first_child(fragment), 2);
	Scope(child(div), { get buffer() {
		return buffer;
	} });
	reset(div);
	append($$anchor, fragment);
	pop();
}
//#endregion
export { _page as component };
