import { A as from_html, G as child, O as append, st as reset } from "../chunks/Db9Uo94o.js";
import "../chunks/8XMRajqd.js";
import { t as MarkdownSidebar } from "../chunks/DOOFm0Z5.js";
//#region src/routes/tests/markdown_sidebar/+page.svelte
var root = from_html(`<div style="height: 100vh; display: flex;"><!></div>`);
function _page($$anchor) {
	function handleLoadText(code) {
		console.log("Replace with:", code);
	}
	var div = root();
	MarkdownSidebar(child(div), { onLoadText: handleLoadText });
	reset(div);
	append($$anchor, div);
}
//#endregion
export { _page as component };
