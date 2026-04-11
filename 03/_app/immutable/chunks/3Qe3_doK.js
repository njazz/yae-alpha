import { A as from_html, G as child, O as append, T as index, q as sibling, st as reset, w as each } from "./Db9Uo94o.js";
import "./8XMRajqd.js";
import { t as Fader } from "./Dx-mlh8-.js";
import { t as ToggleButton } from "./kMbxjoG5.js";
import { t as MomentaryButton } from "./DOAmak3h.js";
//#region src/lib/components/FadersPage.svelte
var root = from_html(`<div class="faders svelte-mwyp8u"><!> <div class="grid svelte-mwyp8u"></div> <div class="grid svelte-mwyp8u"></div></div>`);
function FadersPage($$anchor, $$props) {
	var div = root();
	var node = child(div);
	each(node, 16, () => Array(8), index, ($$anchor, _, i) => {
		Fader($$anchor, {
			index: i,
			get onChange() {
				return $$props.onFaderChange;
			}
		});
	});
	var div_1 = sibling(node, 2);
	each(div_1, 20, () => Array(8), index, ($$anchor, _, i) => {
		ToggleButton($$anchor, {
			index: i,
			get onChange() {
				return $$props.onButtonChange;
			}
		});
	});
	reset(div_1);
	var div_2 = sibling(div_1, 2);
	each(div_2, 20, () => Array(8), index, ($$anchor, _, i) => {
		MomentaryButton($$anchor, {
			index: i,
			get onChange() {
				return $$props.onButtonChange;
			}
		});
	});
	reset(div_2);
	reset(div);
	append($$anchor, div);
}
//#endregion
export { FadersPage as t };
