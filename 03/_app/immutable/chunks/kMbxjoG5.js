import { A as from_html, D as set_text, F as event, G as child, H as template_effect, L as get, O as append, X as state, Y as set, g as set_style, it as push, q as sibling, rt as pop, st as reset } from "./Db9Uo94o.js";
import "./8XMRajqd.js";
//#region src/lib/components/ToggleButton.svelte
var root = from_html(`<div style="position:relative; margin:2px; width:45px; height:45px;"><button> </button> <div style="
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
    "> </div></div>`);
function ToggleButton($$anchor, $$props) {
	push($$props, true);
	let active = state(false);
	function handleClick() {
		var _$$props$onChange;
		set(active, !get(active));
		(_$$props$onChange = $$props.onChange) === null || _$$props$onChange === void 0 || _$$props$onChange.call($$props, $$props.index, get(active));
	}
	var div = root();
	var button = child(div);
	var text = child(button);
	reset(button);
	var div_1 = sibling(button, 2);
	var text_1 = child(div_1);
	reset(div_1);
	reset(div);
	template_effect(() => {
		var _$$props$index, _$$props$index2;
		set_style(button, `
      width:100%;
      height:100%;
      border-radius:5px;
      background: ${get(active) ? "#ff6633" : "#555"};
      transition: background 0.033s ease;
      cursor:pointer;
      color:transparent;
      border:0;
      aspect-ratio:1/1;
    `);
		set_text(text, `B${(_$$props$index = $$props.index) !== null && _$$props$index !== void 0 ? _$$props$index : ""}`);
		set_text(text_1, `T${(_$$props$index2 = $$props.index) !== null && _$$props$index2 !== void 0 ? _$$props$index2 : ""}`);
	});
	event("mousedown", button, handleClick);
	append($$anchor, div);
	pop();
}
//#endregion
export { ToggleButton as t };
