const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../assets/0.DijiQkLR.css","../assets/MarkdownSidebar.OAGkQXrQ.css","../assets/Fader.BNmkpEpr.css","../assets/FadersPage.B9kuMjAd.css","../assets/LogViewer.Ik1HCSq1.css","../assets/Tabs.D4I6KWN9.css","../assets/2.CYZdu3fI.css"])))=>i.map(i=>d[i]);
import { A as from_html, B as tick, D as set_text, E as if_block, G as child, H as template_effect, K as first_child, L as get, M as text, O as append, U as user_effect, W as user_pre_effect, X as state, Y as set, Z as user_derived, b as component, i as asClassComponent, it as push, k as comment, o as prop, q as sibling, r as onMount, rt as pop, st as reset, u as bind_this } from "../chunks/Db9Uo94o.js";
import { t as __vitePreload } from "../chunks/_p6pPjRb.js";
import "../chunks/8XMRajqd.js";
//#region .svelte-kit/generated/client-optimized/matchers.js
var matchers = {};
//#endregion
//#region .svelte-kit/generated/root.svelte
var root_4 = from_html(`<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>`);
var root = from_html(`<!> <!>`, 1);
function Root($$anchor, $$props) {
	push($$props, true);
	let components = prop($$props, "components", 23, () => []), data_0 = prop($$props, "data_0", 3, null), data_1 = prop($$props, "data_1", 3, null);
	user_pre_effect(() => $$props.stores.page.set($$props.page));
	user_effect(() => {
		$$props.stores;
		$$props.page;
		$$props.constructors;
		components();
		$$props.form;
		data_0();
		data_1();
		$$props.stores.page.notify();
	});
	let mounted = state(false);
	let navigated = state(false);
	let title = state(null);
	onMount(() => {
		const unsubscribe = $$props.stores.page.subscribe(() => {
			if (get(mounted)) {
				set(navigated, true);
				tick().then(() => {
					set(title, document.title || "untitled page", true);
				});
			}
		});
		set(mounted, true);
		return unsubscribe;
	});
	const Pyramid_1 = user_derived(() => $$props.constructors[1]);
	var fragment = root();
	var node = first_child(fragment);
	var consequent = ($$anchor) => {
		const Pyramid_0 = user_derived(() => $$props.constructors[0]);
		var fragment_1 = comment();
		component(first_child(fragment_1), () => get(Pyramid_0), ($$anchor, Pyramid_0_1) => {
			bind_this(Pyramid_0_1($$anchor, {
				get data() {
					return data_0();
				},
				get form() {
					return $$props.form;
				},
				get params() {
					return $$props.page.params;
				},
				children: ($$anchor, $$slotProps) => {
					var fragment_2 = comment();
					component(first_child(fragment_2), () => get(Pyramid_1), ($$anchor, Pyramid_1_1) => {
						bind_this(Pyramid_1_1($$anchor, {
							get data() {
								return data_1();
							},
							get form() {
								return $$props.form;
							},
							get params() {
								return $$props.page.params;
							}
						}), ($$value) => components()[1] = $$value, () => {
							var _components;
							return (_components = components()) === null || _components === void 0 ? void 0 : _components[1];
						});
					});
					append($$anchor, fragment_2);
				},
				$$slots: { default: true }
			}), ($$value) => components()[0] = $$value, () => {
				var _components2;
				return (_components2 = components()) === null || _components2 === void 0 ? void 0 : _components2[0];
			});
		});
		append($$anchor, fragment_1);
	};
	var alternate = ($$anchor) => {
		const Pyramid_0 = user_derived(() => $$props.constructors[0]);
		var fragment_3 = comment();
		component(first_child(fragment_3), () => get(Pyramid_0), ($$anchor, Pyramid_0_2) => {
			bind_this(Pyramid_0_2($$anchor, {
				get data() {
					return data_0();
				},
				get form() {
					return $$props.form;
				},
				get params() {
					return $$props.page.params;
				}
			}), ($$value) => components()[0] = $$value, () => {
				var _components3;
				return (_components3 = components()) === null || _components3 === void 0 ? void 0 : _components3[0];
			});
		});
		append($$anchor, fragment_3);
	};
	if_block(node, ($$render) => {
		if ($$props.constructors[1]) $$render(consequent);
		else $$render(alternate, -1);
	});
	var node_4 = sibling(node, 2);
	var consequent_2 = ($$anchor) => {
		var div = root_4();
		var node_5 = child(div);
		var consequent_1 = ($$anchor) => {
			var text$1 = text();
			template_effect(() => set_text(text$1, get(title)));
			append($$anchor, text$1);
		};
		if_block(node_5, ($$render) => {
			if (get(navigated)) $$render(consequent_1);
		});
		reset(div);
		append($$anchor, div);
	};
	if_block(node_4, ($$render) => {
		if (get(mounted)) $$render(consequent_2);
	});
	append($$anchor, fragment);
	pop();
}
//#endregion
//#region .svelte-kit/generated/root.js
var root_default = asClassComponent(Root);
//#endregion
//#region .svelte-kit/generated/client-optimized/app.js
var nodes = [
	() => __vitePreload(() => import("../nodes/0.C89TZwy1.js"), __vite__mapDeps([0]), import.meta.url),
	() => __vitePreload(() => import("../nodes/1.Ds6x8VkR.js"), [], import.meta.url),
	() => __vitePreload(() => import("../nodes/2.CKd_iZrl.js"), __vite__mapDeps([1,2,3,4,5,6]), import.meta.url),
	() => __vitePreload(() => import("../nodes/3.CKkG8xPg.js"), [], import.meta.url),
	() => __vitePreload(() => import("../nodes/4.CTPToKVn.js"), [], import.meta.url),
	() => __vitePreload(() => import("../nodes/5.C4PjonG7.js"), [], import.meta.url),
	() => __vitePreload(() => import("../nodes/6.BRg7LjB2.js"), [], import.meta.url),
	() => __vitePreload(() => import("../nodes/7.CT20xKrI.js"), __vite__mapDeps([2]), import.meta.url),
	() => __vitePreload(() => import("../nodes/8.CgiMTvs8.js"), __vite__mapDeps([2,3]), import.meta.url),
	() => __vitePreload(() => import("../nodes/9.-YX1taIm.js"), __vite__mapDeps([4]), import.meta.url),
	() => __vitePreload(() => import("../nodes/10.CYAWtpxs.js"), __vite__mapDeps([1]), import.meta.url),
	() => __vitePreload(() => import("../nodes/11.p9qjQnHx.js"), [], import.meta.url),
	() => __vitePreload(() => import("../nodes/12.QFYe0w4D.js"), [], import.meta.url),
	() => __vitePreload(() => import("../nodes/13.CTidZx-m.js"), __vite__mapDeps([5]), import.meta.url),
	() => __vitePreload(() => import("../nodes/14.Cl4Evl4u.js"), [], import.meta.url)
];
var server_loads = [];
var dictionary = {
	"/": [2],
	"/tests/button_momentary": [4],
	"/tests/button_toggle": [5],
	"/tests/button": [3],
	"/tests/code_sidebar": [6],
	"/tests/faders_page": [8],
	"/tests/fader": [7],
	"/tests/log_viewer": [9],
	"/tests/markdown_sidebar": [10],
	"/tests/scope": [11],
	"/tests/sonogram": [12],
	"/tests/tabs": [13],
	"/tests/waveform": [14]
};
var hooks = {
	handleError: (({ error }) => {
		console.error(error);
	}),
	reroute: (() => {}),
	transport: {}
};
var decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
var encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));
var hash = false;
var decode = (type, value) => decoders[type](value);
//#endregion
export { decode, decoders, dictionary, encoders, hash, hooks, matchers, nodes, root_default as root, server_loads };
