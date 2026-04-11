import { A as from_html, D as set_text, G as child, H as template_effect, O as append, q as sibling, st as reset } from "../chunks/Db9Uo94o.js";
import "../chunks/8XMRajqd.js";
//#region src/lib/components/CodeSidebar.svelte
var root$1 = from_html(`<div style="
    width:300px;
    background:#2e2e2e;
    color:#fff;
    padding:10px;
    font-family:monospace;
    overflow-y:auto;
  "><div>Source:</div> <pre style="
      background:#444;
      color:#fff;
      padding:4px 8px;
      border-radius:4px;
    "> </pre> <div>Processed:</div> <pre style="
      background:#444;
      color:#fff;
      padding:4px 8px;
      border-radius:4px;
    "> </pre></div>`);
function CodeSidebar($$anchor, $$props) {
	var div = root$1();
	var pre = sibling(child(div), 2);
	var text = child(pre);
	reset(pre);
	var pre_1 = sibling(pre, 4);
	var text_1 = child(pre_1);
	reset(pre_1);
	reset(div);
	template_effect(() => {
		var _$$props$codeText, _$$props$outputCode;
		set_text(text, `
    ${(_$$props$codeText = $$props.codeText) !== null && _$$props$codeText !== void 0 ? _$$props$codeText : ""}
  `);
		set_text(text_1, `
    ${(_$$props$outputCode = $$props.outputCode) !== null && _$$props$outputCode !== void 0 ? _$$props$outputCode : ""}
  `);
	});
	append($$anchor, div);
}
//#endregion
//#region src/routes/tests/code_sidebar/+page.svelte
var root = from_html(`<div style="height: 100vh;"><!></div>`);
function _page($$anchor) {
	const codeText = `console.log("Hello");`;
	const outputCode = `console.log("Processed");`;
	var div = root();
	CodeSidebar(child(div), {
		codeText,
		outputCode
	});
	reset(div);
	append($$anchor, div);
}
//#endregion
export { _page as component };
