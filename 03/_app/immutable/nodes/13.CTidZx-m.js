import { A as from_html, G as child, O as append, st as reset } from "../chunks/Db9Uo94o.js";
import "../chunks/8XMRajqd.js";
import { t as Tabs } from "../chunks/BD1hqS_f.js";
//#region src/routes/tests/tabs/+page.svelte
var root = from_html(`<div style="height: 300px;"><!></div>`);
function _page($$anchor) {
	const tabs = [
		{
			label: "Tab 1",
			content: "Content for tab 1"
		},
		{
			label: "Tab 2",
			content: "Content for tab 2"
		},
		{
			label: "Tab 3",
			content: "Content for tab 3"
		}
	];
	var div = root();
	Tabs(child(div), { get tabs() {
		return tabs;
	} });
	reset(div);
	append($$anchor, div);
}
//#endregion
export { _page as component };
