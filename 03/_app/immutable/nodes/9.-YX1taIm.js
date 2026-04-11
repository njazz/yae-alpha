import { A as from_html, F as event, G as child, J as proxy, L as get, O as append, X as state, Y as set, it as push, q as sibling, rt as pop, st as reset } from "../chunks/Db9Uo94o.js";
import "../chunks/8XMRajqd.js";
import { t as LogViewer } from "../chunks/3U5MfUBB.js";
//#region src/routes/tests/log_viewer/+page.svelte
var root = from_html(`<div style="padding: 20px;"><button style="margin-bottom: 10px;">Add Log</button> <!></div>`);
function _page($$anchor, $$props) {
	push($$props, true);
	let addCount = 0;
	let extraLogs = state(proxy([]));
	function addLog() {
		set(extraLogs, [...get(extraLogs), {
			id: Date.now(),
			message: `New log ${++addCount}`,
			level: "message",
			timestamp: /* @__PURE__ */ new Date()
		}], true);
	}
	var div = root();
	var button = child(div);
	LogViewer(sibling(button, 2), {});
	reset(div);
	event("click", button, addLog);
	append($$anchor, div);
	pop();
}
//#endregion
export { _page as component };
