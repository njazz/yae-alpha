import { A as from_html, D as set_text, F as event, G as child, H as template_effect, L as get, O as append, X as state, Y as set, d as bind_value, g as set_style, it as push, p as remove_input_defaults, q as sibling, rt as pop, st as reset } from "./Db9Uo94o.js";
import "./8XMRajqd.js";
//#region src/lib/components/Fader.svelte
var root = from_html(`<div style="margin:2px; display:flex; flex-direction:column; width:98%;"><div style="position:relative; width:100%;"><input type="range" min="0" max="100" class="svelte-19z4yks"/> <div style="
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        color:#fff;
        pointer-events:none;
        font-size:14px;
        margin-top:-4px;
      "> </div></div></div>`);
function Fader($$anchor, $$props) {
	push($$props, true);
	let value = state(0);
	function handleInput(event) {
		var _$$props$onChange;
		const val = Number(event.target.value);
		set(value, val, true);
		(_$$props$onChange = $$props.onChange) === null || _$$props$onChange === void 0 || _$$props$onChange.call($$props, $$props.index, val / 100);
	}
	var div = root();
	var div_1 = child(div);
	var input = child(div_1);
	remove_input_defaults(input);
	var div_2 = sibling(input, 2);
	var text = child(div_2);
	reset(div_2);
	reset(div_1);
	reset(div);
	template_effect(() => {
		var _$$props$index, _$$get;
		set_style(input, `width:100%;
        height:36px;
        border-radius:5px;
        appearance:none;
        -webkit-appearance:none;
        background: linear-gradient(to right, #ff6633 ${get(value)}%, #555 ${get(value)}%);
        outline:none;
        cursor:pointer;
        margin:0;`);
		set_text(text, `F${(_$$props$index = $$props.index) !== null && _$$props$index !== void 0 ? _$$props$index : ""}: ${(_$$get = get(value)) !== null && _$$get !== void 0 ? _$$get : ""}%`);
	});
	bind_value(input, () => get(value), ($$value) => set(value, $$value));
	event("input", input, handleInput);
	append($$anchor, div);
	pop();
}
//#endregion
export { Fader as t };
