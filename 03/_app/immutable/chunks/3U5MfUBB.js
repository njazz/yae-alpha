import { A as from_html, D as set_text, E as if_block, F as event, G as child, H as template_effect, J as proxy, K as first_child, L as get, O as append, X as state, Y as set, Z as user_derived, d as bind_value, g as set_style, h as bind_select_value, it as push, k as comment, p as remove_input_defaults, q as sibling, rt as pop, st as reset, w as each } from "./Db9Uo94o.js";
import "./8XMRajqd.js";
//#region src/lib/components/LogViewer.svelte
var root_1 = from_html(`<div class="empty svelte-1369jw">No logs found</div>`);
var root_3 = from_html(`<div class="log svelte-1369jw"><div class="row svelte-1369jw"><span> </span> <span class="timestamp svelte-1369jw"> </span></div></div>`);
var root = from_html(`<div class="container svelte-1369jw"><div class="controls svelte-1369jw"><input type="text" placeholder="Search logs..." class="input svelte-1369jw"/> <select class="select svelte-1369jw"><option>All</option><option>Message</option><option>Warning</option><option>Error</option></select> <button class="button svelte-1369jw">Clear</button></div> <div class="log-box svelte-1369jw"><!></div></div>`);
function LogViewer($$anchor, $$props) {
	push($$props, true);
	const levelColors = {
		message: "#ffffff",
		warning: "#fff3cd",
		error: "#ffebee"
	};
	let logs = state(proxy([
		{
			id: 1,
			message: "System initialized",
			level: "message",
			timestamp: /* @__PURE__ */ new Date()
		},
		{
			id: 2,
			message: "User logged in",
			level: "message",
			timestamp: /* @__PURE__ */ new Date()
		},
		{
			id: 3,
			message: "Error fetching data",
			level: "error",
			timestamp: /* @__PURE__ */ new Date()
		},
		{
			id: 4,
			message: "Disk space is running low",
			level: "warning",
			timestamp: /* @__PURE__ */ new Date()
		}
	]));
	let query = state("");
	let levelFilter = state("all");
	const filteredLogs = user_derived(() => () => {
		return get(logs).filter((log) => {
			const matchesQuery = log.message.toLowerCase().includes(get(query).toLowerCase());
			const matchesLevel = get(levelFilter) === "all" || log.level === get(levelFilter);
			return matchesQuery && matchesLevel;
		});
	});
	function clearLogs() {
		set(logs, [], true);
	}
	var div = root();
	var div_1 = child(div);
	var input = child(div_1);
	remove_input_defaults(input);
	var select = sibling(input, 2);
	var option = child(select);
	option.value = option.__value = "all";
	var option_1 = sibling(option);
	option_1.value = option_1.__value = "message";
	var option_2 = sibling(option_1);
	option_2.value = option_2.__value = "warning";
	var option_3 = sibling(option_2);
	option_3.value = option_3.__value = "error";
	reset(select);
	var button = sibling(select, 2);
	reset(div_1);
	var div_2 = sibling(div_1, 2);
	var node = child(div_2);
	var consequent = ($$anchor) => {
		append($$anchor, root_1());
	};
	var alternate = ($$anchor) => {
		var fragment = comment();
		each(first_child(fragment), 17, () => get(filteredLogs), (log) => log.id, ($$anchor, log) => {
			var div_4 = root_3();
			var div_5 = child(div_4);
			var span = child(div_5);
			var text = child(span, true);
			reset(span);
			var span_1 = sibling(span, 2);
			var text_1 = child(span_1, true);
			reset(span_1);
			reset(div_5);
			reset(div_4);
			template_effect(($0) => {
				set_style(div_4, `background-color: ${levelColors[get(log).level] || "transparent"}`);
				set_text(text, get(log).message);
				set_text(text_1, $0);
			}, [() => get(log).timestamp.toLocaleString()]);
			append($$anchor, div_4);
		});
		append($$anchor, fragment);
	};
	if_block(node, ($$render) => {
		if (get(filteredLogs).length === 0) $$render(consequent);
		else $$render(alternate, -1);
	});
	reset(div_2);
	reset(div);
	bind_value(input, () => get(query), ($$value) => set(query, $$value));
	bind_select_value(select, () => get(levelFilter), ($$value) => set(levelFilter, $$value));
	event("click", button, clearLogs);
	append($$anchor, div);
	pop();
}
//#endregion
export { LogViewer as t };
