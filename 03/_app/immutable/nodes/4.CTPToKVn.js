import { A as from_html, O as append, T as index, st as reset, w as each } from "../chunks/Db9Uo94o.js";
import "../chunks/8XMRajqd.js";
import { t as MomentaryButton } from "../chunks/DOAmak3h.js";
//#region src/routes/tests/button_momentary/+page.svelte
var root = from_html(`<div style="display:flex; gap:10px; padding:20px; background:#222;"></div>`);
function _page($$anchor) {
	function handleChange(index, value) {
		console.log("Momentary:", index, value);
	}
	var div = root();
	each(div, 20, () => Array(8), index, ($$anchor, _, i) => {
		MomentaryButton($$anchor, {
			index: i,
			onChange: handleChange
		});
	});
	reset(div);
	append($$anchor, div);
}
//#endregion
export { _page as component };
