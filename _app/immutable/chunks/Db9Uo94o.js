import { n as __exportAll } from "./CEul6glj.js";
import { t as _defineProperty } from "./C7Y5rWy5.js";
//#region ../node_modules/svelte/src/internal/shared/utils.js
var is_array = Array.isArray;
var index_of = Array.prototype.indexOf;
var includes = Array.prototype.includes;
var array_from = Array.from;
var define_property = Object.defineProperty;
var get_descriptor = Object.getOwnPropertyDescriptor;
var get_descriptors = Object.getOwnPropertyDescriptors;
var object_prototype = Object.prototype;
var array_prototype = Array.prototype;
var get_prototype_of = Object.getPrototypeOf;
var is_extensible = Object.isExtensible;
/**
* @param {any} thing
* @returns {thing is Function}
*/
function is_function(thing) {
	return typeof thing === "function";
}
var noop = () => {};
/** @param {Function} fn */
function run(fn) {
	return fn();
}
/** @param {Array<() => void>} arr */
function run_all(arr) {
	for (var i = 0; i < arr.length; i++) arr[i]();
}
/**
* TODO replace with Promise.withResolvers once supported widely enough
* @template [T=void]
*/
function deferred() {
	/** @type {(value: T) => void} */
	var resolve;
	/** @type {(reason: any) => void} */
	var reject;
	return {
		promise: new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		}),
		resolve,
		reject
	};
}
/**
* When encountering a situation like `let [a, b, c] = $derived(blah())`,
* we need to stash an intermediate value that `a`, `b`, and `c` derive
* from, in case it's an iterable
* @template T
* @param {ArrayLike<T> | Iterable<T>} value
* @param {number} [n]
* @returns {Array<T>}
*/
function to_array(value, n) {
	if (Array.isArray(value)) return value;
	if (n === void 0 || !(Symbol.iterator in value)) return Array.from(value);
	/** @type {T[]} */
	const array = [];
	for (const element of value) {
		array.push(element);
		if (array.length === n) break;
	}
	return array;
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/constants.js
var _globalThis$document;
/**
* An effect that does not destroy its child effects when it reruns.
* Runs as part of render effects, i.e. not eagerly as part of tree traversal or effect flushing.
*/
var MANAGED_EFFECT = 1 << 24;
var CLEAN = 1024;
var DIRTY = 2048;
var MAYBE_DIRTY = 4096;
var INERT = 8192;
var DESTROYED = 16384;
/** Set once a reaction has run for the first time */
var REACTION_RAN = 32768;
/** Effect is in the process of getting destroyed. Can be observed in child teardown functions */
var DESTROYING = 1 << 25;
/**
* 'Transparent' effects do not create a transition boundary.
* This is on a block effect 99% of the time but may also be on a branch effect if its parent block effect was pruned
*/
var EFFECT_TRANSPARENT = 65536;
var HEAD_EFFECT = 1 << 18;
var EFFECT_PRESERVED = 1 << 19;
var USER_EFFECT = 1 << 20;
var EFFECT_OFFSCREEN = 1 << 25;
/**
* Tells that we marked this derived and its reactions as visited during the "mark as (maybe) dirty"-phase.
* Will be lifted during execution of the derived and during checking its dirty state (both are necessary
* because a derived might be checked but not executed).
*/
var WAS_MARKED = 65536;
var REACTION_IS_UPDATING = 1 << 21;
var ASYNC = 1 << 22;
var ERROR_VALUE = 1 << 23;
var STATE_SYMBOL = Symbol("$state");
var LEGACY_PROPS = Symbol("legacy props");
var LOADING_ATTR_SYMBOL = Symbol("");
/** allow users to ignore aborted signal errors if `reason.name === 'StaleReactionError` */
var STALE_REACTION = new class StaleReactionError extends Error {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "StaleReactionError");
		_defineProperty(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
	}
}();
var IS_XHTML = !!((_globalThis$document = globalThis.document) === null || _globalThis$document === void 0 ? void 0 : _globalThis$document.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
//#endregion
//#region ../node_modules/svelte/src/internal/shared/errors.js
/**
* Cannot use `%name%(...)` unless the `experimental.async` compiler option is `true`
* @param {string} name
* @returns {never}
*/
function experimental_async_required(name) {
	throw new Error(`https://svelte.dev/e/experimental_async_required`);
}
/**
* `%name%(...)` can only be used during component initialisation
* @param {string} name
* @returns {never}
*/
function lifecycle_outside_component(name) {
	throw new Error(`https://svelte.dev/e/lifecycle_outside_component`);
}
/**
* Context was not set in a parent component
* @returns {never}
*/
function missing_context() {
	throw new Error(`https://svelte.dev/e/missing_context`);
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/errors.js
/**
* Cannot create a `$derived(...)` with an `await` expression outside of an effect tree
* @returns {never}
*/
function async_derived_orphan() {
	throw new Error(`https://svelte.dev/e/async_derived_orphan`);
}
/**
* Keyed each block has duplicate key `%value%` at indexes %a% and %b%
* @param {string} a
* @param {string} b
* @param {string | undefined | null} [value]
* @returns {never}
*/
function each_key_duplicate(a, b, value) {
	throw new Error(`https://svelte.dev/e/each_key_duplicate`);
}
/**
* `%rune%` cannot be used inside an effect cleanup function
* @param {string} rune
* @returns {never}
*/
function effect_in_teardown(rune) {
	throw new Error(`https://svelte.dev/e/effect_in_teardown`);
}
/**
* Effect cannot be created inside a `$derived` value that was not itself created inside an effect
* @returns {never}
*/
function effect_in_unowned_derived() {
	throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
}
/**
* `%rune%` can only be used inside an effect (e.g. during component initialisation)
* @param {string} rune
* @returns {never}
*/
function effect_orphan(rune) {
	throw new Error(`https://svelte.dev/e/effect_orphan`);
}
/**
* Maximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state
* @returns {never}
*/
function effect_update_depth_exceeded() {
	throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
}
/**
* Cannot commit a fork that was already discarded
* @returns {never}
*/
function fork_discarded() {
	throw new Error(`https://svelte.dev/e/fork_discarded`);
}
/**
* Cannot create a fork inside an effect or when state changes are pending
* @returns {never}
*/
function fork_timing() {
	throw new Error(`https://svelte.dev/e/fork_timing`);
}
/**
* `getAbortSignal()` can only be called inside an effect or derived
* @returns {never}
*/
function get_abort_signal_outside_reaction() {
	throw new Error(`https://svelte.dev/e/get_abort_signal_outside_reaction`);
}
/**
* Failed to hydrate the application
* @returns {never}
*/
function hydration_failed() {
	throw new Error(`https://svelte.dev/e/hydration_failed`);
}
/**
* `%name%(...)` cannot be used in runes mode
* @param {string} name
* @returns {never}
*/
function lifecycle_legacy_only(name) {
	throw new Error(`https://svelte.dev/e/lifecycle_legacy_only`);
}
/**
* Cannot do `bind:%key%={undefined}` when `%key%` has a fallback value
* @param {string} key
* @returns {never}
*/
function props_invalid_value(key) {
	throw new Error(`https://svelte.dev/e/props_invalid_value`);
}
/**
* `setContext` must be called when a component first initializes, not in a subsequent effect or after an `await` expression
* @returns {never}
*/
function set_context_after_init() {
	throw new Error(`https://svelte.dev/e/set_context_after_init`);
}
/**
* Property descriptors defined on `$state` objects must contain `value` and always be `enumerable`, `configurable` and `writable`.
* @returns {never}
*/
function state_descriptors_fixed() {
	throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
}
/**
* Cannot set prototype of `$state` object
* @returns {never}
*/
function state_prototype_fixed() {
	throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
}
/**
* Updating state inside `$derived(...)`, `$inspect(...)` or a template expression is forbidden. If the value should not be reactive, declare it without `$state`
* @returns {never}
*/
function state_unsafe_mutation() {
	throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
}
/**
* A `<svelte:boundary>` `reset` function cannot be called while an error is still being handled
* @returns {never}
*/
function svelte_boundary_reset_onerror() {
	throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
}
//#endregion
//#region ../node_modules/svelte/src/constants.js
var HYDRATION_ERROR = {};
var UNINITIALIZED = Symbol();
var NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
var NAMESPACE_SVG = "http://www.w3.org/2000/svg";
var NAMESPACE_MATHML = "http://www.w3.org/1998/Math/MathML";
/**
* Reading a derived belonging to a now-destroyed effect may result in stale values
*/
function derived_inert() {
	console.warn(`https://svelte.dev/e/derived_inert`);
}
/**
* Expected to find a hydratable with key `%key%` during hydration, but did not.
* @param {string} key
*/
function hydratable_missing_but_expected(key) {
	console.warn(`https://svelte.dev/e/hydratable_missing_but_expected`);
}
/**
* Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near %location%
* @param {string | undefined | null} [location]
*/
function hydration_mismatch(location) {
	console.warn(`https://svelte.dev/e/hydration_mismatch`);
}
/**
* The `value` property of a `<select multiple>` element should be an array, but it received a non-array value. The selection will be kept as is.
*/
function select_multiple_invalid_value() {
	console.warn(`https://svelte.dev/e/select_multiple_invalid_value`);
}
/**
* A `<svelte:boundary>` `reset` function only resets the boundary the first time it is called
*/
function svelte_boundary_reset_noop() {
	console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/hydration.js
/** @import { TemplateNode } from '#client' */
/**
* Use this variable to guard everything related to hydration code so it can be treeshaken out
* if the user doesn't use the `hydrate` method and these code paths are therefore not needed.
*/
var hydrating = false;
/** @param {boolean} value */
function set_hydrating(value) {
	hydrating = value;
}
/**
* The node that is currently being hydrated. This starts out as the first node inside the opening
* <!--[--> comment, and updates each time a component calls `$.child(...)` or `$.sibling(...)`.
* When entering a block (e.g. `{#if ...}`), `hydrate_node` is the block opening comment; by the
* time we leave the block it is the closing comment, which serves as the block's anchor.
* @type {TemplateNode}
*/
var hydrate_node;
/** @param {TemplateNode | null} node */
function set_hydrate_node(node) {
	if (node === null) {
		hydration_mismatch();
		throw HYDRATION_ERROR;
	}
	return hydrate_node = node;
}
function hydrate_next() {
	return set_hydrate_node(/* @__PURE__ */ get_next_sibling(hydrate_node));
}
/** @param {TemplateNode} node */
function reset(node) {
	if (!hydrating) return;
	if (/* @__PURE__ */ get_next_sibling(hydrate_node) !== null) {
		hydration_mismatch();
		throw HYDRATION_ERROR;
	}
	hydrate_node = node;
}
function next(count = 1) {
	if (hydrating) {
		var i = count;
		var node = hydrate_node;
		while (i--) node = /* @__PURE__ */ get_next_sibling(node);
		hydrate_node = node;
	}
}
/**
* Skips or removes (depending on {@link remove}) all nodes starting at `hydrate_node` up until the next hydration end comment
* @param {boolean} remove
*/
function skip_nodes(remove = true) {
	var depth = 0;
	var node = hydrate_node;
	while (true) {
		if (node.nodeType === 8) {
			var data = node.data;
			if (data === "]") {
				if (depth === 0) return node;
				depth -= 1;
			} else if (data === "[" || data === "[!" || data[0] === "[" && !isNaN(Number(data.slice(1)))) depth += 1;
		}
		var next = /* @__PURE__ */ get_next_sibling(node);
		if (remove) node.remove();
		node = next;
	}
}
/**
*
* @param {TemplateNode} node
*/
function read_hydration_instruction(node) {
	if (!node || node.nodeType !== 8) {
		hydration_mismatch();
		throw HYDRATION_ERROR;
	}
	return node.data;
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/reactivity/equality.js
/** @import { Equals } from '#client' */
/** @type {Equals} */
function equals(value) {
	return value === this.v;
}
/**
* @param {unknown} a
* @param {unknown} b
* @returns {boolean}
*/
function safe_not_equal(a, b) {
	return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
/** @type {Equals} */
function safe_equals(value) {
	return !safe_not_equal(value, this.v);
}
//#endregion
//#region ../node_modules/svelte/src/internal/flags/index.js
/** True if experimental.async=true */
var async_mode_flag = false;
/** True if we're not certain that we only have Svelte 5 code in the compilation */
var legacy_mode_flag = false;
function enable_legacy_mode_flag() {
	legacy_mode_flag = true;
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/context.js
/** @import { ComponentContext, DevStackEntry, Effect } from '#client' */
/** @type {ComponentContext | null} */
var component_context = null;
/** @param {ComponentContext | null} context */
function set_component_context(context) {
	component_context = context;
}
/**
* Returns a `[get, set]` pair of functions for working with context in a type-safe way.
*
* `get` will throw an error if no parent component called `set`.
*
* @template T
* @returns {[() => T, (context: T) => T]}
* @since 5.40.0
*/
function createContext() {
	const key = {};
	return [() => {
		if (!hasContext(key)) missing_context();
		return getContext(key);
	}, (context) => setContext(key, context)];
}
/**
* Retrieves the context that belongs to the closest parent component with the specified `key`.
* Must be called during component initialisation.
*
* [`createContext`](https://svelte.dev/docs/svelte/svelte#createContext) is a type-safe alternative.
*
* @template T
* @param {any} key
* @returns {T}
*/
function getContext(key) {
	return get_or_init_context_map("getContext").get(key);
}
/**
* Associates an arbitrary `context` object with the current component and the specified `key`
* and returns that object. The context is then available to children of the component
* (including slotted content) with `getContext`.
*
* Like lifecycle functions, this must be called during component initialisation.
*
* [`createContext`](https://svelte.dev/docs/svelte/svelte#createContext) is a type-safe alternative.
*
* @template T
* @param {any} key
* @param {T} context
* @returns {T}
*/
function setContext(key, context) {
	const context_map = get_or_init_context_map("setContext");
	if (async_mode_flag) {
		var flags = active_effect.f;
		if (!(!active_reaction && (flags & 32) !== 0 && !component_context.i)) set_context_after_init();
	}
	context_map.set(key, context);
	return context;
}
/**
* Checks whether a given `key` has been set in the context of a parent component.
* Must be called during component initialisation.
*
* @param {any} key
* @returns {boolean}
*/
function hasContext(key) {
	return get_or_init_context_map("hasContext").has(key);
}
/**
* Retrieves the whole context map that belongs to the closest parent component.
* Must be called during component initialisation. Useful, for example, if you
* programmatically create a component and want to pass the existing context to it.
*
* @template {Map<any, any>} [T=Map<any, any>]
* @returns {T}
*/
function getAllContexts() {
	return get_or_init_context_map("getAllContexts");
}
/**
* @param {Record<string, unknown>} props
* @param {any} runes
* @param {Function} [fn]
* @returns {void}
*/
function push(props, runes = false, fn) {
	component_context = {
		p: component_context,
		i: false,
		c: null,
		e: null,
		s: props,
		x: null,
		r: active_effect,
		l: legacy_mode_flag && !runes ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
/**
* @template {Record<string, any>} T
* @param {T} [component]
* @returns {T}
*/
function pop(component) {
	var context = component_context;
	var effects = context.e;
	if (effects !== null) {
		context.e = null;
		for (var fn of effects) create_user_effect(fn);
	}
	if (component !== void 0) context.x = component;
	context.i = true;
	component_context = context.p;
	return component !== null && component !== void 0 ? component : {};
}
/** @returns {boolean} */
function is_runes() {
	return !legacy_mode_flag || component_context !== null && component_context.l === null;
}
/**
* @param {string} name
* @returns {Map<unknown, unknown>}
*/
function get_or_init_context_map(name) {
	var _component_context, _component_context$c;
	if (component_context === null) lifecycle_outside_component(name);
	return (_component_context$c = (_component_context = component_context).c) !== null && _component_context$c !== void 0 ? _component_context$c : _component_context.c = new Map(get_parent_context(component_context) || void 0);
}
/**
* @param {ComponentContext} component_context
* @returns {Map<unknown, unknown> | null}
*/
function get_parent_context(component_context) {
	let parent = component_context.p;
	while (parent !== null) {
		const context_map = parent.c;
		if (context_map !== null) return context_map;
		parent = parent.p;
	}
	return null;
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/task.js
/** @type {Array<() => void>} */
var micro_tasks = [];
function run_micro_tasks() {
	var tasks = micro_tasks;
	micro_tasks = [];
	run_all(tasks);
}
/**
* @param {() => void} fn
*/
function queue_micro_task(fn) {
	if (micro_tasks.length === 0 && !is_flushing_sync) {
		var tasks = micro_tasks;
		queueMicrotask(() => {
			if (tasks === micro_tasks) run_micro_tasks();
		});
	}
	micro_tasks.push(fn);
}
/**
* Synchronously run any queued tasks.
*/
function flush_tasks() {
	while (micro_tasks.length > 0) run_micro_tasks();
}
/**
* @param {unknown} error
*/
function handle_error(error) {
	var effect = active_effect;
	if (effect === null) {
		/** @type {Derived} */ active_reaction.f |= ERROR_VALUE;
		return error;
	}
	if ((effect.f & 32768) === 0 && (effect.f & 4) === 0) throw error;
	invoke_error_boundary(error, effect);
}
/**
* @param {unknown} error
* @param {Effect | null} effect
*/
function invoke_error_boundary(error, effect) {
	while (effect !== null) {
		if ((effect.f & 128) !== 0) {
			if ((effect.f & 32768) === 0) throw error;
			try {
				/** @type {Boundary} */ effect.b.error(error);
				return;
			} catch (e) {
				error = e;
			}
		}
		effect = effect.parent;
	}
	throw error;
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/reactivity/status.js
/** @import { Derived, Signal } from '#client' */
var STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
/**
* @param {Signal} signal
* @param {number} status
*/
function set_signal_status(signal, status) {
	signal.f = signal.f & STATUS_MASK | status;
}
/**
* Set a derived's status to CLEAN or MAYBE_DIRTY based on its connection state.
* @param {Derived} derived
*/
function update_derived_status(derived) {
	if ((derived.f & 512) !== 0 || derived.deps === null) set_signal_status(derived, CLEAN);
	else set_signal_status(derived, MAYBE_DIRTY);
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/reactivity/utils.js
/** @import { Derived, Effect, Value } from '#client' */
/**
* @param {Value[] | null} deps
*/
function clear_marked(deps) {
	if (deps === null) return;
	for (const dep of deps) {
		if ((dep.f & 2) === 0 || (dep.f & 65536) === 0) continue;
		dep.f ^= WAS_MARKED;
		clear_marked(
			/** @type {Derived} */
			dep.deps
		);
	}
}
/**
* @param {Effect} effect
* @param {Set<Effect>} dirty_effects
* @param {Set<Effect>} maybe_dirty_effects
*/
function defer_effect(effect, dirty_effects, maybe_dirty_effects) {
	if ((effect.f & 2048) !== 0) dirty_effects.add(effect);
	else if ((effect.f & 4096) !== 0) maybe_dirty_effects.add(effect);
	clear_marked(effect.deps);
	set_signal_status(effect, CLEAN);
}
//#endregion
//#region ../node_modules/svelte/src/store/utils.js
/** @import { Readable } from './public' */
/**
* @template T
* @param {Readable<T> | null | undefined} store
* @param {(value: T) => void} run
* @param {(value: T) => void} [invalidate]
* @returns {() => void}
*/
function subscribe_to_store(store, run, invalidate) {
	if (store == null) {
		run(void 0);
		if (invalidate) invalidate(void 0);
		return noop;
	}
	const unsub = untrack(() => store.subscribe(run, invalidate));
	return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
//#endregion
//#region ../node_modules/svelte/src/store/shared/index.js
/** @import { Readable, StartStopNotifier, Subscriber, Unsubscriber, Updater, Writable } from '../public.js' */
/** @import { Stores, StoresValues, SubscribeInvalidateTuple } from '../private.js' */
/**
* @type {Array<SubscribeInvalidateTuple<any> | any>}
*/
var subscriber_queue = [];
/**
* Creates a `Readable` store that allows reading by subscription.
*
* @template T
* @param {T} [value] initial value
* @param {StartStopNotifier<T>} [start]
* @returns {Readable<T>}
*/
function readable(value, start) {
	return { subscribe: writable(value, start).subscribe };
}
/**
* Create a `Writable` store that allows both updating and reading by subscription.
*
* @template T
* @param {T} [value] initial value
* @param {StartStopNotifier<T>} [start]
* @returns {Writable<T>}
*/
function writable(value, start = noop) {
	/** @type {Unsubscriber | null} */
	let stop = null;
	/** @type {Set<SubscribeInvalidateTuple<T>>} */
	const subscribers = /* @__PURE__ */ new Set();
	/**
	* @param {T} new_value
	* @returns {void}
	*/
	function set(new_value) {
		if (safe_not_equal(value, new_value)) {
			value = new_value;
			if (stop) {
				const run_queue = !subscriber_queue.length;
				for (const subscriber of subscribers) {
					subscriber[1]();
					subscriber_queue.push(subscriber, value);
				}
				if (run_queue) {
					for (let i = 0; i < subscriber_queue.length; i += 2) subscriber_queue[i][0](subscriber_queue[i + 1]);
					subscriber_queue.length = 0;
				}
			}
		}
	}
	/**
	* @param {Updater<T>} fn
	* @returns {void}
	*/
	function update(fn) {
		set(fn(value));
	}
	/**
	* @param {Subscriber<T>} run
	* @param {() => void} [invalidate]
	* @returns {Unsubscriber}
	*/
	function subscribe(run, invalidate = noop) {
		/** @type {SubscribeInvalidateTuple<T>} */
		const subscriber = [run, invalidate];
		subscribers.add(subscriber);
		if (subscribers.size === 1) stop = start(set, update) || noop;
		run(value);
		return () => {
			subscribers.delete(subscriber);
			if (subscribers.size === 0 && stop) {
				stop();
				stop = null;
			}
		};
	}
	return {
		set,
		update,
		subscribe
	};
}
/**
* Derived value store by synchronizing one or more readable stores and
* applying an aggregation function over its input values.
*
* @template {Stores} S
* @template T
* @overload
* @param {S} stores
* @param {(values: StoresValues<S>, set: (value: T) => void, update: (fn: Updater<T>) => void) => Unsubscriber | void} fn
* @param {T} [initial_value]
* @returns {Readable<T>}
*/
/**
* Derived value store by synchronizing one or more readable stores and
* applying an aggregation function over its input values.
*
* @template {Stores} S
* @template T
* @overload
* @param {S} stores
* @param {(values: StoresValues<S>) => T} fn
* @param {T} [initial_value]
* @returns {Readable<T>}
*/
/**
* @template {Stores} S
* @template T
* @param {S} stores
* @param {Function} fn
* @param {T} [initial_value]
* @returns {Readable<T>}
*/
function derived$1(stores, fn, initial_value) {
	const single = !Array.isArray(stores);
	/** @type {Array<Readable<any>>} */
	const stores_array = single ? [stores] : stores;
	if (!stores_array.every(Boolean)) throw new Error("derived() expects stores as input, got a falsy value");
	const auto = fn.length < 2;
	return readable(initial_value, (set, update) => {
		let started = false;
		/** @type {T[]} */
		const values = [];
		let pending = 0;
		let cleanup = noop;
		const sync = () => {
			if (pending) return;
			cleanup();
			const result = fn(single ? values[0] : values, set, update);
			if (auto) set(result);
			else cleanup = typeof result === "function" ? result : noop;
		};
		const unsubscribers = stores_array.map((store, i) => subscribe_to_store(store, (value) => {
			values[i] = value;
			pending &= ~(1 << i);
			if (started) sync();
		}, () => {
			pending |= 1 << i;
		}));
		started = true;
		sync();
		return function stop() {
			run_all(unsubscribers);
			cleanup();
			started = false;
		};
	});
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/reactivity/store.js
/**
* We set this to `true` when updating a store so that we correctly
* schedule effects if the update takes place inside a `$:` effect
*/
var legacy_is_updating_store = false;
/**
* Whether or not the prop currently being read is a store binding, as in
* `<Child bind:x={$y} />`. If it is, we treat the prop as mutable even in
* runes mode, and skip `binding_property_non_reactive` validation
*/
var is_store_binding = false;
/**
* Returns a tuple that indicates whether `fn()` reads a prop that is a store binding.
* Used to prevent `binding_property_non_reactive` validation false positives and
* ensure that these props are treated as mutable even in runes mode
* @template T
* @param {() => T} fn
* @returns {[T, boolean]}
*/
function capture_store_binding(fn) {
	var previous_is_store_binding = is_store_binding;
	try {
		is_store_binding = false;
		return [fn(), is_store_binding];
	} finally {
		is_store_binding = previous_is_store_binding;
	}
}
//#endregion
//#region \0@oxc-project+runtime@0.124.0/helpers/checkPrivateRedeclaration.js
function _checkPrivateRedeclaration(e, t) {
	if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
//#endregion
//#region \0@oxc-project+runtime@0.124.0/helpers/classPrivateMethodInitSpec.js
function _classPrivateMethodInitSpec(e, a) {
	_checkPrivateRedeclaration(e, a), a.add(e);
}
//#endregion
//#region \0@oxc-project+runtime@0.124.0/helpers/classPrivateFieldInitSpec.js
function _classPrivateFieldInitSpec(e, t, a) {
	_checkPrivateRedeclaration(e, t), t.set(e, a);
}
//#endregion
//#region \0@oxc-project+runtime@0.124.0/helpers/assertClassBrand.js
function _assertClassBrand(e, t, n) {
	if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw new TypeError("Private element is not present on this object");
}
//#endregion
//#region \0@oxc-project+runtime@0.124.0/helpers/classPrivateFieldGet2.js
function _classPrivateFieldGet2(s, a) {
	return s.get(_assertClassBrand(s, a));
}
//#endregion
//#region \0@oxc-project+runtime@0.124.0/helpers/classPrivateFieldSet2.js
function _classPrivateFieldSet2(s, a, r) {
	return s.set(_assertClassBrand(s, a), r), r;
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/reactivity/batch.js
/** @import { Fork } from 'svelte' */
/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */
var _Batch;
/** @type {Set<Batch>} */
var batches = /* @__PURE__ */ new Set();
/** @type {Batch | null} */
var current_batch = null;
/**
* This is needed to avoid overwriting inputs
* @type {Batch | null}
*/
var previous_batch = null;
/**
* When time travelling (i.e. working in one batch, while other batches
* still have ongoing work), we ignore the real values of affected
* signals in favour of their values within the batch
* @type {Map<Value, any> | null}
*/
var batch_values = null;
/** @type {Effect | null} */
var last_scheduled_effect = null;
var is_flushing_sync = false;
var is_processing = false;
/**
* During traversal, this is an array. Newly created effects are (if not immediately
* executed) pushed to this array, rather than going through the scheduling
* rigamarole that would cause another turn of the flush loop.
* @type {Effect[] | null}
*/
var collected_effects = null;
/**
* An array of effects that are marked during traversal as a result of a `set`
* (not `internal_set`) call. These will be added to the next batch and
* trigger another `batch.process()`
* @type {Effect[] | null}
* @deprecated when we get rid of legacy mode and stores, we can get rid of this
*/
var legacy_updates = null;
var flush_count = 0;
var uid = 1;
var _commit_callbacks = /* @__PURE__ */ new WeakMap();
var _discard_callbacks = /* @__PURE__ */ new WeakMap();
var _fork_commit_callbacks = /* @__PURE__ */ new WeakMap();
var _pending = /* @__PURE__ */ new WeakMap();
var _blocking_pending = /* @__PURE__ */ new WeakMap();
var _deferred = /* @__PURE__ */ new WeakMap();
var _roots = /* @__PURE__ */ new WeakMap();
var _new_effects = /* @__PURE__ */ new WeakMap();
var _dirty_effects$1 = /* @__PURE__ */ new WeakMap();
var _maybe_dirty_effects$1 = /* @__PURE__ */ new WeakMap();
var _skipped_branches = /* @__PURE__ */ new WeakMap();
var _unskipped_branches = /* @__PURE__ */ new WeakMap();
var _decrement_queued = /* @__PURE__ */ new WeakMap();
var _blockers = /* @__PURE__ */ new WeakMap();
var _Batch_brand = /* @__PURE__ */ new WeakSet();
var Batch = class Batch {
	constructor() {
		_classPrivateMethodInitSpec(this, _Batch_brand);
		_defineProperty(this, "id", uid++);
		_defineProperty(
			this,
			/**
			* The current values of any signals that are updated in this batch.
			* Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
			* They keys of this map are identical to `this.#previous`
			* @type {Map<Value, [any, boolean]>}
			*/
			"current",
			/* @__PURE__ */ new Map()
		);
		_defineProperty(
			this,
			/**
			* The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
			* They keys of this map are identical to `this.#current`
			* @type {Map<Value, any>}
			*/
			"previous",
			/* @__PURE__ */ new Map()
		);
		_classPrivateFieldInitSpec(this, _commit_callbacks, /* @__PURE__ */ new Set());
		_classPrivateFieldInitSpec(this, _discard_callbacks, /* @__PURE__ */ new Set());
		_classPrivateFieldInitSpec(this, _fork_commit_callbacks, /* @__PURE__ */ new Set());
		_classPrivateFieldInitSpec(this, _pending, /* @__PURE__ */ new Map());
		_classPrivateFieldInitSpec(this, _blocking_pending, /* @__PURE__ */ new Map());
		_classPrivateFieldInitSpec(this, _deferred, null);
		_classPrivateFieldInitSpec(this, _roots, []);
		_classPrivateFieldInitSpec(this, _new_effects, []);
		_classPrivateFieldInitSpec(this, _dirty_effects$1, /* @__PURE__ */ new Set());
		_classPrivateFieldInitSpec(this, _maybe_dirty_effects$1, /* @__PURE__ */ new Set());
		_classPrivateFieldInitSpec(this, _skipped_branches, /* @__PURE__ */ new Map());
		_classPrivateFieldInitSpec(this, _unskipped_branches, /* @__PURE__ */ new Set());
		_defineProperty(this, "is_fork", false);
		_classPrivateFieldInitSpec(this, _decrement_queued, false);
		_classPrivateFieldInitSpec(this, _blockers, /* @__PURE__ */ new Set());
	}
	/**
	* Add an effect to the #skipped_branches map and reset its children
	* @param {Effect} effect
	*/
	skip_effect(effect) {
		if (!_classPrivateFieldGet2(_skipped_branches, this).has(effect)) _classPrivateFieldGet2(_skipped_branches, this).set(effect, {
			d: [],
			m: []
		});
		_classPrivateFieldGet2(_unskipped_branches, this).delete(effect);
	}
	/**
	* Remove an effect from the #skipped_branches map and reschedule
	* any tracked dirty/maybe_dirty child effects
	* @param {Effect} effect
	* @param {(e: Effect) => void} callback
	*/
	unskip_effect(effect, callback = (e) => this.schedule(e)) {
		var tracked = _classPrivateFieldGet2(_skipped_branches, this).get(effect);
		if (tracked) {
			_classPrivateFieldGet2(_skipped_branches, this).delete(effect);
			for (var e of tracked.d) {
				set_signal_status(e, DIRTY);
				callback(e);
			}
			for (e of tracked.m) {
				set_signal_status(e, MAYBE_DIRTY);
				callback(e);
			}
		}
		_classPrivateFieldGet2(_unskipped_branches, this).add(effect);
	}
	/**
	* Associate a change to a given source with the current
	* batch, noting its previous and current values
	* @param {Value} source
	* @param {any} value
	* @param {boolean} [is_derived]
	*/
	capture(source, value, is_derived = false) {
		if (source.v !== UNINITIALIZED && !this.previous.has(source)) this.previous.set(source, source.v);
		if ((source.f & 8388608) === 0) {
			this.current.set(source, [value, is_derived]);
			batch_values === null || batch_values === void 0 || batch_values.set(source, value);
		}
		if (!this.is_fork) source.v = value;
	}
	activate() {
		current_batch = this;
	}
	deactivate() {
		current_batch = null;
		batch_values = null;
	}
	flush() {
		try {
			is_processing = true;
			current_batch = this;
			_assertClassBrand(_Batch_brand, this, _process).call(this);
		} finally {
			flush_count = 0;
			last_scheduled_effect = null;
			collected_effects = null;
			legacy_updates = null;
			is_processing = false;
			current_batch = null;
			batch_values = null;
			old_values.clear();
		}
	}
	discard() {
		for (const fn of _classPrivateFieldGet2(_discard_callbacks, this)) fn(this);
		_classPrivateFieldGet2(_discard_callbacks, this).clear();
		_classPrivateFieldGet2(_fork_commit_callbacks, this).clear();
		batches.delete(this);
	}
	/**
	* @param {Effect} effect
	*/
	register_created_effect(effect) {
		_classPrivateFieldGet2(_new_effects, this).push(effect);
	}
	/**
	* @param {boolean} blocking
	* @param {Effect} effect
	*/
	increment(blocking, effect) {
		var _this$pending$get;
		let pending_count = (_this$pending$get = _classPrivateFieldGet2(_pending, this).get(effect)) !== null && _this$pending$get !== void 0 ? _this$pending$get : 0;
		_classPrivateFieldGet2(_pending, this).set(effect, pending_count + 1);
		if (blocking) {
			var _this$blocking_pendin;
			let blocking_pending_count = (_this$blocking_pendin = _classPrivateFieldGet2(_blocking_pending, this).get(effect)) !== null && _this$blocking_pendin !== void 0 ? _this$blocking_pendin : 0;
			_classPrivateFieldGet2(_blocking_pending, this).set(effect, blocking_pending_count + 1);
		}
	}
	/**
	* @param {boolean} blocking
	* @param {Effect} effect
	* @param {boolean} skip - whether to skip updates (because this is triggered by a stale reaction)
	*/
	decrement(blocking, effect, skip) {
		var _this$pending$get2;
		let pending_count = (_this$pending$get2 = _classPrivateFieldGet2(_pending, this).get(effect)) !== null && _this$pending$get2 !== void 0 ? _this$pending$get2 : 0;
		if (pending_count === 1) _classPrivateFieldGet2(_pending, this).delete(effect);
		else _classPrivateFieldGet2(_pending, this).set(effect, pending_count - 1);
		if (blocking) {
			var _this$blocking_pendin2;
			let blocking_pending_count = (_this$blocking_pendin2 = _classPrivateFieldGet2(_blocking_pending, this).get(effect)) !== null && _this$blocking_pendin2 !== void 0 ? _this$blocking_pendin2 : 0;
			if (blocking_pending_count === 1) _classPrivateFieldGet2(_blocking_pending, this).delete(effect);
			else _classPrivateFieldGet2(_blocking_pending, this).set(effect, blocking_pending_count - 1);
		}
		if (_classPrivateFieldGet2(_decrement_queued, this) || skip) return;
		_classPrivateFieldSet2(_decrement_queued, this, true);
		queue_micro_task(() => {
			_classPrivateFieldSet2(_decrement_queued, this, false);
			this.flush();
		});
	}
	/**
	* @param {Set<Effect>} dirty_effects
	* @param {Set<Effect>} maybe_dirty_effects
	*/
	transfer_effects(dirty_effects, maybe_dirty_effects) {
		for (const e of dirty_effects) _classPrivateFieldGet2(_dirty_effects$1, this).add(e);
		for (const e of maybe_dirty_effects) _classPrivateFieldGet2(_maybe_dirty_effects$1, this).add(e);
		dirty_effects.clear();
		maybe_dirty_effects.clear();
	}
	/** @param {(batch: Batch) => void} fn */
	oncommit(fn) {
		_classPrivateFieldGet2(_commit_callbacks, this).add(fn);
	}
	/** @param {(batch: Batch) => void} fn */
	ondiscard(fn) {
		_classPrivateFieldGet2(_discard_callbacks, this).add(fn);
	}
	/** @param {(batch: Batch) => void} fn */
	on_fork_commit(fn) {
		_classPrivateFieldGet2(_fork_commit_callbacks, this).add(fn);
	}
	run_fork_commit_callbacks() {
		for (const fn of _classPrivateFieldGet2(_fork_commit_callbacks, this)) fn(this);
		_classPrivateFieldGet2(_fork_commit_callbacks, this).clear();
	}
	settled() {
		var _classPrivateFieldGet3;
		return ((_classPrivateFieldGet3 = _classPrivateFieldGet2(_deferred, this)) !== null && _classPrivateFieldGet3 !== void 0 ? _classPrivateFieldGet3 : _classPrivateFieldSet2(_deferred, this, deferred())).promise;
	}
	static ensure() {
		if (current_batch === null) {
			const batch = current_batch = new Batch();
			if (!is_processing) {
				batches.add(current_batch);
				if (!is_flushing_sync) queue_micro_task(() => {
					if (current_batch !== batch) return;
					batch.flush();
				});
			}
		}
		return current_batch;
	}
	apply() {
		if (!async_mode_flag || !this.is_fork && batches.size === 1) {
			batch_values = null;
			return;
		}
		batch_values = /* @__PURE__ */ new Map();
		for (const [source, [value]] of this.current) batch_values.set(source, value);
		for (const batch of batches) {
			if (batch === this || batch.is_fork) continue;
			var intersects = false;
			var differs = false;
			if (batch.id < this.id) for (const [source, [, is_derived]] of batch.current) {
				if (is_derived) continue;
				intersects || (intersects = this.current.has(source));
				differs || (differs = !this.current.has(source));
			}
			if (intersects && differs) _classPrivateFieldGet2(_blockers, this).add(batch);
			else for (const [source, previous] of batch.previous) if (!batch_values.has(source)) batch_values.set(source, previous);
		}
	}
	/**
	*
	* @param {Effect} effect
	*/
	schedule(effect) {
		var _effect$b;
		last_scheduled_effect = effect;
		if (((_effect$b = effect.b) === null || _effect$b === void 0 ? void 0 : _effect$b.is_pending) && (effect.f & 16777228) !== 0 && (effect.f & 32768) === 0) {
			effect.b.defer_effect(effect);
			return;
		}
		var e = effect;
		while (e.parent !== null) {
			e = e.parent;
			var flags = e.f;
			if (collected_effects !== null && e === active_effect) {
				if (async_mode_flag) return;
				if ((active_reaction === null || (active_reaction.f & 2) === 0) && !legacy_is_updating_store) return;
			}
			if ((flags & 96) !== 0) {
				if ((flags & 1024) === 0) return;
				e.f ^= CLEAN;
			}
		}
		_classPrivateFieldGet2(_roots, this).push(e);
	}
};
_Batch = Batch;
function _is_deferred() {
	return this.is_fork || _classPrivateFieldGet2(_blocking_pending, this).size > 0;
}
function _is_blocked() {
	for (const batch of _classPrivateFieldGet2(_blockers, this)) for (const effect of _classPrivateFieldGet2(_blocking_pending, batch).keys()) {
		var skipped = false;
		var e = effect;
		while (e.parent !== null) {
			if (_classPrivateFieldGet2(_skipped_branches, this).has(e)) {
				skipped = true;
				break;
			}
			e = e.parent;
		}
		if (!skipped) return true;
	}
	return false;
}
function _process() {
	if (flush_count++ > 1e3) {
		batches.delete(this);
		infinite_loop_guard();
	}
	if (!_assertClassBrand(_Batch_brand, this, _is_deferred).call(this)) {
		for (const e of _classPrivateFieldGet2(_dirty_effects$1, this)) {
			_classPrivateFieldGet2(_maybe_dirty_effects$1, this).delete(e);
			set_signal_status(e, DIRTY);
			this.schedule(e);
		}
		for (const e of _classPrivateFieldGet2(_maybe_dirty_effects$1, this)) {
			set_signal_status(e, MAYBE_DIRTY);
			this.schedule(e);
		}
	}
	const roots = _classPrivateFieldGet2(_roots, this);
	_classPrivateFieldSet2(_roots, this, []);
	this.apply();
	/** @type {Effect[]} */
	var effects = collected_effects = [];
	/** @type {Effect[]} */
	var render_effects = [];
	/**
	* @type {Effect[]}
	* @deprecated when we get rid of legacy mode and stores, we can get rid of this
	*/
	var updates = legacy_updates = [];
	for (const root of roots) try {
		_assertClassBrand(_Batch_brand, this, _traverse).call(this, root, effects, render_effects);
	} catch (e) {
		reset_all(root);
		throw e;
	}
	current_batch = null;
	if (updates.length > 0) {
		var batch = _Batch.ensure();
		for (const e of updates) batch.schedule(e);
	}
	collected_effects = null;
	legacy_updates = null;
	if (_assertClassBrand(_Batch_brand, this, _is_deferred).call(this) || _assertClassBrand(_Batch_brand, this, _is_blocked).call(this)) {
		_assertClassBrand(_Batch_brand, this, _defer_effects).call(this, render_effects);
		_assertClassBrand(_Batch_brand, this, _defer_effects).call(this, effects);
		for (const [e, t] of _classPrivateFieldGet2(_skipped_branches, this)) reset_branch(e, t);
	} else {
		var _classPrivateFieldGet2$1;
		if (_classPrivateFieldGet2(_pending, this).size === 0) batches.delete(this);
		_classPrivateFieldGet2(_dirty_effects$1, this).clear();
		_classPrivateFieldGet2(_maybe_dirty_effects$1, this).clear();
		for (const fn of _classPrivateFieldGet2(_commit_callbacks, this)) fn(this);
		_classPrivateFieldGet2(_commit_callbacks, this).clear();
		previous_batch = this;
		flush_queued_effects(render_effects);
		flush_queued_effects(effects);
		previous_batch = null;
		(_classPrivateFieldGet2$1 = _classPrivateFieldGet2(_deferred, this)) === null || _classPrivateFieldGet2$1 === void 0 || _classPrivateFieldGet2$1.resolve();
	}
	var next_batch = current_batch;
	if (_classPrivateFieldGet2(_roots, this).length > 0) {
		var _next_batch;
		const batch = (_next_batch = next_batch) !== null && _next_batch !== void 0 ? _next_batch : next_batch = this;
		_classPrivateFieldGet2(_roots, batch).push(..._classPrivateFieldGet2(_roots, this).filter((r) => !_classPrivateFieldGet2(_roots, batch).includes(r)));
	}
	if (next_batch !== null) {
		batches.add(next_batch);
		_assertClassBrand(_Batch_brand, next_batch, _process).call(next_batch);
	}
	if (async_mode_flag && !batches.has(this)) _assertClassBrand(_Batch_brand, this, _commit$1).call(this);
}
/**
* Traverse the effect tree, executing effects or stashing
* them for later execution as appropriate
* @param {Effect} root
* @param {Effect[]} effects
* @param {Effect[]} render_effects
*/
function _traverse(root, effects, render_effects) {
	root.f ^= CLEAN;
	var effect = root.first;
	while (effect !== null) {
		var flags = effect.f;
		var is_branch = (flags & 96) !== 0;
		if (!(is_branch && (flags & 1024) !== 0 || (flags & 8192) !== 0 || _classPrivateFieldGet2(_skipped_branches, this).has(effect)) && effect.fn !== null) {
			if (is_branch) effect.f ^= CLEAN;
			else if ((flags & 4) !== 0) effects.push(effect);
			else if (async_mode_flag && (flags & 16777224) !== 0) render_effects.push(effect);
			else if (is_dirty(effect)) {
				if ((flags & 16) !== 0) _classPrivateFieldGet2(_maybe_dirty_effects$1, this).add(effect);
				update_effect(effect);
			}
			var child = effect.first;
			if (child !== null) {
				effect = child;
				continue;
			}
		}
		while (effect !== null) {
			var next = effect.next;
			if (next !== null) {
				effect = next;
				break;
			}
			effect = effect.parent;
		}
	}
}
/**
* @param {Effect[]} effects
*/
function _defer_effects(effects) {
	for (var i = 0; i < effects.length; i += 1) defer_effect(effects[i], _classPrivateFieldGet2(_dirty_effects$1, this), _classPrivateFieldGet2(_maybe_dirty_effects$1, this));
}
function _commit$1() {
	for (const batch of batches) {
		var is_earlier = batch.id < this.id;
		/** @type {Source[]} */
		var sources = [];
		for (const [source, [value, is_derived]] of this.current) {
			if (batch.current.has(source)) {
				var batch_value = batch.current.get(source)[0];
				if (is_earlier && value !== batch_value) batch.current.set(source, [value, is_derived]);
				else continue;
			}
			sources.push(source);
		}
		var others = [...batch.current.keys()].filter((s) => !this.current.has(s));
		if (others.length === 0) {
			if (is_earlier) batch.discard();
		} else if (sources.length > 0) {
			if (is_earlier) for (const unskipped of _classPrivateFieldGet2(_unskipped_branches, this)) batch.unskip_effect(unskipped, (e) => {
				if ((e.f & 4194320) !== 0) batch.schedule(e);
				else _assertClassBrand(_Batch_brand, batch, _defer_effects).call(batch, [e]);
			});
			batch.activate();
			/** @type {Set<Value>} */
			var marked = /* @__PURE__ */ new Set();
			/** @type {Map<Reaction, boolean>} */
			var checked = /* @__PURE__ */ new Map();
			for (var source of sources) mark_effects(source, others, marked, checked);
			checked = /* @__PURE__ */ new Map();
			var current_unequal = [...batch.current.keys()].filter((c) => this.current.has(c) ? this.current.get(c)[0] !== c : true);
			for (const effect of _classPrivateFieldGet2(_new_effects, this)) if ((effect.f & 155648) === 0 && depends_on(effect, current_unequal, checked)) if ((effect.f & 4194320) !== 0) {
				set_signal_status(effect, DIRTY);
				batch.schedule(effect);
			} else _classPrivateFieldGet2(_dirty_effects$1, batch).add(effect);
			if (_classPrivateFieldGet2(_roots, batch).length > 0) {
				batch.apply();
				for (var root of _classPrivateFieldGet2(_roots, batch)) _assertClassBrand(_Batch_brand, batch, _traverse).call(batch, root, [], []);
				_classPrivateFieldSet2(_roots, batch, []);
			}
			batch.deactivate();
		}
	}
	for (const batch of batches) if (_classPrivateFieldGet2(_blockers, batch).has(this)) {
		_classPrivateFieldGet2(_blockers, batch).delete(this);
		if (_classPrivateFieldGet2(_blockers, batch).size === 0 && !_assertClassBrand(_Batch_brand, batch, _is_deferred).call(batch)) {
			batch.activate();
			_assertClassBrand(_Batch_brand, batch, _process).call(batch);
		}
	}
}
/**
* Synchronously flush any pending updates.
* Returns void if no callback is provided, otherwise returns the result of calling the callback.
* @template [T=void]
* @param {(() => T) | undefined} [fn]
* @returns {T}
*/
function flushSync(fn) {
	var was_flushing_sync = is_flushing_sync;
	is_flushing_sync = true;
	try {
		var result;
		if (fn) {
			if (current_batch !== null && !current_batch.is_fork) current_batch.flush();
			result = fn();
		}
		while (true) {
			flush_tasks();
			if (current_batch === null) return result;
			current_batch.flush();
		}
	} finally {
		is_flushing_sync = was_flushing_sync;
	}
}
function infinite_loop_guard() {
	try {
		effect_update_depth_exceeded();
	} catch (error) {
		invoke_error_boundary(error, last_scheduled_effect);
	}
}
/** @type {Set<Effect> | null} */
var eager_block_effects = null;
/**
* @param {Array<Effect>} effects
* @returns {void}
*/
function flush_queued_effects(effects) {
	var length = effects.length;
	if (length === 0) return;
	var i = 0;
	while (i < length) {
		var effect = effects[i++];
		if ((effect.f & 24576) === 0 && is_dirty(effect)) {
			eager_block_effects = /* @__PURE__ */ new Set();
			update_effect(effect);
			if (effect.deps === null && effect.first === null && effect.nodes === null && effect.teardown === null && effect.ac === null) unlink_effect(effect);
			if ((eager_block_effects === null || eager_block_effects === void 0 ? void 0 : eager_block_effects.size) > 0) {
				old_values.clear();
				for (const e of eager_block_effects) {
					if ((e.f & 24576) !== 0) continue;
					/** @type {Effect[]} */
					const ordered_effects = [e];
					let ancestor = e.parent;
					while (ancestor !== null) {
						if (eager_block_effects.has(ancestor)) {
							eager_block_effects.delete(ancestor);
							ordered_effects.push(ancestor);
						}
						ancestor = ancestor.parent;
					}
					for (let j = ordered_effects.length - 1; j >= 0; j--) {
						const e = ordered_effects[j];
						if ((e.f & 24576) !== 0) continue;
						update_effect(e);
					}
				}
				eager_block_effects.clear();
			}
		}
	}
	eager_block_effects = null;
}
/**
* This is similar to `mark_reactions`, but it only marks async/block effects
* depending on `value` and at least one of the other `sources`, so that
* these effects can re-run after another batch has been committed
* @param {Value} value
* @param {Source[]} sources
* @param {Set<Value>} marked
* @param {Map<Reaction, boolean>} checked
*/
function mark_effects(value, sources, marked, checked) {
	if (marked.has(value)) return;
	marked.add(value);
	if (value.reactions !== null) for (const reaction of value.reactions) {
		const flags = reaction.f;
		if ((flags & 2) !== 0) mark_effects(reaction, sources, marked, checked);
		else if ((flags & 4194320) !== 0 && (flags & 2048) === 0 && depends_on(reaction, sources, checked)) {
			set_signal_status(reaction, DIRTY);
			schedule_effect(reaction);
		}
	}
}
/**
* When committing a fork, we need to trigger eager effects so that
* any `$state.eager(...)` expressions update immediately. This
* function allows us to discover them
* @param {Value} value
* @param {Set<Effect>} effects
*/
function mark_eager_effects(value, effects) {
	if (value.reactions === null) return;
	for (const reaction of value.reactions) {
		const flags = reaction.f;
		if ((flags & 2) !== 0) mark_eager_effects(reaction, effects);
		else if ((flags & 131072) !== 0) {
			set_signal_status(reaction, DIRTY);
			effects.add(reaction);
		}
	}
}
/**
* @param {Reaction} reaction
* @param {Source[]} sources
* @param {Map<Reaction, boolean>} checked
*/
function depends_on(reaction, sources, checked) {
	const depends = checked.get(reaction);
	if (depends !== void 0) return depends;
	if (reaction.deps !== null) for (const dep of reaction.deps) {
		if (includes.call(sources, dep)) return true;
		if ((dep.f & 2) !== 0 && depends_on(dep, sources, checked)) {
			checked.set(dep, true);
			return true;
		}
	}
	checked.set(reaction, false);
	return false;
}
/**
* @param {Effect} effect
* @returns {void}
*/
function schedule_effect(effect) {
	/** @type {Batch} */ current_batch.schedule(effect);
}
/**
* Mark all the effects inside a skipped branch CLEAN, so that
* they can be correctly rescheduled later. Tracks dirty and maybe_dirty
* effects so they can be rescheduled if the branch survives.
* @param {Effect} effect
* @param {{ d: Effect[], m: Effect[] }} tracked
*/
function reset_branch(effect, tracked) {
	if ((effect.f & 32) !== 0 && (effect.f & 1024) !== 0) return;
	if ((effect.f & 2048) !== 0) tracked.d.push(effect);
	else if ((effect.f & 4096) !== 0) tracked.m.push(effect);
	set_signal_status(effect, CLEAN);
	var e = effect.first;
	while (e !== null) {
		reset_branch(e, tracked);
		e = e.next;
	}
}
/**
* Mark an entire effect tree clean following an error
* @param {Effect} effect
*/
function reset_all(effect) {
	set_signal_status(effect, CLEAN);
	var e = effect.first;
	while (e !== null) {
		reset_all(e);
		e = e.next;
	}
}
/**
* Creates a 'fork', in which state changes are evaluated but not applied to the DOM.
* This is useful for speculatively loading data (for example) when you suspect that
* the user is about to take some action.
*
* Frameworks like SvelteKit can use this to preload data when the user touches or
* hovers over a link, making any subsequent navigation feel instantaneous.
*
* The `fn` parameter is a synchronous function that modifies some state. The
* state changes will be reverted after the fork is initialised, then reapplied
* if and when the fork is eventually committed.
*
* When it becomes clear that a fork will _not_ be committed (e.g. because the
* user navigated elsewhere), it must be discarded to avoid leaking memory.
*
* @param {() => void} fn
* @returns {Fork}
* @since 5.42
*/
function fork(fn) {
	if (!async_mode_flag) experimental_async_required("fork");
	if (current_batch !== null) fork_timing();
	var batch = Batch.ensure();
	batch.is_fork = true;
	batch_values = /* @__PURE__ */ new Map();
	var committed = false;
	var settled = batch.settled();
	flushSync(fn);
	return {
		commit: async () => {
			if (committed) {
				await settled;
				return;
			}
			if (!batches.has(batch)) fork_discarded();
			committed = true;
			batch.is_fork = false;
			for (var [source, [value]] of batch.current) {
				source.v = value;
				source.wv = increment_write_version();
			}
			batch.activate();
			batch.run_fork_commit_callbacks();
			batch.deactivate();
			flushSync(() => {
				/** @type {Set<Effect>} */
				var eager_effects = /* @__PURE__ */ new Set();
				for (var source of batch.current.keys()) mark_eager_effects(source, eager_effects);
				set_eager_effects(eager_effects);
				flush_eager_effects();
			});
			batch.flush();
			await settled;
		},
		discard: () => {
			for (var source of batch.current.keys()) source.wv = increment_write_version();
			if (!committed && batches.has(batch)) batch.discard();
		}
	};
}
//#endregion
//#region ../node_modules/svelte/src/reactivity/create-subscriber.js
/**
* Returns a `subscribe` function that integrates external event-based systems with Svelte's reactivity.
* It's particularly useful for integrating with web APIs like `MediaQuery`, `IntersectionObserver`, or `WebSocket`.
*
* If `subscribe` is called inside an effect (including indirectly, for example inside a getter),
* the `start` callback will be called with an `update` function. Whenever `update` is called, the effect re-runs.
*
* If `start` returns a cleanup function, it will be called when the effect is destroyed.
*
* If `subscribe` is called in multiple effects, `start` will only be called once as long as the effects
* are active, and the returned teardown function will only be called when all effects are destroyed.
*
* It's best understood with an example. Here's an implementation of [`MediaQuery`](https://svelte.dev/docs/svelte/svelte-reactivity#MediaQuery):
*
* ```js
* import { createSubscriber } from 'svelte/reactivity';
* import { on } from 'svelte/events';
*
* export class MediaQuery {
* 	#query;
* 	#subscribe;
*
* 	constructor(query) {
* 		this.#query = window.matchMedia(`(${query})`);
*
* 		this.#subscribe = createSubscriber((update) => {
* 			// when the `change` event occurs, re-run any effects that read `this.current`
* 			const off = on(this.#query, 'change', update);
*
* 			// stop listening when all the effects are destroyed
* 			return () => off();
* 		});
* 	}
*
* 	get current() {
* 		// This makes the getter reactive, if read in an effect
* 		this.#subscribe();
*
* 		// Return the current state of the query, whether or not we're in an effect
* 		return this.#query.matches;
* 	}
* }
* ```
* @param {(update: () => void) => (() => void) | void} start
* @since 5.7.0
*/
function createSubscriber(start) {
	let subscribers = 0;
	let version = source(0);
	/** @type {(() => void) | void} */
	let stop;
	return () => {
		if (effect_tracking()) {
			get(version);
			render_effect(() => {
				if (subscribers === 0) stop = untrack(() => start(() => increment(version)));
				subscribers += 1;
				return () => {
					queue_micro_task(() => {
						subscribers -= 1;
						if (subscribers === 0) {
							stop === null || stop === void 0 || stop();
							stop = void 0;
							increment(version);
						}
					});
				};
			});
		}
	};
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/blocks/boundary.js
/** @import { Effect, Source, TemplateNode, } from '#client' */
/**
* @typedef {{
* 	 onerror?: (error: unknown, reset: () => void) => void;
*   failed?: (anchor: Node, error: () => unknown, reset: () => () => void) => void;
*   pending?: (anchor: Node) => void;
* }} BoundaryProps
*/
var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED;
/**
* @param {TemplateNode} node
* @param {BoundaryProps} props
* @param {((anchor: Node) => void)} children
* @param {((error: unknown) => unknown) | undefined} [transform_error]
* @returns {void}
*/
function boundary(node, props, children, transform_error) {
	new Boundary(node, props, children, transform_error);
}
var _anchor = /* @__PURE__ */ new WeakMap();
var _hydrate_open = /* @__PURE__ */ new WeakMap();
var _props = /* @__PURE__ */ new WeakMap();
var _children = /* @__PURE__ */ new WeakMap();
var _effect = /* @__PURE__ */ new WeakMap();
var _main_effect = /* @__PURE__ */ new WeakMap();
var _pending_effect = /* @__PURE__ */ new WeakMap();
var _failed_effect = /* @__PURE__ */ new WeakMap();
var _offscreen_fragment = /* @__PURE__ */ new WeakMap();
var _local_pending_count = /* @__PURE__ */ new WeakMap();
var _pending_count = /* @__PURE__ */ new WeakMap();
var _pending_count_update_queued = /* @__PURE__ */ new WeakMap();
var _dirty_effects = /* @__PURE__ */ new WeakMap();
var _maybe_dirty_effects = /* @__PURE__ */ new WeakMap();
var _effect_pending = /* @__PURE__ */ new WeakMap();
var _effect_pending_subscriber = /* @__PURE__ */ new WeakMap();
var _Boundary_brand = /* @__PURE__ */ new WeakSet();
var Boundary = class {
	/**
	* @param {TemplateNode} node
	* @param {BoundaryProps} props
	* @param {((anchor: Node) => void)} children
	* @param {((error: unknown) => unknown) | undefined} [transform_error]
	*/
	constructor(node, props, children, transform_error) {
		var _ref, _this$parent;
		_classPrivateMethodInitSpec(this, _Boundary_brand);
		_defineProperty(
			this,
			/** @type {Boundary | null} */
			"parent",
			void 0
		);
		_defineProperty(this, "is_pending", false);
		_defineProperty(
			this,
			/**
			* API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
			* Inherited from parent boundary, or defaults to identity.
			* @type {(error: unknown) => unknown}
			*/
			"transform_error",
			void 0
		);
		_classPrivateFieldInitSpec(this, _anchor, void 0);
		_classPrivateFieldInitSpec(this, _hydrate_open, hydrating ? hydrate_node : null);
		_classPrivateFieldInitSpec(this, _props, void 0);
		_classPrivateFieldInitSpec(this, _children, void 0);
		_classPrivateFieldInitSpec(this, _effect, void 0);
		_classPrivateFieldInitSpec(this, _main_effect, null);
		_classPrivateFieldInitSpec(this, _pending_effect, null);
		_classPrivateFieldInitSpec(this, _failed_effect, null);
		_classPrivateFieldInitSpec(this, _offscreen_fragment, null);
		_classPrivateFieldInitSpec(this, _local_pending_count, 0);
		_classPrivateFieldInitSpec(this, _pending_count, 0);
		_classPrivateFieldInitSpec(this, _pending_count_update_queued, false);
		_classPrivateFieldInitSpec(this, _dirty_effects, /* @__PURE__ */ new Set());
		_classPrivateFieldInitSpec(this, _maybe_dirty_effects, /* @__PURE__ */ new Set());
		_classPrivateFieldInitSpec(this, _effect_pending, null);
		_classPrivateFieldInitSpec(this, _effect_pending_subscriber, createSubscriber(() => {
			_classPrivateFieldSet2(_effect_pending, this, source(_classPrivateFieldGet2(_local_pending_count, this)));
			return () => {
				_classPrivateFieldSet2(_effect_pending, this, null);
			};
		}));
		_classPrivateFieldSet2(_anchor, this, node);
		_classPrivateFieldSet2(_props, this, props);
		_classPrivateFieldSet2(_children, this, (anchor) => {
			var effect = active_effect;
			effect.b = this;
			effect.f |= 128;
			children(anchor);
		});
		this.parent = active_effect.b;
		this.transform_error = (_ref = transform_error !== null && transform_error !== void 0 ? transform_error : (_this$parent = this.parent) === null || _this$parent === void 0 ? void 0 : _this$parent.transform_error) !== null && _ref !== void 0 ? _ref : ((e) => e);
		_classPrivateFieldSet2(_effect, this, block(() => {
			if (hydrating) {
				const comment = _classPrivateFieldGet2(_hydrate_open, this);
				hydrate_next();
				const server_rendered_pending = comment.data === "[!";
				if (comment.data.startsWith("[?")) {
					const serialized_error = JSON.parse(comment.data.slice(2));
					_assertClassBrand(_Boundary_brand, this, _hydrate_failed_content).call(this, serialized_error);
				} else if (server_rendered_pending) _assertClassBrand(_Boundary_brand, this, _hydrate_pending_content).call(this);
				else _assertClassBrand(_Boundary_brand, this, _hydrate_resolved_content).call(this);
			} else _assertClassBrand(_Boundary_brand, this, _render).call(this);
		}, flags));
		if (hydrating) _classPrivateFieldSet2(_anchor, this, hydrate_node);
	}
	/**
	* Defer an effect inside a pending boundary until the boundary resolves
	* @param {Effect} effect
	*/
	defer_effect(effect) {
		defer_effect(effect, _classPrivateFieldGet2(_dirty_effects, this), _classPrivateFieldGet2(_maybe_dirty_effects, this));
	}
	/**
	* Returns `false` if the effect exists inside a boundary whose pending snippet is shown
	* @returns {boolean}
	*/
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!_classPrivateFieldGet2(_props, this).pending;
	}
	/**
	* Update the source that powers `$effect.pending()` inside this boundary,
	* and controls when the current `pending` snippet (if any) is removed.
	* Do not call from inside the class
	* @param {1 | -1} d
	* @param {Batch} batch
	*/
	update_pending_count(d, batch) {
		_assertClassBrand(_Boundary_brand, this, _update_pending_count).call(this, d, batch);
		_classPrivateFieldSet2(_local_pending_count, this, _classPrivateFieldGet2(_local_pending_count, this) + d);
		if (!_classPrivateFieldGet2(_effect_pending, this) || _classPrivateFieldGet2(_pending_count_update_queued, this)) return;
		_classPrivateFieldSet2(_pending_count_update_queued, this, true);
		queue_micro_task(() => {
			_classPrivateFieldSet2(_pending_count_update_queued, this, false);
			if (_classPrivateFieldGet2(_effect_pending, this)) internal_set(_classPrivateFieldGet2(_effect_pending, this), _classPrivateFieldGet2(_local_pending_count, this));
		});
	}
	get_effect_pending() {
		_classPrivateFieldGet2(_effect_pending_subscriber, this).call(this);
		return get(_classPrivateFieldGet2(_effect_pending, this));
	}
	/** @param {unknown} error */
	error(error) {
		if (!_classPrivateFieldGet2(_props, this).onerror && !_classPrivateFieldGet2(_props, this).failed) throw error;
		if (current_batch === null || current_batch === void 0 ? void 0 : current_batch.is_fork) {
			if (_classPrivateFieldGet2(_main_effect, this)) current_batch.skip_effect(_classPrivateFieldGet2(_main_effect, this));
			if (_classPrivateFieldGet2(_pending_effect, this)) current_batch.skip_effect(_classPrivateFieldGet2(_pending_effect, this));
			if (_classPrivateFieldGet2(_failed_effect, this)) current_batch.skip_effect(_classPrivateFieldGet2(_failed_effect, this));
			current_batch.on_fork_commit(() => {
				_assertClassBrand(_Boundary_brand, this, _handle_error).call(this, error);
			});
		} else _assertClassBrand(_Boundary_brand, this, _handle_error).call(this, error);
	}
};
function _hydrate_resolved_content() {
	try {
		_classPrivateFieldSet2(_main_effect, this, branch(() => _classPrivateFieldGet2(_children, this).call(this, _classPrivateFieldGet2(_anchor, this))));
	} catch (error) {
		this.error(error);
	}
}
/**
* @param {unknown} error The deserialized error from the server's hydration comment
*/
function _hydrate_failed_content(error) {
	const failed = _classPrivateFieldGet2(_props, this).failed;
	if (!failed) return;
	_classPrivateFieldSet2(_failed_effect, this, branch(() => {
		failed(_classPrivateFieldGet2(_anchor, this), () => error, () => () => {});
	}));
}
function _hydrate_pending_content() {
	const pending = _classPrivateFieldGet2(_props, this).pending;
	if (!pending) return;
	this.is_pending = true;
	_classPrivateFieldSet2(_pending_effect, this, branch(() => pending(_classPrivateFieldGet2(_anchor, this))));
	queue_micro_task(() => {
		var fragment = _classPrivateFieldSet2(_offscreen_fragment, this, document.createDocumentFragment());
		var anchor = create_text();
		fragment.append(anchor);
		_classPrivateFieldSet2(_main_effect, this, _assertClassBrand(_Boundary_brand, this, _run).call(this, () => {
			return branch(() => _classPrivateFieldGet2(_children, this).call(this, anchor));
		}));
		if (_classPrivateFieldGet2(_pending_count, this) === 0) {
			_classPrivateFieldGet2(_anchor, this).before(fragment);
			_classPrivateFieldSet2(_offscreen_fragment, this, null);
			pause_effect(_classPrivateFieldGet2(_pending_effect, this), () => {
				_classPrivateFieldSet2(_pending_effect, this, null);
			});
			_assertClassBrand(_Boundary_brand, this, _resolve).call(this, current_batch);
		}
	});
}
function _render() {
	try {
		this.is_pending = this.has_pending_snippet();
		_classPrivateFieldSet2(_pending_count, this, 0);
		_classPrivateFieldSet2(_local_pending_count, this, 0);
		_classPrivateFieldSet2(_main_effect, this, branch(() => {
			_classPrivateFieldGet2(_children, this).call(this, _classPrivateFieldGet2(_anchor, this));
		}));
		if (_classPrivateFieldGet2(_pending_count, this) > 0) {
			var fragment = _classPrivateFieldSet2(_offscreen_fragment, this, document.createDocumentFragment());
			move_effect(_classPrivateFieldGet2(_main_effect, this), fragment);
			const pending = _classPrivateFieldGet2(_props, this).pending;
			_classPrivateFieldSet2(_pending_effect, this, branch(() => pending(_classPrivateFieldGet2(_anchor, this))));
		} else _assertClassBrand(_Boundary_brand, this, _resolve).call(this, current_batch);
	} catch (error) {
		this.error(error);
	}
}
/**
* @param {Batch} batch
*/
function _resolve(batch) {
	this.is_pending = false;
	batch.transfer_effects(_classPrivateFieldGet2(_dirty_effects, this), _classPrivateFieldGet2(_maybe_dirty_effects, this));
}
/**
* @template T
* @param {() => T} fn
*/
function _run(fn) {
	var previous_effect = active_effect;
	var previous_reaction = active_reaction;
	var previous_ctx = component_context;
	set_active_effect(_classPrivateFieldGet2(_effect, this));
	set_active_reaction(_classPrivateFieldGet2(_effect, this));
	set_component_context(_classPrivateFieldGet2(_effect, this).ctx);
	try {
		Batch.ensure();
		return fn();
	} catch (e) {
		handle_error(e);
		return null;
	} finally {
		set_active_effect(previous_effect);
		set_active_reaction(previous_reaction);
		set_component_context(previous_ctx);
	}
}
/**
* Updates the pending count associated with the currently visible pending snippet,
* if any, such that we can replace the snippet with content once work is done
* @param {1 | -1} d
* @param {Batch} batch
*/
function _update_pending_count(d, batch) {
	if (!this.has_pending_snippet()) {
		if (this.parent) {
			var _this$parent2;
			_assertClassBrand(_Boundary_brand, _this$parent2 = this.parent, _update_pending_count).call(_this$parent2, d, batch);
		}
		return;
	}
	_classPrivateFieldSet2(_pending_count, this, _classPrivateFieldGet2(_pending_count, this) + d);
	if (_classPrivateFieldGet2(_pending_count, this) === 0) {
		_assertClassBrand(_Boundary_brand, this, _resolve).call(this, batch);
		if (_classPrivateFieldGet2(_pending_effect, this)) pause_effect(_classPrivateFieldGet2(_pending_effect, this), () => {
			_classPrivateFieldSet2(_pending_effect, this, null);
		});
		if (_classPrivateFieldGet2(_offscreen_fragment, this)) {
			_classPrivateFieldGet2(_anchor, this).before(_classPrivateFieldGet2(_offscreen_fragment, this));
			_classPrivateFieldSet2(_offscreen_fragment, this, null);
		}
	}
}
/**
* @param {unknown} error
*/
function _handle_error(error) {
	if (_classPrivateFieldGet2(_main_effect, this)) {
		destroy_effect(_classPrivateFieldGet2(_main_effect, this));
		_classPrivateFieldSet2(_main_effect, this, null);
	}
	if (_classPrivateFieldGet2(_pending_effect, this)) {
		destroy_effect(_classPrivateFieldGet2(_pending_effect, this));
		_classPrivateFieldSet2(_pending_effect, this, null);
	}
	if (_classPrivateFieldGet2(_failed_effect, this)) {
		destroy_effect(_classPrivateFieldGet2(_failed_effect, this));
		_classPrivateFieldSet2(_failed_effect, this, null);
	}
	if (hydrating) {
		set_hydrate_node(_classPrivateFieldGet2(_hydrate_open, this));
		next();
		set_hydrate_node(skip_nodes());
	}
	var onerror = _classPrivateFieldGet2(_props, this).onerror;
	let failed = _classPrivateFieldGet2(_props, this).failed;
	var did_reset = false;
	var calling_on_error = false;
	const reset = () => {
		if (did_reset) {
			svelte_boundary_reset_noop();
			return;
		}
		did_reset = true;
		if (calling_on_error) svelte_boundary_reset_onerror();
		if (_classPrivateFieldGet2(_failed_effect, this) !== null) pause_effect(_classPrivateFieldGet2(_failed_effect, this), () => {
			_classPrivateFieldSet2(_failed_effect, this, null);
		});
		_assertClassBrand(_Boundary_brand, this, _run).call(this, () => {
			_assertClassBrand(_Boundary_brand, this, _render).call(this);
		});
	};
	/** @param {unknown} transformed_error */
	const handle_error_result = (transformed_error) => {
		try {
			calling_on_error = true;
			onerror === null || onerror === void 0 || onerror(transformed_error, reset);
			calling_on_error = false;
		} catch (error) {
			invoke_error_boundary(error, _classPrivateFieldGet2(_effect, this) && _classPrivateFieldGet2(_effect, this).parent);
		}
		if (failed) _classPrivateFieldSet2(_failed_effect, this, _assertClassBrand(_Boundary_brand, this, _run).call(this, () => {
			try {
				return branch(() => {
					var effect = active_effect;
					effect.b = this;
					effect.f |= 128;
					failed(_classPrivateFieldGet2(_anchor, this), () => transformed_error, () => reset);
				});
			} catch (error) {
				invoke_error_boundary(error, _classPrivateFieldGet2(_effect, this).parent);
				return null;
			}
		}));
	};
	queue_micro_task(() => {
		/** @type {unknown} */
		var result;
		try {
			result = this.transform_error(error);
		} catch (e) {
			invoke_error_boundary(e, _classPrivateFieldGet2(_effect, this) && _classPrivateFieldGet2(_effect, this).parent);
			return;
		}
		if (result !== null && typeof result === "object" && typeof result.then === "function")
 /** @type {any} */ result.then(
			handle_error_result,
			/** @param {unknown} e */
			(e) => invoke_error_boundary(e, _classPrivateFieldGet2(_effect, this) && _classPrivateFieldGet2(_effect, this).parent)
		);
		else handle_error_result(result);
	});
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/reactivity/async.js
/** @import { Blocker, Effect, Value } from '#client' */
/**
* @param {Blocker[]} blockers
* @param {Array<() => any>} sync
* @param {Array<() => Promise<any>>} async
* @param {(values: Value[]) => any} fn
*/
function flatten(blockers, sync, async, fn) {
	const d = is_runes() ? derived : derived_safe_equal;
	var pending = blockers.filter((b) => !b.settled);
	if (async.length === 0 && pending.length === 0) {
		fn(sync.map(d));
		return;
	}
	var parent = active_effect;
	var restore = capture();
	var blocker_promise = pending.length === 1 ? pending[0].promise : pending.length > 1 ? Promise.all(pending.map((b) => b.promise)) : null;
	/** @param {Value[]} values */
	function finish(values) {
		restore();
		try {
			fn(values);
		} catch (error) {
			if ((parent.f & 16384) === 0) invoke_error_boundary(error, parent);
		}
		unset_context();
	}
	if (async.length === 0) {
		/** @type {Promise<any>} */ blocker_promise.then(() => finish(sync.map(d)));
		return;
	}
	var decrement_pending = increment_pending();
	function run() {
		Promise.all(async.map((expression) => /* @__PURE__ */ async_derived(expression))).then((result) => finish([...sync.map(d), ...result])).catch((error) => invoke_error_boundary(error, parent)).finally(() => decrement_pending());
	}
	if (blocker_promise) blocker_promise.then(() => {
		restore();
		run();
		unset_context();
	});
	else run();
}
/**
* Captures the current effect context so that we can restore it after
* some asynchronous work has happened (so that e.g. `await a + b`
* causes `b` to be registered as a dependency).
*/
function capture() {
	var previous_effect = active_effect;
	var previous_reaction = active_reaction;
	var previous_component_context = component_context;
	var previous_batch = current_batch;
	return function restore(activate_batch = true) {
		set_active_effect(previous_effect);
		set_active_reaction(previous_reaction);
		set_component_context(previous_component_context);
		if (activate_batch && (previous_effect.f & 16384) === 0) {
			previous_batch === null || previous_batch === void 0 || previous_batch.activate();
			previous_batch === null || previous_batch === void 0 || previous_batch.apply();
		}
	};
}
function unset_context(deactivate_batch = true) {
	set_active_effect(null);
	set_active_reaction(null);
	set_component_context(null);
	if (deactivate_batch) current_batch === null || current_batch === void 0 || current_batch.deactivate();
}
/**
* @returns {(skip?: boolean) => void}
*/
function increment_pending() {
	var effect = active_effect;
	var boundary = effect.b;
	var batch = current_batch;
	var blocking = boundary.is_rendered();
	boundary.update_pending_count(1, batch);
	batch.increment(blocking, effect);
	return (skip = false) => {
		boundary.update_pending_count(-1, batch);
		batch.decrement(blocking, effect, skip);
	};
}
/**
* @template V
* @param {() => V} fn
* @returns {Derived<V>}
*/
/* @__NO_SIDE_EFFECTS__ */
function derived(fn) {
	var flags = 2 | DIRTY;
	if (active_effect !== null) active_effect.f |= EFFECT_PRESERVED;
	return {
		ctx: component_context,
		deps: null,
		effects: null,
		equals,
		f: flags,
		fn,
		reactions: null,
		rv: 0,
		v: UNINITIALIZED,
		wv: 0,
		parent: active_effect,
		ac: null
	};
}
/**
* @template V
* @param {() => V | Promise<V>} fn
* @param {string} [label]
* @param {string} [location] If provided, print a warning if the value is not read immediately after update
* @returns {Promise<Source<V>>}
*/
/* @__NO_SIDE_EFFECTS__ */
function async_derived(fn, label, location) {
	let parent = active_effect;
	if (parent === null) async_derived_orphan();
	var promise = void 0;
	var signal = source(UNINITIALIZED);
	var should_suspend = !active_reaction;
	/** @type {Map<Batch, ReturnType<typeof deferred<V>>>} */
	var deferreds = /* @__PURE__ */ new Map();
	async_effect(() => {
		var effect = active_effect;
		/** @type {ReturnType<typeof deferred<V>>} */
		var d = deferred();
		promise = d.promise;
		try {
			Promise.resolve(fn()).then(d.resolve, d.reject).finally(unset_context);
		} catch (error) {
			d.reject(error);
			unset_context();
		}
		var batch = current_batch;
		if (should_suspend) {
			if ((effect.f & 32768) !== 0) var decrement_pending = increment_pending();
			if (parent.b.is_rendered()) {
				var _deferreds$get;
				(_deferreds$get = deferreds.get(batch)) === null || _deferreds$get === void 0 || _deferreds$get.reject(STALE_REACTION);
				deferreds.delete(batch);
			} else {
				for (const d of deferreds.values()) d.reject(STALE_REACTION);
				deferreds.clear();
			}
			deferreds.set(batch, d);
		}
		/**
		* @param {any} value
		* @param {unknown} error
		*/
		const handler = (value, error = void 0) => {
			if (decrement_pending) decrement_pending(error === STALE_REACTION);
			if (error === STALE_REACTION || (effect.f & 16384) !== 0) return;
			batch.activate();
			if (error) {
				signal.f |= ERROR_VALUE;
				internal_set(signal, error);
			} else {
				if ((signal.f & 8388608) !== 0) signal.f ^= ERROR_VALUE;
				internal_set(signal, value);
				for (const [b, d] of deferreds) {
					deferreds.delete(b);
					if (b === batch) break;
					d.reject(STALE_REACTION);
				}
			}
			batch.deactivate();
		};
		d.promise.then(handler, (e) => handler(null, e || "unknown"));
	});
	teardown(() => {
		for (const d of deferreds.values()) d.reject(STALE_REACTION);
	});
	return new Promise((fulfil) => {
		/** @param {Promise<V>} p */
		function next(p) {
			function go() {
				if (p === promise) fulfil(signal);
				else next(promise);
			}
			p.then(go, go);
		}
		next(promise);
	});
}
/**
* @template V
* @param {() => V} fn
* @returns {Derived<V>}
*/
/* @__NO_SIDE_EFFECTS__ */
function user_derived(fn) {
	const d = /* @__PURE__ */ derived(fn);
	if (!async_mode_flag) push_reaction_value(d);
	return d;
}
/**
* @template V
* @param {() => V} fn
* @returns {Derived<V>}
*/
/* @__NO_SIDE_EFFECTS__ */
function derived_safe_equal(fn) {
	const signal = /* @__PURE__ */ derived(fn);
	signal.equals = safe_equals;
	return signal;
}
/**
* @param {Derived} derived
* @returns {void}
*/
function destroy_derived_effects(derived) {
	var effects = derived.effects;
	if (effects !== null) {
		derived.effects = null;
		for (var i = 0; i < effects.length; i += 1) destroy_effect(effects[i]);
	}
}
/**
* @template T
* @param {Derived} derived
* @returns {T}
*/
function execute_derived(derived) {
	var value;
	var prev_active_effect = active_effect;
	var parent = derived.parent;
	if (!is_destroying_effect && parent !== null && (parent.f & 24576) !== 0) {
		derived_inert();
		return derived.v;
	}
	set_active_effect(parent);
	try {
		derived.f &= ~WAS_MARKED;
		destroy_derived_effects(derived);
		value = update_reaction(derived);
	} finally {
		set_active_effect(prev_active_effect);
	}
	return value;
}
/**
* @param {Derived} derived
* @returns {void}
*/
function update_derived(derived) {
	var value = execute_derived(derived);
	if (!derived.equals(value)) {
		derived.wv = increment_write_version();
		if (!(current_batch === null || current_batch === void 0 ? void 0 : current_batch.is_fork) || derived.deps === null) {
			if (current_batch !== null) current_batch.capture(derived, value, true);
			else derived.v = value;
			if (derived.deps === null) {
				set_signal_status(derived, CLEAN);
				return;
			}
		}
	}
	if (is_destroying_effect) return;
	if (batch_values !== null) {
		if (effect_tracking() || (current_batch === null || current_batch === void 0 ? void 0 : current_batch.is_fork)) batch_values.set(derived, value);
	} else update_derived_status(derived);
}
/**
* @param {Derived} derived
*/
function freeze_derived_effects(derived) {
	if (derived.effects === null) return;
	for (const e of derived.effects) if (e.teardown || e.ac) {
		var _e$teardown, _e$ac;
		(_e$teardown = e.teardown) === null || _e$teardown === void 0 || _e$teardown.call(e);
		(_e$ac = e.ac) === null || _e$ac === void 0 || _e$ac.abort(STALE_REACTION);
		e.teardown = noop;
		e.ac = null;
		remove_reactions(e, 0);
		destroy_effect_children(e);
	}
}
/**
* @param {Derived} derived
*/
function unfreeze_derived_effects(derived) {
	if (derived.effects === null) return;
	for (const e of derived.effects) if (e.teardown) update_effect(e);
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/reactivity/sources.js
/** @import { Derived, Effect, Source, Value } from '#client' */
/** @type {Set<any>} */
var eager_effects = /* @__PURE__ */ new Set();
/** @type {Map<Source, any>} */
var old_values = /* @__PURE__ */ new Map();
/**
* @param {Set<any>} v
*/
function set_eager_effects(v) {
	eager_effects = v;
}
var eager_effects_deferred = false;
/**
* @template V
* @param {V} v
* @param {Error | null} [stack]
* @returns {Source<V>}
*/
function source(v, stack) {
	return {
		f: 0,
		v,
		reactions: null,
		equals,
		rv: 0,
		wv: 0
	};
}
/**
* @template V
* @param {V} v
* @param {Error | null} [stack]
*/
/* @__NO_SIDE_EFFECTS__ */
function state(v, stack) {
	const s = source(v, stack);
	push_reaction_value(s);
	return s;
}
/**
* @template V
* @param {V} initial_value
* @param {boolean} [immutable]
* @returns {Source<V>}
*/
/* @__NO_SIDE_EFFECTS__ */
function mutable_source(initial_value, immutable = false, trackable = true) {
	const s = source(initial_value);
	if (!immutable) s.equals = safe_equals;
	if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) {
		var _component_context$l, _component_context$l$;
		((_component_context$l$ = (_component_context$l = component_context.l).s) !== null && _component_context$l$ !== void 0 ? _component_context$l$ : _component_context$l.s = []).push(s);
	}
	return s;
}
/**
* @template V
* @param {Source<V>} source
* @param {V} value
* @param {boolean} [should_proxy]
* @returns {V}
*/
function set(source, value, should_proxy = false) {
	if (active_reaction !== null && (!untracking || (active_reaction.f & 131072) !== 0) && is_runes() && (active_reaction.f & 4325394) !== 0 && (current_sources === null || !includes.call(current_sources, source))) state_unsafe_mutation();
	return internal_set(source, should_proxy ? proxy(value) : value, legacy_updates);
}
/**
* @template V
* @param {Source<V>} source
* @param {V} value
* @param {Effect[] | null} [updated_during_traversal]
* @returns {V}
*/
function internal_set(source, value, updated_during_traversal = null) {
	if (!source.equals(value)) {
		old_values.set(source, is_destroying_effect ? value : source.v);
		var batch = Batch.ensure();
		batch.capture(source, value);
		if ((source.f & 2) !== 0) {
			const derived = source;
			if ((source.f & 2048) !== 0) execute_derived(derived);
			if (batch_values === null) update_derived_status(derived);
		}
		source.wv = increment_write_version();
		mark_reactions(source, DIRTY, updated_during_traversal);
		if (is_runes() && active_effect !== null && (active_effect.f & 1024) !== 0 && (active_effect.f & 96) === 0) if (untracked_writes === null) set_untracked_writes([source]);
		else untracked_writes.push(source);
		if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) flush_eager_effects();
	}
	return value;
}
function flush_eager_effects() {
	eager_effects_deferred = false;
	for (const effect of eager_effects) {
		if ((effect.f & 1024) !== 0) set_signal_status(effect, MAYBE_DIRTY);
		if (is_dirty(effect)) update_effect(effect);
	}
	eager_effects.clear();
}
/**
* @template {number | bigint} T
* @param {Source<T>} source
* @param {1 | -1} [d]
* @returns {T}
*/
function update(source, d = 1) {
	var value = get(source);
	var result = d === 1 ? value++ : value--;
	set(source, value);
	return result;
}
/**
* Silently (without using `get`) increment a source
* @param {Source<number>} source
*/
function increment(source) {
	set(source, source.v + 1);
}
/**
* @param {Value} signal
* @param {number} status should be DIRTY or MAYBE_DIRTY
* @param {Effect[] | null} updated_during_traversal
* @returns {void}
*/
function mark_reactions(signal, status, updated_during_traversal) {
	var reactions = signal.reactions;
	if (reactions === null) return;
	var runes = is_runes();
	var length = reactions.length;
	for (var i = 0; i < length; i++) {
		var reaction = reactions[i];
		var flags = reaction.f;
		if (!runes && reaction === active_effect) continue;
		var not_dirty = (flags & DIRTY) === 0;
		if (not_dirty) set_signal_status(reaction, status);
		if ((flags & 2) !== 0) {
			var derived = reaction;
			batch_values === null || batch_values === void 0 || batch_values.delete(derived);
			if ((flags & 65536) === 0) {
				if (flags & 512) reaction.f |= WAS_MARKED;
				mark_reactions(derived, MAYBE_DIRTY, updated_during_traversal);
			}
		} else if (not_dirty) {
			var effect = reaction;
			if ((flags & 16) !== 0 && eager_block_effects !== null) eager_block_effects.add(effect);
			if (updated_during_traversal !== null) updated_during_traversal.push(effect);
			else schedule_effect(effect);
		}
	}
}
/**
* @template T
* @param {T} value
* @returns {T}
*/
function proxy(value) {
	if (typeof value !== "object" || value === null || STATE_SYMBOL in value) return value;
	const prototype = get_prototype_of(value);
	if (prototype !== object_prototype && prototype !== array_prototype) return value;
	/** @type {Map<any, Source<any>>} */
	var sources = /* @__PURE__ */ new Map();
	var is_proxied_array = is_array(value);
	var version = /* @__PURE__ */ state(0);
	var stack = null;
	var parent_version = update_version;
	/**
	* Executes the proxy in the context of the reaction it was originally created in, if any
	* @template T
	* @param {() => T} fn
	*/
	var with_parent = (fn) => {
		if (update_version === parent_version) return fn();
		var reaction = active_reaction;
		var version = update_version;
		set_active_reaction(null);
		set_update_version(parent_version);
		var result = fn();
		set_active_reaction(reaction);
		set_update_version(version);
		return result;
	};
	if (is_proxied_array) sources.set("length", /* @__PURE__ */ state(
		/** @type {any[]} */
		value.length,
		stack
	));
	return new Proxy(value, {
		defineProperty(_, prop, descriptor) {
			if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) state_descriptors_fixed();
			var s = sources.get(prop);
			if (s === void 0) with_parent(() => {
				var s = /* @__PURE__ */ state(descriptor.value, stack);
				sources.set(prop, s);
				return s;
			});
			else set(s, descriptor.value, true);
			return true;
		},
		deleteProperty(target, prop) {
			var s = sources.get(prop);
			if (s === void 0) {
				if (prop in target) {
					const s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED, stack));
					sources.set(prop, s);
					increment(version);
				}
			} else {
				set(s, UNINITIALIZED);
				increment(version);
			}
			return true;
		},
		get(target, prop, receiver) {
			var _get_descriptor;
			if (prop === STATE_SYMBOL) return value;
			var s = sources.get(prop);
			var exists = prop in target;
			if (s === void 0 && (!exists || ((_get_descriptor = get_descriptor(target, prop)) === null || _get_descriptor === void 0 ? void 0 : _get_descriptor.writable))) {
				s = with_parent(() => {
					return /* @__PURE__ */ state(proxy(exists ? target[prop] : UNINITIALIZED), stack);
				});
				sources.set(prop, s);
			}
			if (s !== void 0) {
				var v = get(s);
				return v === UNINITIALIZED ? void 0 : v;
			}
			return Reflect.get(target, prop, receiver);
		},
		getOwnPropertyDescriptor(target, prop) {
			var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
			if (descriptor && "value" in descriptor) {
				var s = sources.get(prop);
				if (s) descriptor.value = get(s);
			} else if (descriptor === void 0) {
				var source = sources.get(prop);
				var value = source === null || source === void 0 ? void 0 : source.v;
				if (source !== void 0 && value !== UNINITIALIZED) return {
					enumerable: true,
					configurable: true,
					value,
					writable: true
				};
			}
			return descriptor;
		},
		has(target, prop) {
			var _get_descriptor2;
			if (prop === STATE_SYMBOL) return true;
			var s = sources.get(prop);
			var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop);
			if (s !== void 0 || active_effect !== null && (!has || ((_get_descriptor2 = get_descriptor(target, prop)) === null || _get_descriptor2 === void 0 ? void 0 : _get_descriptor2.writable))) {
				if (s === void 0) {
					s = with_parent(() => {
						return /* @__PURE__ */ state(has ? proxy(target[prop]) : UNINITIALIZED, stack);
					});
					sources.set(prop, s);
				}
				if (get(s) === UNINITIALIZED) return false;
			}
			return has;
		},
		set(target, prop, value, receiver) {
			var s = sources.get(prop);
			var has = prop in target;
			if (is_proxied_array && prop === "length") for (var i = value; i < s.v; i += 1) {
				var other_s = sources.get(i + "");
				if (other_s !== void 0) set(other_s, UNINITIALIZED);
				else if (i in target) {
					other_s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED, stack));
					sources.set(i + "", other_s);
				}
			}
			if (s === void 0) {
				var _get_descriptor3;
				if (!has || ((_get_descriptor3 = get_descriptor(target, prop)) === null || _get_descriptor3 === void 0 ? void 0 : _get_descriptor3.writable)) {
					s = with_parent(() => /* @__PURE__ */ state(void 0, stack));
					set(s, proxy(value));
					sources.set(prop, s);
				}
			} else {
				has = s.v !== UNINITIALIZED;
				var p = with_parent(() => proxy(value));
				set(s, p);
			}
			var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
			if (descriptor === null || descriptor === void 0 ? void 0 : descriptor.set) descriptor.set.call(receiver, value);
			if (!has) {
				if (is_proxied_array && typeof prop === "string") {
					var ls = sources.get("length");
					var n = Number(prop);
					if (Number.isInteger(n) && n >= ls.v) set(ls, n + 1);
				}
				increment(version);
			}
			return true;
		},
		ownKeys(target) {
			get(version);
			var own_keys = Reflect.ownKeys(target).filter((key) => {
				var source = sources.get(key);
				return source === void 0 || source.v !== UNINITIALIZED;
			});
			for (var [key, source] of sources) if (source.v !== UNINITIALIZED && !(key in target)) own_keys.push(key);
			return own_keys;
		},
		setPrototypeOf() {
			state_prototype_fixed();
		}
	});
}
/**
* @param {any} value
*/
function get_proxied_value(value) {
	try {
		if (value !== null && typeof value === "object" && STATE_SYMBOL in value) return value[STATE_SYMBOL];
	} catch (_unused) {}
	return value;
}
/**
* @param {any} a
* @param {any} b
*/
function is(a, b) {
	return Object.is(get_proxied_value(a), get_proxied_value(b));
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/operations.js
/** @import { Effect, TemplateNode } from '#client' */
/** @type {Window} */
var $window;
/** @type {boolean} */
var is_firefox;
/** @type {() => Node | null} */
var first_child_getter;
/** @type {() => Node | null} */
var next_sibling_getter;
/**
* Initialize these lazily to avoid issues when using the runtime in a server context
* where these globals are not available while avoiding a separate server entry point
*/
function init_operations() {
	if ($window !== void 0) return;
	$window = window;
	is_firefox = /Firefox/.test(navigator.userAgent);
	var element_prototype = Element.prototype;
	var node_prototype = Node.prototype;
	var text_prototype = Text.prototype;
	first_child_getter = get_descriptor(node_prototype, "firstChild").get;
	next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
	if (is_extensible(element_prototype)) {
		element_prototype.__click = void 0;
		element_prototype.__className = void 0;
		element_prototype.__attributes = null;
		element_prototype.__style = void 0;
		element_prototype.__e = void 0;
	}
	if (is_extensible(text_prototype)) text_prototype.__t = void 0;
}
/**
* @param {string} value
* @returns {Text}
*/
function create_text(value = "") {
	return document.createTextNode(value);
}
/**
* @template {Node} N
* @param {N} node
*/
/* @__NO_SIDE_EFFECTS__ */
function get_first_child(node) {
	return first_child_getter.call(node);
}
/**
* @template {Node} N
* @param {N} node
*/
/* @__NO_SIDE_EFFECTS__ */
function get_next_sibling(node) {
	return next_sibling_getter.call(node);
}
/**
* Don't mark this as side-effect-free, hydration needs to walk all nodes
* @template {Node} N
* @param {N} node
* @param {boolean} is_text
* @returns {TemplateNode | null}
*/
function child(node, is_text) {
	if (!hydrating) return /* @__PURE__ */ get_first_child(node);
	var child = /* @__PURE__ */ get_first_child(hydrate_node);
	if (child === null) child = hydrate_node.appendChild(create_text());
	else if (is_text && child.nodeType !== 3) {
		var text = create_text();
		child === null || child === void 0 || child.before(text);
		set_hydrate_node(text);
		return text;
	}
	if (is_text) merge_text_nodes(child);
	set_hydrate_node(child);
	return child;
}
/**
* Don't mark this as side-effect-free, hydration needs to walk all nodes
* @param {TemplateNode} node
* @param {boolean} [is_text]
* @returns {TemplateNode | null}
*/
function first_child(node, is_text = false) {
	if (!hydrating) {
		var first = /* @__PURE__ */ get_first_child(node);
		if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
		return first;
	}
	if (is_text) {
		if ((hydrate_node === null || hydrate_node === void 0 ? void 0 : hydrate_node.nodeType) !== 3) {
			var text = create_text();
			hydrate_node === null || hydrate_node === void 0 || hydrate_node.before(text);
			set_hydrate_node(text);
			return text;
		}
		merge_text_nodes(hydrate_node);
	}
	return hydrate_node;
}
/**
* Don't mark this as side-effect-free, hydration needs to walk all nodes
* @param {TemplateNode} node
* @param {number} count
* @param {boolean} is_text
* @returns {TemplateNode | null}
*/
function sibling(node, count = 1, is_text = false) {
	let next_sibling = hydrating ? hydrate_node : node;
	var last_sibling;
	while (count--) {
		last_sibling = next_sibling;
		next_sibling = /* @__PURE__ */ get_next_sibling(next_sibling);
	}
	if (!hydrating) return next_sibling;
	if (is_text) {
		if ((next_sibling === null || next_sibling === void 0 ? void 0 : next_sibling.nodeType) !== 3) {
			var text = create_text();
			if (next_sibling === null) last_sibling === null || last_sibling === void 0 || last_sibling.after(text);
			else next_sibling.before(text);
			set_hydrate_node(text);
			return text;
		}
		merge_text_nodes(next_sibling);
	}
	set_hydrate_node(next_sibling);
	return next_sibling;
}
/**
* @template {Node} N
* @param {N} node
* @returns {void}
*/
function clear_text_content(node) {
	node.textContent = "";
}
/**
* Returns `true` if we're updating the current block, for example `condition` in
* an `{#if condition}` block just changed. In this case, the branch should be
* appended (or removed) at the same time as other updates within the
* current `<svelte:boundary>`
*/
function should_defer_append() {
	if (!async_mode_flag) return false;
	if (eager_block_effects !== null) return false;
	return (active_effect.f & REACTION_RAN) !== 0;
}
/**
* @template {keyof HTMLElementTagNameMap | string} T
* @param {T} tag
* @param {string} [namespace]
* @param {string} [is]
* @returns {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element}
*/
function create_element(tag, namespace, is) {
	let options = is ? { is } : void 0;
	return document.createElementNS(namespace !== null && namespace !== void 0 ? namespace : NAMESPACE_HTML, tag, options);
}
/**
* Browsers split text nodes larger than 65536 bytes when parsing.
* For hydration to succeed, we need to stitch them back together
* @param {Text} text
*/
function merge_text_nodes(text) {
	if (text.nodeValue.length < 65536) return;
	let next = text.nextSibling;
	while (next !== null && next.nodeType === 3) {
		next.remove();
		/** @type {string} */ text.nodeValue += next.nodeValue;
		next = text.nextSibling;
	}
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/elements/misc.js
/**
* @param {HTMLElement} dom
* @param {boolean} value
* @returns {void}
*/
function autofocus(dom, value) {
	if (value) {
		const body = document.body;
		dom.autofocus = true;
		queue_micro_task(() => {
			if (document.activeElement === body) dom.focus();
		});
	}
}
var listening_to_form_reset = false;
function add_form_reset_listener() {
	if (!listening_to_form_reset) {
		listening_to_form_reset = true;
		document.addEventListener("reset", (evt) => {
			Promise.resolve().then(() => {
				if (!evt.defaultPrevented) for (const e of evt.target.elements) {
					var _e$__on_r;
					(_e$__on_r = e.__on_r) === null || _e$__on_r === void 0 || _e$__on_r.call(e);
				}
			});
		}, { capture: true });
	}
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
/**
* @template T
* @param {() => T} fn
*/
function without_reactive_context(fn) {
	var previous_reaction = active_reaction;
	var previous_effect = active_effect;
	set_active_reaction(null);
	set_active_effect(null);
	try {
		return fn();
	} finally {
		set_active_reaction(previous_reaction);
		set_active_effect(previous_effect);
	}
}
/**
* Listen to the given event, and then instantiate a global form reset listener if not already done,
* to notify all bindings when the form is reset
* @param {HTMLElement} element
* @param {string} event
* @param {(is_reset?: true) => void} handler
* @param {(is_reset?: true) => void} [on_reset]
*/
function listen_to_event_and_reset_event(element, event, handler, on_reset = handler) {
	element.addEventListener(event, () => without_reactive_context(handler));
	const prev = element.__on_r;
	if (prev) element.__on_r = () => {
		prev();
		on_reset(true);
	};
	else element.__on_r = () => on_reset(true);
	add_form_reset_listener();
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/reactivity/effects.js
/** @import { Blocker, ComponentContext, ComponentContextLegacy, Derived, Effect, TemplateNode, TransitionManager } from '#client' */
/**
* @param {'$effect' | '$effect.pre' | '$inspect'} rune
*/
function validate_effect(rune) {
	if (active_effect === null) {
		if (active_reaction === null) effect_orphan(rune);
		effect_in_unowned_derived();
	}
	if (is_destroying_effect) effect_in_teardown(rune);
}
/**
* @param {Effect} effect
* @param {Effect} parent_effect
*/
function push_effect(effect, parent_effect) {
	var parent_last = parent_effect.last;
	if (parent_last === null) parent_effect.last = parent_effect.first = effect;
	else {
		parent_last.next = effect;
		effect.prev = parent_last;
		parent_effect.last = effect;
	}
}
/**
* @param {number} type
* @param {null | (() => void | (() => void))} fn
* @returns {Effect}
*/
function create_effect(type, fn) {
	var parent = active_effect;
	if (parent !== null && (parent.f & 8192) !== 0) type |= INERT;
	/** @type {Effect} */
	var effect = {
		ctx: component_context,
		deps: null,
		nodes: null,
		f: type | DIRTY | 512,
		first: null,
		fn,
		last: null,
		next: null,
		parent,
		b: parent && parent.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	current_batch === null || current_batch === void 0 || current_batch.register_created_effect(effect);
	/** @type {Effect | null} */
	var e = effect;
	if ((type & 4) !== 0) if (collected_effects !== null) collected_effects.push(effect);
	else Batch.ensure().schedule(effect);
	else if (fn !== null) {
		try {
			update_effect(effect);
		} catch (e) {
			destroy_effect(effect);
			throw e;
		}
		if (e.deps === null && e.teardown === null && e.nodes === null && e.first === e.last && (e.f & 524288) === 0) {
			e = e.first;
			if ((type & 16) !== 0 && (type & 65536) !== 0 && e !== null) e.f |= EFFECT_TRANSPARENT;
		}
	}
	if (e !== null) {
		e.parent = parent;
		if (parent !== null) push_effect(e, parent);
		if (active_reaction !== null && (active_reaction.f & 2) !== 0 && (type & 64) === 0) {
			var _derived$effects;
			var derived = active_reaction;
			((_derived$effects = derived.effects) !== null && _derived$effects !== void 0 ? _derived$effects : derived.effects = []).push(e);
		}
	}
	return effect;
}
/**
* Internal representation of `$effect.tracking()`
* @returns {boolean}
*/
function effect_tracking() {
	return active_reaction !== null && !untracking;
}
/**
* @param {() => void} fn
*/
function teardown(fn) {
	const effect = create_effect(8, null);
	set_signal_status(effect, CLEAN);
	effect.teardown = fn;
	return effect;
}
/**
* Internal representation of `$effect(...)`
* @param {() => void | (() => void)} fn
*/
function user_effect(fn) {
	validate_effect("$effect");
	var flags = active_effect.f;
	if (!active_reaction && (flags & 32) !== 0 && (flags & 32768) === 0) {
		var _context$e;
		var context = component_context;
		((_context$e = context.e) !== null && _context$e !== void 0 ? _context$e : context.e = []).push(fn);
	} else return create_user_effect(fn);
}
/**
* @param {() => void | (() => void)} fn
*/
function create_user_effect(fn) {
	return create_effect(4 | USER_EFFECT, fn);
}
/**
* Internal representation of `$effect.pre(...)`
* @param {() => void | (() => void)} fn
* @returns {Effect}
*/
function user_pre_effect(fn) {
	validate_effect("$effect.pre");
	return create_effect(8 | USER_EFFECT, fn);
}
/**
* An effect root whose children can transition out
* @param {() => void} fn
* @returns {(options?: { outro?: boolean }) => Promise<void>}
*/
function component_root(fn) {
	Batch.ensure();
	const effect = create_effect(64 | EFFECT_PRESERVED, fn);
	return (options = {}) => {
		return new Promise((fulfil) => {
			if (options.outro) pause_effect(effect, () => {
				destroy_effect(effect);
				fulfil(void 0);
			});
			else {
				destroy_effect(effect);
				fulfil(void 0);
			}
		});
	};
}
/**
* @param {() => void | (() => void)} fn
* @returns {Effect}
*/
function effect(fn) {
	return create_effect(4, fn);
}
/**
* @param {() => void | (() => void)} fn
* @returns {Effect}
*/
function async_effect(fn) {
	return create_effect(ASYNC | EFFECT_PRESERVED, fn);
}
/**
* @param {() => void | (() => void)} fn
* @returns {Effect}
*/
function render_effect(fn, flags = 0) {
	return create_effect(8 | flags, fn);
}
/**
* @param {(...expressions: any) => void | (() => void)} fn
* @param {Array<() => any>} sync
* @param {Array<() => Promise<any>>} async
* @param {Blocker[]} blockers
*/
function template_effect(fn, sync = [], async = [], blockers = []) {
	flatten(blockers, sync, async, (values) => {
		create_effect(8, () => fn(...values.map(get)));
	});
}
/**
* @param {(() => void)} fn
* @param {number} flags
*/
function block(fn, flags = 0) {
	return create_effect(16 | flags, fn);
}
/**
* @param {(() => void)} fn
* @param {number} flags
*/
function managed(fn, flags = 0) {
	return create_effect(MANAGED_EFFECT | flags, fn);
}
/**
* @param {(() => void)} fn
*/
function branch(fn) {
	return create_effect(32 | EFFECT_PRESERVED, fn);
}
/**
* @param {Effect} effect
*/
function execute_effect_teardown(effect) {
	var teardown = effect.teardown;
	if (teardown !== null) {
		const previously_destroying_effect = is_destroying_effect;
		const previous_reaction = active_reaction;
		set_is_destroying_effect(true);
		set_active_reaction(null);
		try {
			teardown.call(null);
		} finally {
			set_is_destroying_effect(previously_destroying_effect);
			set_active_reaction(previous_reaction);
		}
	}
}
/**
* @param {Effect} signal
* @param {boolean} remove_dom
* @returns {void}
*/
function destroy_effect_children(signal, remove_dom = false) {
	var effect = signal.first;
	signal.first = signal.last = null;
	while (effect !== null) {
		const controller = effect.ac;
		if (controller !== null) without_reactive_context(() => {
			controller.abort(STALE_REACTION);
		});
		var next = effect.next;
		if ((effect.f & 64) !== 0) effect.parent = null;
		else destroy_effect(effect, remove_dom);
		effect = next;
	}
}
/**
* @param {Effect} signal
* @returns {void}
*/
function destroy_block_effect_children(signal) {
	var effect = signal.first;
	while (effect !== null) {
		var next = effect.next;
		if ((effect.f & 32) === 0) destroy_effect(effect);
		effect = next;
	}
}
/**
* @param {Effect} effect
* @param {boolean} [remove_dom]
* @returns {void}
*/
function destroy_effect(effect, remove_dom = true) {
	var removed = false;
	if ((remove_dom || (effect.f & 262144) !== 0) && effect.nodes !== null && effect.nodes.end !== null) {
		remove_effect_dom(effect.nodes.start, effect.nodes.end);
		removed = true;
	}
	set_signal_status(effect, DESTROYING);
	destroy_effect_children(effect, remove_dom && !removed);
	remove_reactions(effect, 0);
	var transitions = effect.nodes && effect.nodes.t;
	if (transitions !== null) for (const transition of transitions) transition.stop();
	execute_effect_teardown(effect);
	effect.f ^= DESTROYING;
	effect.f |= DESTROYED;
	var parent = effect.parent;
	if (parent !== null && parent.first !== null) unlink_effect(effect);
	effect.next = effect.prev = effect.teardown = effect.ctx = effect.deps = effect.fn = effect.nodes = effect.ac = effect.b = null;
}
/**
*
* @param {TemplateNode | null} node
* @param {TemplateNode} end
*/
function remove_effect_dom(node, end) {
	while (node !== null) {
		/** @type {TemplateNode | null} */
		var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
		node.remove();
		node = next;
	}
}
/**
* Detach an effect from the effect tree, freeing up memory and
* reducing the amount of work that happens on subsequent traversals
* @param {Effect} effect
*/
function unlink_effect(effect) {
	var parent = effect.parent;
	var prev = effect.prev;
	var next = effect.next;
	if (prev !== null) prev.next = next;
	if (next !== null) next.prev = prev;
	if (parent !== null) {
		if (parent.first === effect) parent.first = next;
		if (parent.last === effect) parent.last = prev;
	}
}
/**
* When a block effect is removed, we don't immediately destroy it or yank it
* out of the DOM, because it might have transitions. Instead, we 'pause' it.
* It stays around (in memory, and in the DOM) until outro transitions have
* completed, and if the state change is reversed then we _resume_ it.
* A paused effect does not update, and the DOM subtree becomes inert.
* @param {Effect} effect
* @param {() => void} [callback]
* @param {boolean} [destroy]
*/
function pause_effect(effect, callback, destroy = true) {
	/** @type {TransitionManager[]} */
	var transitions = [];
	pause_children(effect, transitions, true);
	var fn = () => {
		if (destroy) destroy_effect(effect);
		if (callback) callback();
	};
	var remaining = transitions.length;
	if (remaining > 0) {
		var check = () => --remaining || fn();
		for (var transition of transitions) transition.out(check);
	} else fn();
}
/**
* @param {Effect} effect
* @param {TransitionManager[]} transitions
* @param {boolean} local
*/
function pause_children(effect, transitions, local) {
	if ((effect.f & 8192) !== 0) return;
	effect.f ^= INERT;
	var t = effect.nodes && effect.nodes.t;
	if (t !== null) {
		for (const transition of t) if (transition.is_global || local) transitions.push(transition);
	}
	var child = effect.first;
	while (child !== null) {
		var sibling = child.next;
		var transparent = (child.f & 65536) !== 0 || (child.f & 32) !== 0 && (effect.f & 16) !== 0;
		pause_children(child, transitions, transparent ? local : false);
		child = sibling;
	}
}
/**
* The opposite of `pause_effect`. We call this if (for example)
* `x` becomes falsy then truthy: `{#if x}...{/if}`
* @param {Effect} effect
*/
function resume_effect(effect) {
	resume_children(effect, true);
}
/**
* @param {Effect} effect
* @param {boolean} local
*/
function resume_children(effect, local) {
	if ((effect.f & 8192) === 0) return;
	effect.f ^= INERT;
	if ((effect.f & 1024) === 0) {
		set_signal_status(effect, DIRTY);
		Batch.ensure().schedule(effect);
	}
	var child = effect.first;
	while (child !== null) {
		var sibling = child.next;
		var transparent = (child.f & 65536) !== 0 || (child.f & 32) !== 0;
		resume_children(child, transparent ? local : false);
		child = sibling;
	}
	var t = effect.nodes && effect.nodes.t;
	if (t !== null) {
		for (const transition of t) if (transition.is_global || local) transition.in();
	}
}
/**
* @param {Effect} effect
* @param {DocumentFragment} fragment
*/
function move_effect(effect, fragment) {
	if (!effect.nodes) return;
	/** @type {TemplateNode | null} */
	var node = effect.nodes.start;
	var end = effect.nodes.end;
	while (node !== null) {
		/** @type {TemplateNode | null} */
		var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
		fragment.append(node);
		node = next;
	}
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/legacy.js
/**
* @type {Set<Value> | null}
* @deprecated
*/
var captured_signals = null;
//#endregion
//#region ../node_modules/svelte/src/internal/client/runtime.js
/** @import { Derived, Effect, Reaction, Source, Value } from '#client' */
var is_updating_effect = false;
var is_destroying_effect = false;
/** @param {boolean} value */
function set_is_destroying_effect(value) {
	is_destroying_effect = value;
}
/** @type {null | Reaction} */
var active_reaction = null;
var untracking = false;
/** @param {null | Reaction} reaction */
function set_active_reaction(reaction) {
	active_reaction = reaction;
}
/** @type {null | Effect} */
var active_effect = null;
/** @param {null | Effect} effect */
function set_active_effect(effect) {
	active_effect = effect;
}
/**
* When sources are created within a reaction, reading and writing
* them within that reaction should not cause a re-run
* @type {null | Source[]}
*/
var current_sources = null;
/** @param {Value} value */
function push_reaction_value(value) {
	if (active_reaction !== null && (!async_mode_flag || (active_reaction.f & 2) !== 0)) if (current_sources === null) current_sources = [value];
	else current_sources.push(value);
}
/**
* The dependencies of the reaction that is currently being executed. In many cases,
* the dependencies are unchanged between runs, and so this will be `null` unless
* and until a new dependency is accessed — we track this via `skipped_deps`
* @type {null | Value[]}
*/
var new_deps = null;
var skipped_deps = 0;
/**
* Tracks writes that the effect it's executed in doesn't listen to yet,
* so that the dependency can be added to the effect later on if it then reads it
* @type {null | Source[]}
*/
var untracked_writes = null;
/** @param {null | Source[]} value */
function set_untracked_writes(value) {
	untracked_writes = value;
}
/**
* @type {number} Used by sources and deriveds for handling updates.
* Version starts from 1 so that unowned deriveds differentiate between a created effect and a run one for tracing
**/
var write_version = 1;
/** @type {number} Used to version each read of a source of derived to avoid duplicating depedencies inside a reaction */
var read_version = 0;
var update_version = read_version;
/** @param {number} value */
function set_update_version(value) {
	update_version = value;
}
function increment_write_version() {
	return ++write_version;
}
/**
* Determines whether a derived or effect is dirty.
* If it is MAYBE_DIRTY, will set the status to CLEAN
* @param {Reaction} reaction
* @returns {boolean}
*/
function is_dirty(reaction) {
	var flags = reaction.f;
	if ((flags & 2048) !== 0) return true;
	if (flags & 2) reaction.f &= ~WAS_MARKED;
	if ((flags & 4096) !== 0) {
		var dependencies = reaction.deps;
		var length = dependencies.length;
		for (var i = 0; i < length; i++) {
			var dependency = dependencies[i];
			if (is_dirty(dependency)) update_derived(dependency);
			if (dependency.wv > reaction.wv) return true;
		}
		if ((flags & 512) !== 0 && batch_values === null) set_signal_status(reaction, CLEAN);
	}
	return false;
}
/**
* @param {Value} signal
* @param {Effect} effect
* @param {boolean} [root]
*/
function schedule_possible_effect_self_invalidation(signal, effect, root = true) {
	var reactions = signal.reactions;
	if (reactions === null) return;
	if (!async_mode_flag && current_sources !== null && includes.call(current_sources, signal)) return;
	for (var i = 0; i < reactions.length; i++) {
		var reaction = reactions[i];
		if ((reaction.f & 2) !== 0) schedule_possible_effect_self_invalidation(reaction, effect, false);
		else if (effect === reaction) {
			if (root) set_signal_status(reaction, DIRTY);
			else if ((reaction.f & 1024) !== 0) set_signal_status(reaction, MAYBE_DIRTY);
			schedule_effect(reaction);
		}
	}
}
/** @param {Reaction} reaction */
function update_reaction(reaction) {
	var previous_deps = new_deps;
	var previous_skipped_deps = skipped_deps;
	var previous_untracked_writes = untracked_writes;
	var previous_reaction = active_reaction;
	var previous_sources = current_sources;
	var previous_component_context = component_context;
	var previous_untracking = untracking;
	var previous_update_version = update_version;
	var flags = reaction.f;
	new_deps = null;
	skipped_deps = 0;
	untracked_writes = null;
	active_reaction = (flags & 96) === 0 ? reaction : null;
	current_sources = null;
	set_component_context(reaction.ctx);
	untracking = false;
	update_version = ++read_version;
	if (reaction.ac !== null) {
		without_reactive_context(() => {
			/** @type {AbortController} */ reaction.ac.abort(STALE_REACTION);
		});
		reaction.ac = null;
	}
	try {
		reaction.f |= REACTION_IS_UPDATING;
		var fn = reaction.fn;
		var result = fn();
		reaction.f |= REACTION_RAN;
		var deps = reaction.deps;
		var is_fork = current_batch === null || current_batch === void 0 ? void 0 : current_batch.is_fork;
		if (new_deps !== null) {
			var i;
			if (!is_fork) remove_reactions(reaction, skipped_deps);
			if (deps !== null && skipped_deps > 0) {
				deps.length = skipped_deps + new_deps.length;
				for (i = 0; i < new_deps.length; i++) deps[skipped_deps + i] = new_deps[i];
			} else reaction.deps = deps = new_deps;
			if (effect_tracking() && (reaction.f & 512) !== 0) for (i = skipped_deps; i < deps.length; i++) {
				var _deps$i, _deps$i$reactions;
				((_deps$i$reactions = (_deps$i = deps[i]).reactions) !== null && _deps$i$reactions !== void 0 ? _deps$i$reactions : _deps$i.reactions = []).push(reaction);
			}
		} else if (!is_fork && deps !== null && skipped_deps < deps.length) {
			remove_reactions(reaction, skipped_deps);
			deps.length = skipped_deps;
		}
		if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & 6146) === 0) for (i = 0; i < untracked_writes.length; i++) schedule_possible_effect_self_invalidation(untracked_writes[i], reaction);
		if (previous_reaction !== null && previous_reaction !== reaction) {
			read_version++;
			if (previous_reaction.deps !== null) for (let i = 0; i < previous_skipped_deps; i += 1) previous_reaction.deps[i].rv = read_version;
			if (previous_deps !== null) for (const dep of previous_deps) dep.rv = read_version;
			if (untracked_writes !== null) if (previous_untracked_writes === null) previous_untracked_writes = untracked_writes;
			else previous_untracked_writes.push(...untracked_writes);
		}
		if ((reaction.f & 8388608) !== 0) reaction.f ^= ERROR_VALUE;
		return result;
	} catch (error) {
		return handle_error(error);
	} finally {
		reaction.f ^= REACTION_IS_UPDATING;
		new_deps = previous_deps;
		skipped_deps = previous_skipped_deps;
		untracked_writes = previous_untracked_writes;
		active_reaction = previous_reaction;
		current_sources = previous_sources;
		set_component_context(previous_component_context);
		untracking = previous_untracking;
		update_version = previous_update_version;
	}
}
/**
* @template V
* @param {Reaction} signal
* @param {Value<V>} dependency
* @returns {void}
*/
function remove_reaction(signal, dependency) {
	let reactions = dependency.reactions;
	if (reactions !== null) {
		var index = index_of.call(reactions, signal);
		if (index !== -1) {
			var new_length = reactions.length - 1;
			if (new_length === 0) reactions = dependency.reactions = null;
			else {
				reactions[index] = reactions[new_length];
				reactions.pop();
			}
		}
	}
	if (reactions === null && (dependency.f & 2) !== 0 && (new_deps === null || !includes.call(new_deps, dependency))) {
		var derived = dependency;
		if ((derived.f & 512) !== 0) {
			derived.f ^= 512;
			derived.f &= ~WAS_MARKED;
		}
		if (derived.v !== UNINITIALIZED) update_derived_status(derived);
		freeze_derived_effects(derived);
		remove_reactions(derived, 0);
	}
}
/**
* @param {Reaction} signal
* @param {number} start_index
* @returns {void}
*/
function remove_reactions(signal, start_index) {
	var dependencies = signal.deps;
	if (dependencies === null) return;
	for (var i = start_index; i < dependencies.length; i++) remove_reaction(signal, dependencies[i]);
}
/**
* @param {Effect} effect
* @returns {void}
*/
function update_effect(effect) {
	var flags = effect.f;
	if ((flags & 16384) !== 0) return;
	set_signal_status(effect, CLEAN);
	var previous_effect = active_effect;
	var was_updating_effect = is_updating_effect;
	active_effect = effect;
	is_updating_effect = true;
	try {
		if ((flags & 16777232) !== 0) destroy_block_effect_children(effect);
		else destroy_effect_children(effect);
		execute_effect_teardown(effect);
		var teardown = update_reaction(effect);
		effect.teardown = typeof teardown === "function" ? teardown : null;
		effect.wv = write_version;
	} finally {
		is_updating_effect = was_updating_effect;
		active_effect = previous_effect;
	}
}
/**
* Returns a promise that resolves once any pending state changes have been applied.
* @returns {Promise<void>}
*/
async function tick() {
	if (async_mode_flag) return new Promise((f) => {
		requestAnimationFrame(() => f());
		setTimeout(() => f());
	});
	await Promise.resolve();
	flushSync();
}
/**
* Returns a promise that resolves once any state changes, and asynchronous work resulting from them,
* have resolved and the DOM has been updated
* @returns {Promise<void>}
* @since 5.36
*/
function settled() {
	return Batch.ensure().settled();
}
/**
* @template V
* @param {Value<V>} signal
* @returns {V}
*/
function get(signal) {
	var is_derived = (signal.f & 2) !== 0;
	captured_signals === null || captured_signals === void 0 || captured_signals.add(signal);
	if (active_reaction !== null && !untracking) {
		if (!(active_effect !== null && (active_effect.f & 16384) !== 0) && (current_sources === null || !includes.call(current_sources, signal))) {
			var deps = active_reaction.deps;
			if ((active_reaction.f & 2097152) !== 0) {
				if (signal.rv < read_version) {
					signal.rv = read_version;
					if (new_deps === null && deps !== null && deps[skipped_deps] === signal) skipped_deps++;
					else if (new_deps === null) new_deps = [signal];
					else new_deps.push(signal);
				}
			} else {
				var _active_reaction, _active_reaction$deps;
				((_active_reaction$deps = (_active_reaction = active_reaction).deps) !== null && _active_reaction$deps !== void 0 ? _active_reaction$deps : _active_reaction.deps = []).push(signal);
				var reactions = signal.reactions;
				if (reactions === null) signal.reactions = [active_reaction];
				else if (!includes.call(reactions, active_reaction)) reactions.push(active_reaction);
			}
		}
	}
	if (is_destroying_effect && old_values.has(signal)) return old_values.get(signal);
	if (is_derived) {
		var derived = signal;
		if (is_destroying_effect) {
			var value = derived.v;
			if ((derived.f & 1024) === 0 && derived.reactions !== null || depends_on_old_values(derived)) value = execute_derived(derived);
			old_values.set(derived, value);
			return value;
		}
		var should_connect = (derived.f & 512) === 0 && !untracking && active_reaction !== null && (is_updating_effect || (active_reaction.f & 512) !== 0);
		var is_new = (derived.f & REACTION_RAN) === 0;
		if (is_dirty(derived)) {
			if (should_connect) derived.f |= 512;
			update_derived(derived);
		}
		if (should_connect && !is_new) {
			unfreeze_derived_effects(derived);
			reconnect(derived);
		}
	}
	if (batch_values === null || batch_values === void 0 ? void 0 : batch_values.has(signal)) return batch_values.get(signal);
	if ((signal.f & 8388608) !== 0) throw signal.v;
	return signal.v;
}
/**
* (Re)connect a disconnected derived, so that it is notified
* of changes in `mark_reactions`
* @param {Derived} derived
*/
function reconnect(derived) {
	derived.f |= 512;
	if (derived.deps === null) return;
	for (const dep of derived.deps) {
		var _dep$reactions;
		((_dep$reactions = dep.reactions) !== null && _dep$reactions !== void 0 ? _dep$reactions : dep.reactions = []).push(derived);
		if ((dep.f & 2) !== 0 && (dep.f & 512) === 0) {
			unfreeze_derived_effects(dep);
			reconnect(dep);
		}
	}
}
/** @param {Derived} derived */
function depends_on_old_values(derived) {
	if (derived.v === UNINITIALIZED) return true;
	if (derived.deps === null) return false;
	for (const dep of derived.deps) {
		if (old_values.has(dep)) return true;
		if ((dep.f & 2) !== 0 && depends_on_old_values(dep)) return true;
	}
	return false;
}
/**
* Like `get`, but checks for `undefined`. Used for `var` declarations because they can be accessed before being declared
* @template V
* @param {Value<V> | undefined} signal
* @returns {V | undefined}
*/
function safe_get(signal) {
	return signal && get(signal);
}
/**
* When used inside a [`$derived`](https://svelte.dev/docs/svelte/$derived) or [`$effect`](https://svelte.dev/docs/svelte/$effect),
* any state read inside `fn` will not be treated as a dependency.
*
* ```ts
* $effect(() => {
*   // this will run when `data` changes, but not when `time` changes
*   save(data, {
*     timestamp: untrack(() => time)
*   });
* });
* ```
* @template T
* @param {() => T} fn
* @returns {T}
*/
function untrack(fn) {
	var previous_untracking = untracking;
	try {
		untracking = true;
		return fn();
	} finally {
		untracking = previous_untracking;
	}
}
/**
* Possibly traverse an object and read all its properties so that they're all reactive in case this is `$state`.
* Does only check first level of an object for performance reasons (heuristic should be good for 99% of all cases).
* @param {any} value
* @returns {void}
*/
function deep_read_state(value) {
	if (typeof value !== "object" || !value || value instanceof EventTarget) return;
	if (STATE_SYMBOL in value) deep_read(value);
	else if (!Array.isArray(value)) for (let key in value) {
		const prop = value[key];
		if (typeof prop === "object" && prop && STATE_SYMBOL in prop) deep_read(prop);
	}
}
/**
* Deeply traverse an object and read all its properties
* so that they're all reactive in case this is `$state`
* @param {any} value
* @param {Set<any>} visited
* @returns {void}
*/
function deep_read(value, visited = /* @__PURE__ */ new Set()) {
	if (typeof value === "object" && value !== null && !(value instanceof EventTarget) && !visited.has(value)) {
		visited.add(value);
		if (value instanceof Date) value.getTime();
		for (let key in value) try {
			deep_read(value[key], visited);
		} catch (e) {}
		const proto = get_prototype_of(value);
		if (proto !== Object.prototype && proto !== Array.prototype && proto !== Map.prototype && proto !== Set.prototype && proto !== Date.prototype) {
			const descriptors = get_descriptors(proto);
			for (let key in descriptors) {
				const get = descriptors[key].get;
				if (get) try {
					get.call(value);
				} catch (e) {}
			}
		}
	}
}
/**
* @param {string} name
*/
function is_capture_event(name) {
	return name.endsWith("capture") && name !== "gotpointercapture" && name !== "lostpointercapture";
}
/** List of Element events that will be delegated */
var DELEGATED_EVENTS = [
	"beforeinput",
	"click",
	"change",
	"dblclick",
	"contextmenu",
	"focusin",
	"focusout",
	"input",
	"keydown",
	"keyup",
	"mousedown",
	"mousemove",
	"mouseout",
	"mouseover",
	"mouseup",
	"pointerdown",
	"pointermove",
	"pointerout",
	"pointerover",
	"pointerup",
	"touchend",
	"touchmove",
	"touchstart"
];
/**
* Returns `true` if `event_name` is a delegated event
* @param {string} event_name
*/
function can_delegate_event(event_name) {
	return DELEGATED_EVENTS.includes(event_name);
}
/**
* Attributes that are boolean, i.e. they are present or not present.
*/
var DOM_BOOLEAN_ATTRIBUTES = [
	"allowfullscreen",
	"async",
	"autofocus",
	"autoplay",
	"checked",
	"controls",
	"default",
	"disabled",
	"formnovalidate",
	"indeterminate",
	"inert",
	"ismap",
	"loop",
	"multiple",
	"muted",
	"nomodule",
	"novalidate",
	"open",
	"playsinline",
	"readonly",
	"required",
	"reversed",
	"seamless",
	"selected",
	"webkitdirectory",
	"defer",
	"disablepictureinpicture",
	"disableremoteplayback"
];
/**
* @type {Record<string, string>}
* List of attribute names that should be aliased to their property names
* because they behave differently between setting them as an attribute and
* setting them as a property.
*/
var ATTRIBUTE_ALIASES = {
	formnovalidate: "formNoValidate",
	ismap: "isMap",
	nomodule: "noModule",
	playsinline: "playsInline",
	readonly: "readOnly",
	defaultvalue: "defaultValue",
	defaultchecked: "defaultChecked",
	srcobject: "srcObject",
	novalidate: "noValidate",
	allowfullscreen: "allowFullscreen",
	disablepictureinpicture: "disablePictureInPicture",
	disableremoteplayback: "disableRemotePlayback"
};
/**
* @param {string} name
*/
function normalize_attribute(name) {
	var _ATTRIBUTE_ALIASES$na;
	name = name.toLowerCase();
	return (_ATTRIBUTE_ALIASES$na = ATTRIBUTE_ALIASES[name]) !== null && _ATTRIBUTE_ALIASES$na !== void 0 ? _ATTRIBUTE_ALIASES$na : name;
}
[...DOM_BOOLEAN_ATTRIBUTES];
/**
* Subset of delegated events which should be passive by default.
* These two are already passive via browser defaults on window, document and body.
* But since
* - we're delegating them
* - they happen often
* - they apply to mobile which is generally less performant
* we're marking them as passive by default for other elements, too.
*/
var PASSIVE_EVENTS = ["touchstart", "touchmove"];
/**
* Returns `true` if `name` is a passive event
* @param {string} name
*/
function is_passive_event(name) {
	return PASSIVE_EVENTS.includes(name);
}
/** List of elements that require raw contents and should not have SSR comments put in them */
var RAW_TEXT_ELEMENTS = [
	"textarea",
	"script",
	"style",
	"title"
];
/** @param {string} name */
function is_raw_text_element(name) {
	return RAW_TEXT_ELEMENTS.includes(name);
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/elements/events.js
/**
* Used on elements, as a map of event type -> event handler,
* and on events themselves to track which element handled an event
*/
var event_symbol = Symbol("events");
/** @type {Set<string>} */
var all_registered_events = /* @__PURE__ */ new Set();
/** @type {Set<(events: Array<string>) => void>} */
var root_event_handles = /* @__PURE__ */ new Set();
/**
* @param {string} event_name
* @param {EventTarget} dom
* @param {EventListener} [handler]
* @param {AddEventListenerOptions} [options]
*/
function create_event(event_name, dom, handler, options = {}) {
	/**
	* @this {EventTarget}
	*/
	function target_handler(event) {
		if (!options.capture) handle_event_propagation.call(dom, event);
		if (!event.cancelBubble) return without_reactive_context(() => {
			return handler === null || handler === void 0 ? void 0 : handler.call(this, event);
		});
	}
	if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") queue_micro_task(() => {
		dom.addEventListener(event_name, target_handler, options);
	});
	else dom.addEventListener(event_name, target_handler, options);
	return target_handler;
}
/**
* @param {string} event_name
* @param {Element} dom
* @param {EventListener} [handler]
* @param {boolean} [capture]
* @param {boolean} [passive]
* @returns {void}
*/
function event(event_name, dom, handler, capture, passive) {
	var options = {
		capture,
		passive
	};
	var target_handler = create_event(event_name, dom, handler, options);
	if (dom === document.body || dom === window || dom === document || dom instanceof HTMLMediaElement) teardown(() => {
		dom.removeEventListener(event_name, target_handler, options);
	});
}
/**
* @param {string} event_name
* @param {Element} element
* @param {EventListener} [handler]
* @returns {void}
*/
function delegated(event_name, element, handler) {
	var _element$event_symbol;
	((_element$event_symbol = element[event_symbol]) !== null && _element$event_symbol !== void 0 ? _element$event_symbol : element[event_symbol] = {})[event_name] = handler;
}
/**
* @param {Array<string>} events
* @returns {void}
*/
function delegate(events) {
	for (var i = 0; i < events.length; i++) all_registered_events.add(events[i]);
	for (var fn of root_event_handles) fn(events);
}
var last_propagated_event = null;
/**
* @this {EventTarget}
* @param {Event} event
* @returns {void}
*/
function handle_event_propagation(event) {
	var _event$composedPath;
	var handler_element = this;
	var owner_document = handler_element.ownerDocument;
	var event_name = event.type;
	var path = ((_event$composedPath = event.composedPath) === null || _event$composedPath === void 0 ? void 0 : _event$composedPath.call(event)) || [];
	var current_target = path[0] || event.target;
	last_propagated_event = event;
	var path_idx = 0;
	var handled_at = last_propagated_event === event && event[event_symbol];
	if (handled_at) {
		var at_idx = path.indexOf(handled_at);
		if (at_idx !== -1 && (handler_element === document || handler_element === window)) {
			event[event_symbol] = handler_element;
			return;
		}
		var handler_idx = path.indexOf(handler_element);
		if (handler_idx === -1) return;
		if (at_idx <= handler_idx) path_idx = at_idx;
	}
	current_target = path[path_idx] || event.target;
	if (current_target === handler_element) return;
	define_property(event, "currentTarget", {
		configurable: true,
		get() {
			return current_target || owner_document;
		}
	});
	var previous_reaction = active_reaction;
	var previous_effect = active_effect;
	set_active_reaction(null);
	set_active_effect(null);
	try {
		/**
		* @type {unknown}
		*/
		var throw_error;
		/**
		* @type {unknown[]}
		*/
		var other_errors = [];
		while (current_target !== null) {
			/** @type {null | Element} */
			var parent_element = current_target.assignedSlot || current_target.parentNode || current_target.host || null;
			try {
				var _current_target$event;
				var delegated = (_current_target$event = current_target[event_symbol]) === null || _current_target$event === void 0 ? void 0 : _current_target$event[event_name];
				if (delegated != null && (!current_target.disabled || event.target === current_target)) delegated.call(current_target, event);
			} catch (error) {
				if (throw_error) other_errors.push(error);
				else throw_error = error;
			}
			if (event.cancelBubble || parent_element === handler_element || parent_element === null) break;
			current_target = parent_element;
		}
		if (throw_error) {
			for (let error of other_errors) queueMicrotask(() => {
				throw error;
			});
			throw throw_error;
		}
	} finally {
		event[event_symbol] = handler_element;
		delete event.currentTarget;
		set_active_reaction(previous_reaction);
		set_active_effect(previous_effect);
	}
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/reconciler.js
var _globalThis;
var policy = ((_globalThis = globalThis) === null || _globalThis === void 0 || (_globalThis = _globalThis.window) === null || _globalThis === void 0 ? void 0 : _globalThis.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (html) => {
	return html;
} });
/** @param {string} html */
function create_trusted_html(html) {
	var _policy$createHTML;
	return (_policy$createHTML = policy === null || policy === void 0 ? void 0 : policy.createHTML(html)) !== null && _policy$createHTML !== void 0 ? _policy$createHTML : html;
}
/**
* @param {string} html
*/
function create_fragment_from_html(html) {
	var elem = create_element("template");
	elem.innerHTML = create_trusted_html(html.replaceAll("<!>", "<!---->"));
	return elem.content;
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/template.js
/** @import { Effect, EffectNodes, TemplateNode } from '#client' */
/** @import { TemplateStructure } from './types' */
/**
* @param {TemplateNode} start
* @param {TemplateNode | null} end
*/
function assign_nodes(start, end) {
	var effect = active_effect;
	if (effect.nodes === null) effect.nodes = {
		start,
		end,
		a: null,
		t: null
	};
}
/**
* @param {string} content
* @param {number} flags
* @returns {() => Node | Node[]}
*/
/* @__NO_SIDE_EFFECTS__ */
function from_html(content, flags) {
	var is_fragment = (flags & 1) !== 0;
	var use_import_node = (flags & 2) !== 0;
	/** @type {Node} */
	var node;
	/**
	* Whether or not the first item is a text/element node. If not, we need to
	* create an additional comment node to act as `effect.nodes.start`
	*/
	var has_start = !content.startsWith("<!>");
	return () => {
		if (hydrating) {
			assign_nodes(hydrate_node, null);
			return hydrate_node;
		}
		if (node === void 0) {
			node = create_fragment_from_html(has_start ? content : "<!>" + content);
			if (!is_fragment) node = /* @__PURE__ */ get_first_child(node);
		}
		var clone = use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true);
		if (is_fragment) {
			var start = /* @__PURE__ */ get_first_child(clone);
			var end = clone.lastChild;
			assign_nodes(start, end);
		} else assign_nodes(clone, clone);
		return clone;
	};
}
/**
* @param {string} content
* @param {number} flags
* @param {'svg' | 'math'} ns
* @returns {() => Node | Node[]}
*/
/* @__NO_SIDE_EFFECTS__ */
function from_namespace(content, flags, ns = "svg") {
	/**
	* Whether or not the first item is a text/element node. If not, we need to
	* create an additional comment node to act as `effect.nodes.start`
	*/
	var has_start = !content.startsWith("<!>");
	var is_fragment = (flags & 1) !== 0;
	var wrapped = `<${ns}>${has_start ? content : "<!>" + content}</${ns}>`;
	/** @type {Element | DocumentFragment} */
	var node;
	return () => {
		if (hydrating) {
			assign_nodes(hydrate_node, null);
			return hydrate_node;
		}
		if (!node) {
			var root = /* @__PURE__ */ get_first_child(create_fragment_from_html(wrapped));
			if (is_fragment) {
				node = document.createDocumentFragment();
				while (/* @__PURE__ */ get_first_child(root)) node.appendChild(/* @__PURE__ */ get_first_child(root));
			} else node = /* @__PURE__ */ get_first_child(root);
		}
		var clone = node.cloneNode(true);
		if (is_fragment) {
			var start = /* @__PURE__ */ get_first_child(clone);
			var end = clone.lastChild;
			assign_nodes(start, end);
		} else assign_nodes(clone, clone);
		return clone;
	};
}
/**
* @param {string} content
* @param {number} flags
*/
/* @__NO_SIDE_EFFECTS__ */
function from_svg(content, flags) {
	return /* @__PURE__ */ from_namespace(content, flags, "svg");
}
/**
* Don't mark this as side-effect-free, hydration needs to walk all nodes
* @param {any} value
*/
function text(value = "") {
	if (!hydrating) {
		var t = create_text(value + "");
		assign_nodes(t, t);
		return t;
	}
	var node = hydrate_node;
	if (node.nodeType !== 3) {
		node.before(node = create_text());
		set_hydrate_node(node);
	} else merge_text_nodes(node);
	assign_nodes(node, node);
	return node;
}
/**
* @returns {TemplateNode | DocumentFragment}
*/
function comment() {
	if (hydrating) {
		assign_nodes(hydrate_node, null);
		return hydrate_node;
	}
	var frag = document.createDocumentFragment();
	var start = document.createComment("");
	var anchor = create_text();
	frag.append(start, anchor);
	assign_nodes(start, anchor);
	return frag;
}
/**
* Assign the created (or in hydration mode, traversed) dom elements to the current block
* and insert the elements into the dom (in client mode).
* @param {Text | Comment | Element} anchor
* @param {DocumentFragment | Element} dom
*/
function append(anchor, dom) {
	if (hydrating) {
		var effect = active_effect;
		if ((effect.f & 32768) === 0 || effect.nodes.end === null) effect.nodes.end = hydrate_node;
		hydrate_next();
		return;
	}
	if (anchor === null) return;
	anchor.before(dom);
}
/** @param {boolean} value */
function set_should_intro(value) {}
/**
* @param {Element} text
* @param {string} value
* @returns {void}
*/
function set_text(text, value) {
	var _text$__t;
	var str = value == null ? "" : typeof value === "object" ? `${value}` : value;
	if (str !== ((_text$__t = text.__t) !== null && _text$__t !== void 0 ? _text$__t : text.__t = text.nodeValue)) {
		text.__t = str;
		text.nodeValue = `${str}`;
	}
}
/**
* Mounts a component to the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component.
* Transitions will play during the initial render unless the `intro` option is set to `false`.
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
* @param {MountOptions<Props>} options
* @returns {Exports}
*/
function mount(component, options) {
	return _mount(component, options);
}
/**
* Hydrates a component on the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
* @param {{} extends Props ? {
* 		target: Document | Element | ShadowRoot;
* 		props?: Props;
* 		events?: Record<string, (e: any) => any>;
*  	context?: Map<any, any>;
* 		intro?: boolean;
* 		recover?: boolean;
*		transformError?: (error: unknown) => unknown;
* 	} : {
* 		target: Document | Element | ShadowRoot;
* 		props: Props;
* 		events?: Record<string, (e: any) => any>;
*  	context?: Map<any, any>;
* 		intro?: boolean;
* 		recover?: boolean;
*		transformError?: (error: unknown) => unknown;
* 	}} options
* @returns {Exports}
*/
function hydrate(component, options) {
	var _options$intro;
	init_operations();
	options.intro = (_options$intro = options.intro) !== null && _options$intro !== void 0 ? _options$intro : false;
	const target = options.target;
	const was_hydrating = hydrating;
	const previous_hydrate_node = hydrate_node;
	try {
		var anchor = /* @__PURE__ */ get_first_child(target);
		while (anchor && (anchor.nodeType !== 8 || anchor.data !== "[")) anchor = /* @__PURE__ */ get_next_sibling(anchor);
		if (!anchor) throw HYDRATION_ERROR;
		set_hydrating(true);
		set_hydrate_node(anchor);
		const instance = _mount(component, {
			...options,
			anchor
		});
		set_hydrating(false);
		return instance;
	} catch (error) {
		if (error instanceof Error && error.message.split("\n").some((line) => line.startsWith("https://svelte.dev/e/"))) throw error;
		if (error !== HYDRATION_ERROR) console.warn("Failed to hydrate: ", error);
		if (options.recover === false) hydration_failed();
		init_operations();
		clear_text_content(target);
		set_hydrating(false);
		return mount(component, options);
	} finally {
		set_hydrating(was_hydrating);
		set_hydrate_node(previous_hydrate_node);
	}
}
/** @type {Map<EventTarget, Map<string, number>>} */
var listeners = /* @__PURE__ */ new Map();
/**
* @template {Record<string, any>} Exports
* @param {ComponentType<SvelteComponent<any>> | Component<any>} Component
* @param {MountOptions} options
* @returns {Exports}
*/
function _mount(Component, { target, anchor, props = {}, events, context, intro = true, transformError }) {
	init_operations();
	/** @type {Exports} */
	var component = void 0;
	var unmount = component_root(() => {
		var anchor_node = anchor !== null && anchor !== void 0 ? anchor : target.appendChild(create_text());
		boundary(anchor_node, { pending: () => {} }, (anchor_node) => {
			push({});
			var ctx = component_context;
			if (context) ctx.c = context;
			if (events)
 /** @type {any} */ props.$$events = events;
			if (hydrating) assign_nodes(anchor_node, null);
			component = Component(anchor_node, props) || {};
			if (hydrating) {
				/** @type {Effect & { nodes: EffectNodes }} */ active_effect.nodes.end = hydrate_node;
				if (hydrate_node === null || hydrate_node.nodeType !== 8 || hydrate_node.data !== "]") {
					hydration_mismatch();
					throw HYDRATION_ERROR;
				}
			}
			pop();
		}, transformError);
		/** @type {Set<string>} */
		var registered_events = /* @__PURE__ */ new Set();
		/** @param {Array<string>} events */
		var event_handle = (events) => {
			for (var i = 0; i < events.length; i++) {
				var event_name = events[i];
				if (registered_events.has(event_name)) continue;
				registered_events.add(event_name);
				var passive = is_passive_event(event_name);
				for (const node of [target, document]) {
					var counts = listeners.get(node);
					if (counts === void 0) {
						counts = /* @__PURE__ */ new Map();
						listeners.set(node, counts);
					}
					var count = counts.get(event_name);
					if (count === void 0) {
						node.addEventListener(event_name, handle_event_propagation, { passive });
						counts.set(event_name, 1);
					} else counts.set(event_name, count + 1);
				}
			}
		};
		event_handle(array_from(all_registered_events));
		root_event_handles.add(event_handle);
		return () => {
			for (var event_name of registered_events) for (const node of [target, document]) {
				var counts = listeners.get(node);
				var count = counts.get(event_name);
				if (--count == 0) {
					node.removeEventListener(event_name, handle_event_propagation);
					counts.delete(event_name);
					if (counts.size === 0) listeners.delete(node);
				} else counts.set(event_name, count);
			}
			root_event_handles.delete(event_handle);
			if (anchor_node !== anchor) {
				var _anchor_node$parentNo;
				(_anchor_node$parentNo = anchor_node.parentNode) === null || _anchor_node$parentNo === void 0 || _anchor_node$parentNo.removeChild(anchor_node);
			}
		};
	});
	mounted_components.set(component, unmount);
	return component;
}
/**
* References of the components that were mounted or hydrated.
* Uses a `WeakMap` to avoid memory leaks.
*/
var mounted_components = /* @__PURE__ */ new WeakMap();
/**
* Unmounts a component that was previously mounted using `mount` or `hydrate`.
*
* Since 5.13.0, if `options.outro` is `true`, [transitions](https://svelte.dev/docs/svelte/transition) will play before the component is removed from the DOM.
*
* Returns a `Promise` that resolves after transitions have completed if `options.outro` is true, or immediately otherwise (prior to 5.13.0, returns `void`).
*
* ```js
* import { mount, unmount } from 'svelte';
* import App from './App.svelte';
*
* const app = mount(App, { target: document.body });
*
* // later...
* unmount(app, { outro: true });
* ```
* @param {Record<string, any>} component
* @param {{ outro?: boolean }} [options]
* @returns {Promise<void>}
*/
function unmount(component, options) {
	const fn = mounted_components.get(component);
	if (fn) {
		mounted_components.delete(component);
		return fn(options);
	}
	return Promise.resolve();
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/blocks/branches.js
/** @import { Effect, TemplateNode } from '#client' */
var _batches = /* @__PURE__ */ new WeakMap();
var _onscreen = /* @__PURE__ */ new WeakMap();
var _offscreen = /* @__PURE__ */ new WeakMap();
var _outroing = /* @__PURE__ */ new WeakMap();
var _transition = /* @__PURE__ */ new WeakMap();
var _commit = /* @__PURE__ */ new WeakMap();
var _discard = /* @__PURE__ */ new WeakMap();
/**
* @typedef {{ effect: Effect, fragment: DocumentFragment }} Branch
*/
/**
* @template Key
*/
var BranchManager = class {
	/**
	* @param {TemplateNode} anchor
	* @param {boolean} transition
	*/
	constructor(anchor, transition = true) {
		_defineProperty(
			this,
			/** @type {TemplateNode} */
			"anchor",
			void 0
		);
		_classPrivateFieldInitSpec(this, _batches, /* @__PURE__ */ new Map());
		_classPrivateFieldInitSpec(this, _onscreen, /* @__PURE__ */ new Map());
		_classPrivateFieldInitSpec(this, _offscreen, /* @__PURE__ */ new Map());
		_classPrivateFieldInitSpec(this, _outroing, /* @__PURE__ */ new Set());
		_classPrivateFieldInitSpec(this, _transition, true);
		_classPrivateFieldInitSpec(this, _commit, (batch) => {
			if (!_classPrivateFieldGet2(_batches, this).has(batch)) return;
			var key = _classPrivateFieldGet2(_batches, this).get(batch);
			var onscreen = _classPrivateFieldGet2(_onscreen, this).get(key);
			if (onscreen) {
				resume_effect(onscreen);
				_classPrivateFieldGet2(_outroing, this).delete(key);
			} else {
				var offscreen = _classPrivateFieldGet2(_offscreen, this).get(key);
				if (offscreen) {
					_classPrivateFieldGet2(_onscreen, this).set(key, offscreen.effect);
					_classPrivateFieldGet2(_offscreen, this).delete(key);
					/** @type {TemplateNode} */ offscreen.fragment.lastChild.remove();
					this.anchor.before(offscreen.fragment);
					onscreen = offscreen.effect;
				}
			}
			for (const [b, k] of _classPrivateFieldGet2(_batches, this)) {
				_classPrivateFieldGet2(_batches, this).delete(b);
				if (b === batch) break;
				const offscreen = _classPrivateFieldGet2(_offscreen, this).get(k);
				if (offscreen) {
					destroy_effect(offscreen.effect);
					_classPrivateFieldGet2(_offscreen, this).delete(k);
				}
			}
			for (const [k, effect] of _classPrivateFieldGet2(_onscreen, this)) {
				if (k === key || _classPrivateFieldGet2(_outroing, this).has(k)) continue;
				const on_destroy = () => {
					if (Array.from(_classPrivateFieldGet2(_batches, this).values()).includes(k)) {
						var fragment = document.createDocumentFragment();
						move_effect(effect, fragment);
						fragment.append(create_text());
						_classPrivateFieldGet2(_offscreen, this).set(k, {
							effect,
							fragment
						});
					} else destroy_effect(effect);
					_classPrivateFieldGet2(_outroing, this).delete(k);
					_classPrivateFieldGet2(_onscreen, this).delete(k);
				};
				if (_classPrivateFieldGet2(_transition, this) || !onscreen) {
					_classPrivateFieldGet2(_outroing, this).add(k);
					pause_effect(effect, on_destroy, false);
				} else on_destroy();
			}
		});
		_classPrivateFieldInitSpec(this, _discard, (batch) => {
			_classPrivateFieldGet2(_batches, this).delete(batch);
			const keys = Array.from(_classPrivateFieldGet2(_batches, this).values());
			for (const [k, branch] of _classPrivateFieldGet2(_offscreen, this)) if (!keys.includes(k)) {
				destroy_effect(branch.effect);
				_classPrivateFieldGet2(_offscreen, this).delete(k);
			}
		});
		this.anchor = anchor;
		_classPrivateFieldSet2(_transition, this, transition);
	}
	/**
	*
	* @param {any} key
	* @param {null | ((target: TemplateNode) => void)} fn
	*/
	ensure(key, fn) {
		var batch = current_batch;
		var defer = should_defer_append();
		if (fn && !_classPrivateFieldGet2(_onscreen, this).has(key) && !_classPrivateFieldGet2(_offscreen, this).has(key)) if (defer) {
			var fragment = document.createDocumentFragment();
			var target = create_text();
			fragment.append(target);
			_classPrivateFieldGet2(_offscreen, this).set(key, {
				effect: branch(() => fn(target)),
				fragment
			});
		} else _classPrivateFieldGet2(_onscreen, this).set(key, branch(() => fn(this.anchor)));
		_classPrivateFieldGet2(_batches, this).set(batch, key);
		if (defer) {
			for (const [k, effect] of _classPrivateFieldGet2(_onscreen, this)) if (k === key) batch.unskip_effect(effect);
			else batch.skip_effect(effect);
			for (const [k, branch] of _classPrivateFieldGet2(_offscreen, this)) if (k === key) batch.unskip_effect(branch.effect);
			else batch.skip_effect(branch.effect);
			batch.oncommit(_classPrivateFieldGet2(_commit, this));
			batch.ondiscard(_classPrivateFieldGet2(_discard, this));
		} else {
			if (hydrating) this.anchor = hydrate_node;
			_classPrivateFieldGet2(_commit, this).call(this, batch);
		}
	}
};
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/blocks/if.js
/** @import { TemplateNode } from '#client' */
/**
* @param {TemplateNode} node
* @param {(branch: (fn: (anchor: Node) => void, key?: number | false) => void) => void} fn
* @param {boolean} [elseif] True if this is an `{:else if ...}` block rather than an `{#if ...}`, as that affects which transitions are considered 'local'
* @returns {void}
*/
function if_block(node, fn, elseif = false) {
	/** @type {TemplateNode | undefined} */
	var marker;
	if (hydrating) {
		marker = hydrate_node;
		hydrate_next();
	}
	var branches = new BranchManager(node);
	var flags = elseif ? EFFECT_TRANSPARENT : 0;
	/**
	* @param {number | false} key
	* @param {null | ((anchor: Node) => void)} fn
	*/
	function update_branch(key, fn) {
		if (hydrating) {
			var data = read_hydration_instruction(marker);
			if (key !== parseInt(data.substring(1))) {
				var anchor = skip_nodes();
				set_hydrate_node(anchor);
				branches.anchor = anchor;
				set_hydrating(false);
				branches.ensure(key, fn);
				set_hydrating(true);
				return;
			}
		}
		branches.ensure(key, fn);
	}
	block(() => {
		var has_branch = false;
		fn((fn, key = 0) => {
			has_branch = true;
			update_branch(key, fn);
		});
		if (!has_branch) update_branch(-1, null);
	}, flags);
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/blocks/each.js
/** @import { EachItem, EachOutroGroup, EachState, Effect, EffectNodes, MaybeSource, Source, TemplateNode, TransitionManager, Value } from '#client' */
/** @import { Batch } from '../../reactivity/batch.js'; */
/**
* @param {any} _
* @param {number} i
*/
function index(_, i) {
	return i;
}
/**
* Pause multiple effects simultaneously, and coordinate their
* subsequent destruction. Used in each blocks
* @param {EachState} state
* @param {Effect[]} to_destroy
* @param {null | Node} controlled_anchor
*/
function pause_effects(state, to_destroy, controlled_anchor) {
	/** @type {TransitionManager[]} */
	var transitions = [];
	var length = to_destroy.length;
	/** @type {EachOutroGroup} */
	var group;
	var remaining = to_destroy.length;
	for (var i = 0; i < length; i++) {
		let effect = to_destroy[i];
		pause_effect(effect, () => {
			if (group) {
				group.pending.delete(effect);
				group.done.add(effect);
				if (group.pending.size === 0) {
					var groups = state.outrogroups;
					destroy_effects(state, array_from(group.done));
					groups.delete(group);
					if (groups.size === 0) state.outrogroups = null;
				}
			} else remaining -= 1;
		}, false);
	}
	if (remaining === 0) {
		var fast_path = transitions.length === 0 && controlled_anchor !== null;
		if (fast_path) {
			var anchor = controlled_anchor;
			var parent_node = anchor.parentNode;
			clear_text_content(parent_node);
			parent_node.append(anchor);
			state.items.clear();
		}
		destroy_effects(state, to_destroy, !fast_path);
	} else {
		var _state$outrogroups;
		group = {
			pending: new Set(to_destroy),
			done: /* @__PURE__ */ new Set()
		};
		((_state$outrogroups = state.outrogroups) !== null && _state$outrogroups !== void 0 ? _state$outrogroups : state.outrogroups = /* @__PURE__ */ new Set()).add(group);
	}
}
/**
* @param {EachState} state
* @param {Effect[]} to_destroy
* @param {boolean} remove_dom
*/
function destroy_effects(state, to_destroy, remove_dom = true) {
	/** @type {Set<Effect> | undefined} */
	var preserved_effects;
	if (state.pending.size > 0) {
		preserved_effects = /* @__PURE__ */ new Set();
		for (const keys of state.pending.values()) for (const key of keys) preserved_effects.add(
			/** @type {EachItem} */
			state.items.get(key).e
		);
	}
	for (var i = 0; i < to_destroy.length; i++) {
		var e = to_destroy[i];
		if (preserved_effects === null || preserved_effects === void 0 ? void 0 : preserved_effects.has(e)) {
			e.f |= EFFECT_OFFSCREEN;
			move_effect(e, document.createDocumentFragment());
		} else destroy_effect(to_destroy[i], remove_dom);
	}
}
/** @type {TemplateNode} */
var offscreen_anchor;
/**
* @template V
* @param {Element | Comment} node The next sibling node, or the parent node if this is a 'controlled' block
* @param {number} flags
* @param {() => V[]} get_collection
* @param {(value: V, index: number) => any} get_key
* @param {(anchor: Node, item: MaybeSource<V>, index: MaybeSource<number>) => void} render_fn
* @param {null | ((anchor: Node) => void)} fallback_fn
* @returns {void}
*/
function each(node, flags, get_collection, get_key, render_fn, fallback_fn = null) {
	var anchor = node;
	/** @type {Map<any, EachItem>} */
	var items = /* @__PURE__ */ new Map();
	if ((flags & 4) !== 0) {
		var parent_node = node;
		anchor = hydrating ? set_hydrate_node(/* @__PURE__ */ get_first_child(parent_node)) : parent_node.appendChild(create_text());
	}
	if (hydrating) hydrate_next();
	/** @type {Effect | null} */
	var fallback = null;
	var each_array = /* @__PURE__ */ derived_safe_equal(() => {
		var collection = get_collection();
		return is_array(collection) ? collection : collection == null ? [] : array_from(collection);
	});
	/** @type {V[]} */
	var array;
	/** @type {Map<Batch, Set<any>>} */
	var pending = /* @__PURE__ */ new Map();
	var first_run = true;
	/**
	* @param {Batch} batch
	*/
	function commit(batch) {
		if ((state.effect.f & 16384) !== 0) return;
		state.pending.delete(batch);
		state.fallback = fallback;
		reconcile(state, array, anchor, flags, get_key);
		if (fallback !== null) if (array.length === 0) if ((fallback.f & 33554432) === 0) resume_effect(fallback);
		else {
			fallback.f ^= EFFECT_OFFSCREEN;
			move(fallback, null, anchor);
		}
		else pause_effect(fallback, () => {
			fallback = null;
		});
	}
	/**
	* @param {Batch} batch
	*/
	function discard(batch) {
		state.pending.delete(batch);
	}
	/** @type {EachState} */
	var state = {
		effect: block(() => {
			array = get(each_array);
			var length = array.length;
			/** `true` if there was a hydration mismatch. Needs to be a `let` or else it isn't treeshaken out */
			let mismatch = false;
			if (hydrating) {
				if (read_hydration_instruction(anchor) === "[!" !== (length === 0)) {
					anchor = skip_nodes();
					set_hydrate_node(anchor);
					set_hydrating(false);
					mismatch = true;
				}
			}
			var keys = /* @__PURE__ */ new Set();
			var batch = current_batch;
			var defer = should_defer_append();
			for (var index = 0; index < length; index += 1) {
				if (hydrating && hydrate_node.nodeType === 8 && hydrate_node.data === "]") {
					anchor = hydrate_node;
					mismatch = true;
					set_hydrating(false);
				}
				var value = array[index];
				var key = get_key(value, index);
				var item = first_run ? null : items.get(key);
				if (item) {
					if (item.v) internal_set(item.v, value);
					if (item.i) internal_set(item.i, index);
					if (defer) batch.unskip_effect(item.e);
				} else {
					var _offscreen_anchor;
					item = create_item(items, first_run ? anchor : (_offscreen_anchor = offscreen_anchor) !== null && _offscreen_anchor !== void 0 ? _offscreen_anchor : offscreen_anchor = create_text(), value, key, index, render_fn, flags, get_collection);
					if (!first_run) item.e.f |= EFFECT_OFFSCREEN;
					items.set(key, item);
				}
				keys.add(key);
			}
			if (length === 0 && fallback_fn && !fallback) if (first_run) fallback = branch(() => fallback_fn(anchor));
			else {
				fallback = branch(() => {
					var _offscreen_anchor2;
					return fallback_fn((_offscreen_anchor2 = offscreen_anchor) !== null && _offscreen_anchor2 !== void 0 ? _offscreen_anchor2 : offscreen_anchor = create_text());
				});
				fallback.f |= EFFECT_OFFSCREEN;
			}
			if (length > keys.size) each_key_duplicate("", "", "");
			if (hydrating && length > 0) set_hydrate_node(skip_nodes());
			if (!first_run) {
				pending.set(batch, keys);
				if (defer) {
					for (const [key, item] of items) if (!keys.has(key)) batch.skip_effect(item.e);
					batch.oncommit(commit);
					batch.ondiscard(discard);
				} else commit(batch);
			}
			if (mismatch) set_hydrating(true);
			get(each_array);
		}),
		flags,
		items,
		pending,
		outrogroups: null,
		fallback
	};
	first_run = false;
	if (hydrating) anchor = hydrate_node;
}
/**
* Skip past any non-branch effects (which could be created with `createSubscriber`, for example) to find the next branch effect
* @param {Effect | null} effect
* @returns {Effect | null}
*/
function skip_to_branch(effect) {
	while (effect !== null && (effect.f & 32) === 0) effect = effect.next;
	return effect;
}
/**
* Add, remove, or reorder items output by an each block as its input changes
* @template V
* @param {EachState} state
* @param {Array<V>} array
* @param {Element | Comment | Text} anchor
* @param {number} flags
* @param {(value: V, index: number) => any} get_key
* @returns {void}
*/
function reconcile(state, array, anchor, flags, get_key) {
	var is_animated = (flags & 8) !== 0;
	var length = array.length;
	var items = state.items;
	var current = skip_to_branch(state.effect.first);
	/** @type {undefined | Set<Effect>} */
	var seen;
	/** @type {Effect | null} */
	var prev = null;
	/** @type {undefined | Set<Effect>} */
	var to_animate;
	/** @type {Effect[]} */
	var matched = [];
	/** @type {Effect[]} */
	var stashed = [];
	/** @type {V} */
	var value;
	/** @type {any} */
	var key;
	/** @type {Effect | undefined} */
	var effect;
	/** @type {number} */
	var i;
	if (is_animated) for (i = 0; i < length; i += 1) {
		value = array[i];
		key = get_key(value, i);
		effect = items.get(key).e;
		if ((effect.f & 33554432) === 0) {
			var _effect$nodes, _to_animate;
			(_effect$nodes = effect.nodes) === null || _effect$nodes === void 0 || (_effect$nodes = _effect$nodes.a) === null || _effect$nodes === void 0 || _effect$nodes.measure();
			((_to_animate = to_animate) !== null && _to_animate !== void 0 ? _to_animate : to_animate = /* @__PURE__ */ new Set()).add(effect);
		}
	}
	for (i = 0; i < length; i += 1) {
		value = array[i];
		key = get_key(value, i);
		effect = items.get(key).e;
		if (state.outrogroups !== null) for (const group of state.outrogroups) {
			group.pending.delete(effect);
			group.done.delete(effect);
		}
		if ((effect.f & 8192) !== 0) {
			resume_effect(effect);
			if (is_animated) {
				var _effect$nodes2, _to_animate2;
				(_effect$nodes2 = effect.nodes) === null || _effect$nodes2 === void 0 || (_effect$nodes2 = _effect$nodes2.a) === null || _effect$nodes2 === void 0 || _effect$nodes2.unfix();
				((_to_animate2 = to_animate) !== null && _to_animate2 !== void 0 ? _to_animate2 : to_animate = /* @__PURE__ */ new Set()).delete(effect);
			}
		}
		if ((effect.f & 33554432) !== 0) {
			effect.f ^= EFFECT_OFFSCREEN;
			if (effect === current) move(effect, null, anchor);
			else {
				var next = prev ? prev.next : current;
				if (effect === state.effect.last) state.effect.last = effect.prev;
				if (effect.prev) effect.prev.next = effect.next;
				if (effect.next) effect.next.prev = effect.prev;
				link(state, prev, effect);
				link(state, effect, next);
				move(effect, next, anchor);
				prev = effect;
				matched = [];
				stashed = [];
				current = skip_to_branch(prev.next);
				continue;
			}
		}
		if (effect !== current) {
			if (seen !== void 0 && seen.has(effect)) {
				if (matched.length < stashed.length) {
					var start = stashed[0];
					var j;
					prev = start.prev;
					var a = matched[0];
					var b = matched[matched.length - 1];
					for (j = 0; j < matched.length; j += 1) move(matched[j], start, anchor);
					for (j = 0; j < stashed.length; j += 1) seen.delete(stashed[j]);
					link(state, a.prev, b.next);
					link(state, prev, a);
					link(state, b, start);
					current = start;
					prev = b;
					i -= 1;
					matched = [];
					stashed = [];
				} else {
					seen.delete(effect);
					move(effect, current, anchor);
					link(state, effect.prev, effect.next);
					link(state, effect, prev === null ? state.effect.first : prev.next);
					link(state, prev, effect);
					prev = effect;
				}
				continue;
			}
			matched = [];
			stashed = [];
			while (current !== null && current !== effect) {
				var _seen;
				((_seen = seen) !== null && _seen !== void 0 ? _seen : seen = /* @__PURE__ */ new Set()).add(current);
				stashed.push(current);
				current = skip_to_branch(current.next);
			}
			if (current === null) continue;
		}
		if ((effect.f & 33554432) === 0) matched.push(effect);
		prev = effect;
		current = skip_to_branch(effect.next);
	}
	if (state.outrogroups !== null) {
		for (const group of state.outrogroups) if (group.pending.size === 0) {
			var _state$outrogroups2;
			destroy_effects(state, array_from(group.done));
			(_state$outrogroups2 = state.outrogroups) === null || _state$outrogroups2 === void 0 || _state$outrogroups2.delete(group);
		}
		if (state.outrogroups.size === 0) state.outrogroups = null;
	}
	if (current !== null || seen !== void 0) {
		/** @type {Effect[]} */
		var to_destroy = [];
		if (seen !== void 0) {
			for (effect of seen) if ((effect.f & 8192) === 0) to_destroy.push(effect);
		}
		while (current !== null) {
			if ((current.f & 8192) === 0 && current !== state.fallback) to_destroy.push(current);
			current = skip_to_branch(current.next);
		}
		var destroy_length = to_destroy.length;
		if (destroy_length > 0) {
			var controlled_anchor = (flags & 4) !== 0 && length === 0 ? anchor : null;
			if (is_animated) {
				for (i = 0; i < destroy_length; i += 1) {
					var _to_destroy$i$nodes;
					(_to_destroy$i$nodes = to_destroy[i].nodes) === null || _to_destroy$i$nodes === void 0 || (_to_destroy$i$nodes = _to_destroy$i$nodes.a) === null || _to_destroy$i$nodes === void 0 || _to_destroy$i$nodes.measure();
				}
				for (i = 0; i < destroy_length; i += 1) {
					var _to_destroy$i$nodes2;
					(_to_destroy$i$nodes2 = to_destroy[i].nodes) === null || _to_destroy$i$nodes2 === void 0 || (_to_destroy$i$nodes2 = _to_destroy$i$nodes2.a) === null || _to_destroy$i$nodes2 === void 0 || _to_destroy$i$nodes2.fix();
				}
			}
			pause_effects(state, to_destroy, controlled_anchor);
		}
	}
	if (is_animated) queue_micro_task(() => {
		if (to_animate === void 0) return;
		for (effect of to_animate) {
			var _effect$nodes3;
			(_effect$nodes3 = effect.nodes) === null || _effect$nodes3 === void 0 || (_effect$nodes3 = _effect$nodes3.a) === null || _effect$nodes3 === void 0 || _effect$nodes3.apply();
		}
	});
}
/**
* @template V
* @param {Map<any, EachItem>} items
* @param {Node} anchor
* @param {V} value
* @param {unknown} key
* @param {number} index
* @param {(anchor: Node, item: V | Source<V>, index: number | Value<number>, collection: () => V[]) => void} render_fn
* @param {number} flags
* @param {() => V[]} get_collection
* @returns {EachItem}
*/
function create_item(items, anchor, value, key, index, render_fn, flags, get_collection) {
	var v = (flags & 1) !== 0 ? (flags & 16) === 0 ? /* @__PURE__ */ mutable_source(value, false, false) : source(value) : null;
	var i = (flags & 2) !== 0 ? source(index) : null;
	return {
		v,
		i,
		e: branch(() => {
			render_fn(anchor, v !== null && v !== void 0 ? v : value, i !== null && i !== void 0 ? i : index, get_collection);
			return () => {
				items.delete(key);
			};
		})
	};
}
/**
* @param {Effect} effect
* @param {Effect | null} next
* @param {Text | Element | Comment} anchor
*/
function move(effect, next, anchor) {
	if (!effect.nodes) return;
	var node = effect.nodes.start;
	var end = effect.nodes.end;
	var dest = next && (next.f & 33554432) === 0 ? next.nodes.start : anchor;
	while (node !== null) {
		var next_node = /* @__PURE__ */ get_next_sibling(node);
		dest.before(node);
		if (node === end) return;
		node = next_node;
	}
}
/**
* @param {EachState} state
* @param {Effect | null} prev
* @param {Effect | null} next
*/
function link(state, prev, next) {
	if (prev === null) state.effect.first = next;
	else prev.next = next;
	if (next === null) state.effect.last = prev;
	else next.prev = prev;
}
/**
* @param {Element | Text | Comment} node
* @param {() => string | TrustedHTML} get_value
* @param {boolean} [is_controlled]
* @param {boolean} [svg]
* @param {boolean} [mathml]
* @param {boolean} [skip_warning]
* @returns {void}
*/
function html(node, get_value, is_controlled = false, svg = false, mathml = false, skip_warning = false) {
	var anchor = node;
	/** @type {string | TrustedHTML} */
	var value = "";
	if (is_controlled) {
		var parent_node = node;
		if (hydrating) anchor = set_hydrate_node(/* @__PURE__ */ get_first_child(parent_node));
	}
	template_effect(() => {
		var _get_value;
		var effect = active_effect;
		if (value === (value = (_get_value = get_value()) !== null && _get_value !== void 0 ? _get_value : "")) {
			if (hydrating) hydrate_next();
			return;
		}
		if (is_controlled && !hydrating) {
			effect.nodes = null;
			parent_node.innerHTML = value;
			if (value !== "") assign_nodes(/* @__PURE__ */ get_first_child(parent_node), parent_node.lastChild);
			return;
		}
		if (effect.nodes !== null) {
			remove_effect_dom(effect.nodes.start, effect.nodes.end);
			effect.nodes = null;
		}
		if (value === "") return;
		if (hydrating) {
			hydrate_node.data;
			/** @type {TemplateNode | null} */
			var next = hydrate_next();
			var last = next;
			while (next !== null && (next.nodeType !== 8 || next.data !== "")) {
				last = next;
				next = /* @__PURE__ */ get_next_sibling(next);
			}
			if (next === null) {
				hydration_mismatch();
				throw HYDRATION_ERROR;
			}
			assign_nodes(hydrate_node, last);
			anchor = set_hydrate_node(next);
			return;
		}
		var wrapper = create_element(svg ? "svg" : mathml ? "math" : "template", svg ? NAMESPACE_SVG : mathml ? NAMESPACE_MATHML : void 0);
		wrapper.innerHTML = value;
		/** @type {DocumentFragment | Element} */
		var node = svg || mathml ? wrapper : 		/** @type {HTMLTemplateElement} */ wrapper.content;
		assign_nodes(/* @__PURE__ */ get_first_child(node), node.lastChild);
		if (svg || mathml) while (/* @__PURE__ */ get_first_child(node)) anchor.before(/* @__PURE__ */ get_first_child(node));
		else anchor.before(node);
	});
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/blocks/slot.js
/**
* @param {Comment} anchor
* @param {Record<string, any>} $$props
* @param {string} name
* @param {Record<string, unknown>} slot_props
* @param {null | ((anchor: Comment) => void)} fallback_fn
*/
function slot(anchor, $$props, name, slot_props, fallback_fn) {
	var _$$props$$$slots;
	if (hydrating) hydrate_next();
	var slot_fn = (_$$props$$$slots = $$props.$$slots) === null || _$$props$$$slots === void 0 ? void 0 : _$$props$$$slots[name];
	var is_interop = false;
	if (slot_fn === true) {
		slot_fn = $$props[name === "default" ? "children" : name];
		is_interop = true;
	}
	if (slot_fn === void 0) {
		if (fallback_fn !== null) fallback_fn(anchor);
	} else slot_fn(anchor, is_interop ? () => slot_props : slot_props);
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/blocks/snippet.js
/** @import { Snippet } from 'svelte' */
/** @import { TemplateNode } from '#client' */
/** @import { Getters } from '#shared' */
/**
* @template {(node: TemplateNode, ...args: any[]) => void} SnippetFn
* @param {TemplateNode} node
* @param {() => SnippetFn | null | undefined} get_snippet
* @param {(() => any)[]} args
* @returns {void}
*/
function snippet(node, get_snippet, ...args) {
	var branches = new BranchManager(node);
	block(() => {
		var _get_snippet;
		const snippet = (_get_snippet = get_snippet()) !== null && _get_snippet !== void 0 ? _get_snippet : null;
		branches.ensure(snippet, snippet && ((anchor) => snippet(anchor, ...args)));
	}, EFFECT_TRANSPARENT);
}
/**
* Create a snippet programmatically
* @template {unknown[]} Params
* @param {(...params: Getters<Params>) => {
*   render: () => string
*   setup?: (element: Element) => void | (() => void)
* }} fn
* @returns {Snippet<Params>}
*/
function createRawSnippet(fn) {
	return (anchor, ...params) => {
		var _snippet$setup;
		var snippet = fn(...params);
		/** @type {Element} */
		var element;
		if (hydrating) {
			element = hydrate_node;
			hydrate_next();
		} else {
			element = /* @__PURE__ */ get_first_child(create_fragment_from_html(snippet.render().trim()));
			anchor.before(element);
		}
		const result = (_snippet$setup = snippet.setup) === null || _snippet$setup === void 0 ? void 0 : _snippet$setup.call(snippet, element);
		assign_nodes(element, element);
		if (typeof result === "function") teardown(result);
	};
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
/** @import { TemplateNode, Dom } from '#client' */
/**
* @template P
* @template {(props: P) => void} C
* @param {TemplateNode} node
* @param {() => C} get_component
* @param {(anchor: TemplateNode, component: C) => Dom | void} render_fn
* @returns {void}
*/
function component(node, get_component, render_fn) {
	/** @type {TemplateNode | undefined} */
	var hydration_start_node;
	if (hydrating) {
		hydration_start_node = hydrate_node;
		hydrate_next();
	}
	var branches = new BranchManager(node);
	block(() => {
		var _get_component;
		var component = (_get_component = get_component()) !== null && _get_component !== void 0 ? _get_component : null;
		if (hydrating) {
			if (read_hydration_instruction(hydration_start_node) === "[" !== (component !== null)) {
				var anchor = skip_nodes();
				set_hydrate_node(anchor);
				branches.anchor = anchor;
				set_hydrating(false);
				branches.ensure(component, component && ((target) => render_fn(target, component)));
				set_hydrating(true);
				return;
			}
		}
		branches.ensure(component, component && ((target) => render_fn(target, component)));
	}, EFFECT_TRANSPARENT);
}
/** @param {Effect | null} v */
function set_animation_effect_override(v) {}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/blocks/svelte-element.js
/** @import { Effect, EffectNodes, TemplateNode } from '#client' */
/**
* @param {Comment | Element} node
* @param {() => string} get_tag
* @param {boolean} is_svg
* @param {undefined | ((element: Element, anchor: Node | null) => void)} render_fn,
* @param {undefined | (() => string)} get_namespace
* @param {undefined | [number, number]} location
* @returns {void}
*/
function element(node, get_tag, is_svg, render_fn, get_namespace, location) {
	let was_hydrating = hydrating;
	if (hydrating) hydrate_next();
	/** @type {null | Element} */
	var element = null;
	if (hydrating && hydrate_node.nodeType === 1) {
		element = hydrate_node;
		hydrate_next();
	}
	var anchor = hydrating ? hydrate_node : node;
	/**
	* We track this so we can set it when changing the element, allowing any
	* `animate:` directive to bind itself to the correct block
	*/
	var parent_effect = active_effect;
	var branches = new BranchManager(anchor, false);
	block(() => {
		const next_tag = get_tag() || null;
		var ns = get_namespace ? get_namespace() : is_svg || next_tag === "svg" ? NAMESPACE_SVG : void 0;
		if (next_tag === null) {
			branches.ensure(null, null);
			set_should_intro(true);
			return;
		}
		branches.ensure(next_tag, (anchor) => {
			if (next_tag) {
				element = hydrating ? element : create_element(next_tag, ns);
				assign_nodes(element, element);
				if (render_fn) {
					if (hydrating && is_raw_text_element(next_tag)) element.append(document.createComment(""));
					var child_anchor = hydrating ? /* @__PURE__ */ get_first_child(element) : element.appendChild(create_text());
					if (hydrating) if (child_anchor === null) set_hydrating(false);
					else set_hydrate_node(child_anchor);
					set_animation_effect_override(parent_effect);
					render_fn(element, child_anchor);
					set_animation_effect_override(null);
				}
				/** @type {Effect & { nodes: EffectNodes }} */ active_effect.nodes.end = element;
				anchor.before(element);
			}
			if (hydrating) set_hydrate_node(anchor);
		});
		set_should_intro(true);
		return () => {
			if (next_tag) set_should_intro(false);
		};
	}, EFFECT_TRANSPARENT);
	teardown(() => {
		set_should_intro(true);
	});
	if (was_hydrating) {
		set_hydrating(true);
		set_hydrate_node(anchor);
	}
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/blocks/svelte-head.js
/** @import { TemplateNode } from '#client' */
/**
* @param {string} hash
* @param {(anchor: Node) => void} render_fn
* @returns {void}
*/
function head(hash, render_fn) {
	let previous_hydrate_node = null;
	let was_hydrating = hydrating;
	/** @type {Comment | Text} */
	var anchor;
	if (hydrating) {
		previous_hydrate_node = hydrate_node;
		var head_anchor = /* @__PURE__ */ get_first_child(document.head);
		while (head_anchor !== null && (head_anchor.nodeType !== 8 || head_anchor.data !== hash)) head_anchor = /* @__PURE__ */ get_next_sibling(head_anchor);
		if (head_anchor === null) set_hydrating(false);
		else {
			var start = /* @__PURE__ */ get_next_sibling(head_anchor);
			head_anchor.remove();
			set_hydrate_node(start);
		}
	}
	if (!hydrating) anchor = document.head.appendChild(create_text());
	try {
		block(() => render_fn(anchor), HEAD_EFFECT | EFFECT_PRESERVED);
	} finally {
		if (was_hydrating) {
			set_hydrating(true);
			set_hydrate_node(previous_hydrate_node);
		}
	}
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/elements/attachments.js
/** @import { Effect } from '#client' */
/**
* @param {Element} node
* @param {() => (node: Element) => void} get_fn
*/
function attach(node, get_fn) {
	/** @type {false | undefined | ((node: Element) => void)} */
	var fn = void 0;
	/** @type {Effect | null} */
	var e;
	managed(() => {
		if (fn !== (fn = get_fn())) {
			if (e) {
				destroy_effect(e);
				e = null;
			}
			if (fn) e = branch(() => {
				effect(() => fn(node));
			});
		}
	});
}
//#endregion
//#region ../node_modules/clsx/dist/clsx.mjs
function r(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx$1() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
	return n;
}
//#endregion
//#region ../node_modules/svelte/src/internal/shared/attributes.js
/**
* Small wrapper around clsx to preserve Svelte's (weird) handling of falsy values.
* TODO Svelte 6 revisit this, and likely turn all falsy values into the empty string (what clsx also does)
* @param  {any} value
*/
function clsx(value) {
	if (typeof value === "object") return clsx$1(value);
	else return value !== null && value !== void 0 ? value : "";
}
var whitespace = [..." 	\n\r\f\xA0\v﻿"];
/**
* @param {any} value
* @param {string | null} [hash]
* @param {Record<string, boolean>} [directives]
* @returns {string | null}
*/
function to_class(value, hash, directives) {
	var classname = value == null ? "" : "" + value;
	if (hash) classname = classname ? classname + " " + hash : hash;
	if (directives) {
		for (var key of Object.keys(directives)) if (directives[key]) classname = classname ? classname + " " + key : key;
		else if (classname.length) {
			var len = key.length;
			var a = 0;
			while ((a = classname.indexOf(key, a)) >= 0) {
				var b = a + len;
				if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
				else a = b;
			}
		}
	}
	return classname === "" ? null : classname;
}
/**
*
* @param {Record<string,any>} styles
* @param {boolean} important
*/
function append_styles(styles, important = false) {
	var separator = important ? " !important;" : ";";
	var css = "";
	for (var key of Object.keys(styles)) {
		var value = styles[key];
		if (value != null && value !== "") css += " " + key + ": " + value + separator;
	}
	return css;
}
/**
* @param {string} name
* @returns {string}
*/
function to_css_name(name) {
	if (name[0] !== "-" || name[1] !== "-") return name.toLowerCase();
	return name;
}
/**
* @param {any} value
* @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [styles]
* @returns {string | null}
*/
function to_style(value, styles) {
	if (styles) {
		var new_style = "";
		/** @type {Record<string,any> | undefined} */
		var normal_styles;
		/** @type {Record<string,any> | undefined} */
		var important_styles;
		if (Array.isArray(styles)) {
			normal_styles = styles[0];
			important_styles = styles[1];
		} else normal_styles = styles;
		if (value) {
			value = String(value).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			/** @type {boolean | '"' | "'"} */
			var in_str = false;
			var in_apo = 0;
			var in_comment = false;
			var reserved_names = [];
			if (normal_styles) reserved_names.push(...Object.keys(normal_styles).map(to_css_name));
			if (important_styles) reserved_names.push(...Object.keys(important_styles).map(to_css_name));
			var start_index = 0;
			var name_index = -1;
			const len = value.length;
			for (var i = 0; i < len; i++) {
				var c = value[i];
				if (in_comment) {
					if (c === "/" && value[i - 1] === "*") in_comment = false;
				} else if (in_str) {
					if (in_str === c) in_str = false;
				} else if (c === "/" && value[i + 1] === "*") in_comment = true;
				else if (c === "\"" || c === "'") in_str = c;
				else if (c === "(") in_apo++;
				else if (c === ")") in_apo--;
				if (!in_comment && in_str === false && in_apo === 0) {
					if (c === ":" && name_index === -1) name_index = i;
					else if (c === ";" || i === len - 1) {
						if (name_index !== -1) {
							var name = to_css_name(value.substring(start_index, name_index).trim());
							if (!reserved_names.includes(name)) {
								if (c !== ";") i++;
								var property = value.substring(start_index, i).trim();
								new_style += " " + property + ";";
							}
						}
						start_index = i + 1;
						name_index = -1;
					}
				}
			}
		}
		if (normal_styles) new_style += append_styles(normal_styles);
		if (important_styles) new_style += append_styles(important_styles, true);
		new_style = new_style.trim();
		return new_style === "" ? null : new_style;
	}
	return value == null ? null : String(value);
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/elements/class.js
/**
* @param {Element} dom
* @param {boolean | number} is_html
* @param {string | null} value
* @param {string} [hash]
* @param {Record<string, any>} [prev_classes]
* @param {Record<string, any>} [next_classes]
* @returns {Record<string, boolean> | undefined}
*/
function set_class(dom, is_html, value, hash, prev_classes, next_classes) {
	var prev = dom.__className;
	if (hydrating || prev !== value || prev === void 0) {
		var next_class_name = to_class(value, hash, next_classes);
		if (!hydrating || next_class_name !== dom.getAttribute("class")) if (next_class_name == null) dom.removeAttribute("class");
		else if (is_html) dom.className = next_class_name;
		else dom.setAttribute("class", next_class_name);
		dom.__className = value;
	} else if (next_classes && prev_classes !== next_classes) for (var key in next_classes) {
		var is_present = !!next_classes[key];
		if (prev_classes == null || is_present !== !!prev_classes[key]) dom.classList.toggle(key, is_present);
	}
	return next_classes;
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/elements/style.js
/**
* @param {Element & ElementCSSInlineStyle} dom
* @param {Record<string, any>} prev
* @param {Record<string, any>} next
* @param {string} [priority]
*/
function update_styles(dom, prev = {}, next, priority) {
	for (var key in next) {
		var value = next[key];
		if (prev[key] !== value) if (next[key] == null) dom.style.removeProperty(key);
		else dom.style.setProperty(key, value, priority);
	}
}
/**
* @param {Element & ElementCSSInlineStyle} dom
* @param {string | null} value
* @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [prev_styles]
* @param {Record<string, any> | [Record<string, any>, Record<string, any>]} [next_styles]
*/
function set_style(dom, value, prev_styles, next_styles) {
	var prev = dom.__style;
	if (hydrating || prev !== value) {
		var next_style_attr = to_style(value, next_styles);
		if (!hydrating || next_style_attr !== dom.getAttribute("style")) if (next_style_attr == null) dom.removeAttribute("style");
		else dom.style.cssText = next_style_attr;
		dom.__style = value;
	} else if (next_styles) if (Array.isArray(next_styles)) {
		update_styles(dom, prev_styles === null || prev_styles === void 0 ? void 0 : prev_styles[0], next_styles[0]);
		update_styles(dom, prev_styles === null || prev_styles === void 0 ? void 0 : prev_styles[1], next_styles[1], "important");
	} else update_styles(dom, prev_styles, next_styles);
	return next_styles;
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
/**
* Selects the correct option(s) (depending on whether this is a multiple select)
* @template V
* @param {HTMLSelectElement} select
* @param {V} value
* @param {boolean} mounting
*/
function select_option(select, value, mounting = false) {
	if (select.multiple) {
		if (value == void 0) return;
		if (!is_array(value)) return select_multiple_invalid_value();
		for (var option of select.options) option.selected = value.includes(get_option_value(option));
		return;
	}
	for (option of select.options) if (is(get_option_value(option), value)) {
		option.selected = true;
		return;
	}
	if (!mounting || value !== void 0) select.selectedIndex = -1;
}
/**
* Selects the correct option(s) if `value` is given,
* and then sets up a mutation observer to sync the
* current selection to the dom when it changes. Such
* changes could for example occur when options are
* inside an `#each` block.
* @param {HTMLSelectElement} select
*/
function init_select(select) {
	var observer = new MutationObserver(() => {
		select_option(select, select.__value);
	});
	observer.observe(select, {
		childList: true,
		subtree: true,
		attributes: true,
		attributeFilter: ["value"]
	});
	teardown(() => {
		observer.disconnect();
	});
}
/**
* @param {HTMLSelectElement} select
* @param {() => unknown} get
* @param {(value: unknown) => void} set
* @returns {void}
*/
function bind_select_value(select, get, set = get) {
	var batches = /* @__PURE__ */ new WeakSet();
	var mounting = true;
	listen_to_event_and_reset_event(select, "change", (is_reset) => {
		var query = is_reset ? "[selected]" : ":checked";
		/** @type {unknown} */
		var value;
		if (select.multiple) value = [].map.call(select.querySelectorAll(query), get_option_value);
		else {
			var _select$querySelector;
			/** @type {HTMLOptionElement | null} */
			var selected_option = (_select$querySelector = select.querySelector(query)) !== null && _select$querySelector !== void 0 ? _select$querySelector : select.querySelector("option:not([disabled])");
			value = selected_option && get_option_value(selected_option);
		}
		set(value);
		select.__value = value;
		if (current_batch !== null) batches.add(current_batch);
	});
	effect(() => {
		var value = get();
		if (select === document.activeElement) {
			var batch = async_mode_flag ? previous_batch : current_batch;
			if (batches.has(batch)) return;
		}
		select_option(select, value, mounting);
		if (mounting && value === void 0) {
			/** @type {HTMLOptionElement | null} */
			var selected_option = select.querySelector(":checked");
			if (selected_option !== null) {
				value = get_option_value(selected_option);
				set(value);
			}
		}
		select.__value = value;
		mounting = false;
	});
	init_select(select);
}
/** @param {HTMLOptionElement} option */
function get_option_value(option) {
	if ("__value" in option) return option.__value;
	else return option.value;
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/elements/attributes.js
/** @import { Blocker, Effect } from '#client' */
var CLASS = Symbol("class");
var STYLE = Symbol("style");
var IS_CUSTOM_ELEMENT = Symbol("is custom element");
var IS_HTML = Symbol("is html");
var LINK_TAG = IS_XHTML ? "link" : "LINK";
var INPUT_TAG = IS_XHTML ? "input" : "INPUT";
var OPTION_TAG = IS_XHTML ? "option" : "OPTION";
var SELECT_TAG = IS_XHTML ? "select" : "SELECT";
/**
* The value/checked attribute in the template actually corresponds to the defaultValue property, so we need
* to remove it upon hydration to avoid a bug when someone resets the form value.
* @param {HTMLInputElement} input
* @returns {void}
*/
function remove_input_defaults(input) {
	if (!hydrating) return;
	var already_removed = false;
	var remove_defaults = () => {
		if (already_removed) return;
		already_removed = true;
		if (input.hasAttribute("value")) {
			var value = input.value;
			set_attribute(input, "value", null);
			input.value = value;
		}
		if (input.hasAttribute("checked")) {
			var checked = input.checked;
			set_attribute(input, "checked", null);
			input.checked = checked;
		}
	};
	input.__on_r = remove_defaults;
	queue_micro_task(remove_defaults);
	add_form_reset_listener();
}
/**
* Sets the `selected` attribute on an `option` element.
* Not set through the property because that doesn't reflect to the DOM,
* which means it wouldn't be taken into account when a form is reset.
* @param {HTMLOptionElement} element
* @param {boolean} selected
*/
function set_selected(element, selected) {
	if (selected) {
		if (!element.hasAttribute("selected")) element.setAttribute("selected", "");
	} else element.removeAttribute("selected");
}
/**
* @param {Element} element
* @param {string} attribute
* @param {string | null} value
* @param {boolean} [skip_warning]
*/
function set_attribute(element, attribute, value, skip_warning) {
	var attributes = get_attributes(element);
	if (hydrating) {
		attributes[attribute] = element.getAttribute(attribute);
		if (attribute === "src" || attribute === "srcset" || attribute === "href" && element.nodeName === LINK_TAG) {
			if (!skip_warning) check_src_in_dev_hydration(element, attribute, value !== null && value !== void 0 ? value : "");
			return;
		}
	}
	if (attributes[attribute] === (attributes[attribute] = value)) return;
	if (attribute === "loading") element[LOADING_ATTR_SYMBOL] = value;
	if (value == null) element.removeAttribute(attribute);
	else if (typeof value !== "string" && get_setters(element).includes(attribute)) element[attribute] = value;
	else element.setAttribute(attribute, value);
}
/**
* Spreads attributes onto a DOM element, taking into account the currently set attributes
* @param {Element & ElementCSSInlineStyle} element
* @param {Record<string | symbol, any> | undefined} prev
* @param {Record<string | symbol, any>} next New attributes - this function mutates this object
* @param {string} [css_hash]
* @param {boolean} [should_remove_defaults]
* @param {boolean} [skip_warning]
* @returns {Record<string, any>}
*/
function set_attributes(element, prev, next, css_hash, should_remove_defaults = false, skip_warning = false) {
	if (hydrating && should_remove_defaults && element.nodeName === INPUT_TAG) {
		var input = element;
		if (!((input.type === "checkbox" ? "defaultChecked" : "defaultValue") in next)) remove_input_defaults(input);
	}
	var attributes = get_attributes(element);
	var is_custom_element = attributes[IS_CUSTOM_ELEMENT];
	var preserve_attribute_case = !attributes[IS_HTML];
	let is_hydrating_custom_element = hydrating && is_custom_element;
	if (is_hydrating_custom_element) set_hydrating(false);
	var current = prev || {};
	var is_option_element = element.nodeName === OPTION_TAG;
	for (var key in prev) if (!(key in next)) next[key] = null;
	if (next.class) next.class = clsx(next.class);
	else if (css_hash || next[CLASS]) next.class = null;
	if (next[STYLE]) {
		var _next$style;
		(_next$style = next.style) !== null && _next$style !== void 0 || (next.style = null);
	}
	var setters = get_setters(element);
	for (const key in next) {
		let value = next[key];
		if (is_option_element && key === "value" && value == null) {
			element.value = element.__value = "";
			current[key] = value;
			continue;
		}
		if (key === "class") {
			set_class(element, element.namespaceURI === "http://www.w3.org/1999/xhtml", value, css_hash, prev === null || prev === void 0 ? void 0 : prev[CLASS], next[CLASS]);
			current[key] = value;
			current[CLASS] = next[CLASS];
			continue;
		}
		if (key === "style") {
			set_style(element, value, prev === null || prev === void 0 ? void 0 : prev[STYLE], next[STYLE]);
			current[key] = value;
			current[STYLE] = next[STYLE];
			continue;
		}
		var prev_value = current[key];
		if (value === prev_value && !(value === void 0 && element.hasAttribute(key))) continue;
		current[key] = value;
		var prefix = key[0] + key[1];
		if (prefix === "$$") continue;
		if (prefix === "on") {
			/** @type {{ capture?: true }} */
			const opts = {};
			const event_handle_key = "$$" + key;
			let event_name = key.slice(2);
			var is_delegated = can_delegate_event(event_name);
			if (is_capture_event(event_name)) {
				event_name = event_name.slice(0, -7);
				opts.capture = true;
			}
			if (!is_delegated && prev_value) {
				if (value != null) continue;
				element.removeEventListener(event_name, current[event_handle_key], opts);
				current[event_handle_key] = null;
			}
			if (is_delegated) {
				delegated(event_name, element, value);
				delegate([event_name]);
			} else if (value != null) {
				/**
				* @this {any}
				* @param {Event} evt
				*/
				function handle(evt) {
					current[key].call(this, evt);
				}
				current[event_handle_key] = create_event(event_name, element, handle, opts);
			}
		} else if (key === "style") set_attribute(element, key, value);
		else if (key === "autofocus") autofocus(element, Boolean(value));
		else if (!is_custom_element && (key === "__value" || key === "value" && value != null)) element.value = element.__value = value;
		else if (key === "selected" && is_option_element) set_selected(element, value);
		else {
			var name = key;
			if (!preserve_attribute_case) name = normalize_attribute(name);
			var is_default = name === "defaultValue" || name === "defaultChecked";
			if (value == null && !is_custom_element && !is_default) {
				attributes[key] = null;
				if (name === "value" || name === "checked") {
					let input = element;
					const use_default = prev === void 0;
					if (name === "value") {
						let previous = input.defaultValue;
						input.removeAttribute(name);
						input.defaultValue = previous;
						input.value = input.__value = use_default ? previous : null;
					} else {
						let previous = input.defaultChecked;
						input.removeAttribute(name);
						input.defaultChecked = previous;
						input.checked = use_default ? previous : false;
					}
				} else element.removeAttribute(key);
			} else if (is_default || setters.includes(name) && (is_custom_element || typeof value !== "string")) {
				element[name] = value;
				if (name in attributes) attributes[name] = UNINITIALIZED;
			} else if (typeof value !== "function") set_attribute(element, name, value, skip_warning);
		}
	}
	if (is_hydrating_custom_element) set_hydrating(true);
	return current;
}
/**
* @param {Element & ElementCSSInlineStyle} element
* @param {(...expressions: any) => Record<string | symbol, any>} fn
* @param {Array<() => any>} sync
* @param {Array<() => Promise<any>>} async
* @param {Blocker[]} blockers
* @param {string} [css_hash]
* @param {boolean} [should_remove_defaults]
* @param {boolean} [skip_warning]
*/
function attribute_effect(element, fn, sync = [], async = [], blockers = [], css_hash, should_remove_defaults = false, skip_warning = false) {
	flatten(blockers, sync, async, (values) => {
		/** @type {Record<string | symbol, any> | undefined} */
		var prev = void 0;
		/** @type {Record<symbol, Effect>} */
		var effects = {};
		var is_select = element.nodeName === SELECT_TAG;
		var inited = false;
		managed(() => {
			var next = fn(...values.map(get));
			/** @type {Record<string | symbol, any>} */
			var current = set_attributes(element, prev, next, css_hash, should_remove_defaults, skip_warning);
			if (inited && is_select && "value" in next) select_option(element, next.value);
			for (let symbol of Object.getOwnPropertySymbols(effects)) if (!next[symbol]) destroy_effect(effects[symbol]);
			for (let symbol of Object.getOwnPropertySymbols(next)) {
				var n = next[symbol];
				if (symbol.description === "@attach" && (!prev || n !== prev[symbol])) {
					if (effects[symbol]) destroy_effect(effects[symbol]);
					effects[symbol] = branch(() => attach(element, () => n));
				}
				current[symbol] = n;
			}
			prev = current;
		});
		if (is_select) {
			var select = element;
			effect(() => {
				select_option(
					select,
					/** @type {Record<string | symbol, any>} */
					prev.value,
					true
				);
				init_select(select);
			});
		}
		inited = true;
	});
}
/**
*
* @param {Element} element
*/
function get_attributes(element) {
	var _element$__attributes;
	return (_element$__attributes = element.__attributes) !== null && _element$__attributes !== void 0 ? _element$__attributes : element.__attributes = {
		[IS_CUSTOM_ELEMENT]: element.nodeName.includes("-"),
		[IS_HTML]: element.namespaceURI === NAMESPACE_HTML
	};
}
/** @type {Map<string, string[]>} */
var setters_cache = /* @__PURE__ */ new Map();
/** @param {Element} element */
function get_setters(element) {
	var cache_key = element.getAttribute("is") || element.nodeName;
	var setters = setters_cache.get(cache_key);
	if (setters) return setters;
	setters_cache.set(cache_key, setters = []);
	var descriptors;
	var proto = element;
	var element_proto = Element.prototype;
	while (element_proto !== proto) {
		descriptors = get_descriptors(proto);
		for (var key in descriptors) if (descriptors[key].set) setters.push(key);
		proto = get_prototype_of(proto);
	}
	return setters;
}
/**
* @param {any} element
* @param {string} attribute
* @param {string} value
*/
function check_src_in_dev_hydration(element, attribute, value) {}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
/** @import { Batch } from '../../../reactivity/batch.js' */
/**
* @param {HTMLInputElement} input
* @param {() => unknown} get
* @param {(value: unknown) => void} set
* @returns {void}
*/
function bind_value(input, get, set = get) {
	var batches = /* @__PURE__ */ new WeakSet();
	listen_to_event_and_reset_event(input, "input", async (is_reset) => {
		/** @type {any} */
		var value = is_reset ? input.defaultValue : input.value;
		value = is_numberlike_input(input) ? to_number(value) : value;
		set(value);
		if (current_batch !== null) batches.add(current_batch);
		await tick();
		if (value !== (value = get())) {
			var __value2;
			var start = input.selectionStart;
			var end = input.selectionEnd;
			var length = input.value.length;
			input.value = (__value2 = value) !== null && __value2 !== void 0 ? __value2 : "";
			if (end !== null) {
				var new_length = input.value.length;
				if (start === end && end === length && new_length > length) {
					input.selectionStart = new_length;
					input.selectionEnd = new_length;
				} else {
					input.selectionStart = start;
					input.selectionEnd = Math.min(end, new_length);
				}
			}
		}
	});
	if (hydrating && input.defaultValue !== input.value || untrack(get) == null && input.value) {
		set(is_numberlike_input(input) ? to_number(input.value) : input.value);
		if (current_batch !== null) batches.add(current_batch);
	}
	render_effect(() => {
		var value = get();
		if (input === document.activeElement) {
			var batch = async_mode_flag ? previous_batch : current_batch;
			if (batches.has(batch)) return;
		}
		if (is_numberlike_input(input) && value === to_number(input.value)) return;
		if (input.type === "date" && !value && !input.value) return;
		if (value !== input.value) input.value = value !== null && value !== void 0 ? value : "";
	});
}
/**
* @param {HTMLInputElement} input
*/
function is_numberlike_input(input) {
	var type = input.type;
	return type === "number" || type === "range";
}
/**
* @param {string} value
*/
function to_number(value) {
	return value === "" ? null : +value;
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/elements/bindings/size.js
var _ResizeObserverSingleton;
var _listeners = /* @__PURE__ */ new WeakMap();
var _observer = /* @__PURE__ */ new WeakMap();
var _options = /* @__PURE__ */ new WeakMap();
var _ResizeObserverSingleton_brand = /* @__PURE__ */ new WeakSet();
/**
* We create one listener for all elements
* @see {@link https://groups.google.com/a/chromium.org/g/blink-dev/c/z6ienONUb5A/m/F5-VcUZtBAAJ Explanation}
*/
var ResizeObserverSingleton = class {
	/** @param {ResizeObserverOptions} options */
	constructor(options) {
		_classPrivateMethodInitSpec(this, _ResizeObserverSingleton_brand);
		_classPrivateFieldInitSpec(this, _listeners, /* @__PURE__ */ new WeakMap());
		_classPrivateFieldInitSpec(this, _observer, void 0);
		_classPrivateFieldInitSpec(this, _options, void 0);
		_classPrivateFieldSet2(_options, this, options);
	}
	/**
	* @param {Element} element
	* @param {(entry: ResizeObserverEntry) => any} listener
	*/
	observe(element, listener) {
		var listeners = _classPrivateFieldGet2(_listeners, this).get(element) || /* @__PURE__ */ new Set();
		listeners.add(listener);
		_classPrivateFieldGet2(_listeners, this).set(element, listeners);
		_assertClassBrand(_ResizeObserverSingleton_brand, this, _getObserver).call(this).observe(element, _classPrivateFieldGet2(_options, this));
		return () => {
			var listeners = _classPrivateFieldGet2(_listeners, this).get(element);
			listeners.delete(listener);
			if (listeners.size === 0) {
				_classPrivateFieldGet2(_listeners, this).delete(element);
				/** @type {ResizeObserver} */ _classPrivateFieldGet2(_observer, this).unobserve(element);
			}
		};
	}
};
_ResizeObserverSingleton = ResizeObserverSingleton;
function _getObserver() {
	var _this$observer;
	return (_this$observer = _classPrivateFieldGet2(_observer, this)) !== null && _this$observer !== void 0 ? _this$observer : _classPrivateFieldSet2(_observer, this, new ResizeObserver(
		/** @param {any} entries */
		(entries) => {
			for (var entry of entries) {
				_ResizeObserverSingleton.entries.set(entry.target, entry);
				for (var listener of _classPrivateFieldGet2(_listeners, this).get(entry.target) || []) listener(entry);
			}
		}
	));
}
_defineProperty(ResizeObserverSingleton, "entries", /* @__PURE__ */ new WeakMap());
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
/** @import { ComponentContext, Effect } from '#client' */
/**
* @param {any} bound_value
* @param {Element} element_or_component
* @returns {boolean}
*/
function is_bound_this(bound_value, element_or_component) {
	return bound_value === element_or_component || (bound_value === null || bound_value === void 0 ? void 0 : bound_value[STATE_SYMBOL]) === element_or_component;
}
/**
* @param {any} element_or_component
* @param {(value: unknown, ...parts: unknown[]) => void} update
* @param {(...parts: unknown[]) => unknown} get_value
* @param {() => unknown[]} [get_parts] Set if the this binding is used inside an each block,
* 										returns all the parts of the each block context that are used in the expression
* @returns {void}
*/
function bind_this(element_or_component = {}, update, get_value, get_parts) {
	var component_effect = component_context.r;
	var parent = active_effect;
	effect(() => {
		/** @type {unknown[]} */
		var old_parts;
		/** @type {unknown[]} */
		var parts;
		render_effect(() => {
			old_parts = parts;
			parts = (get_parts === null || get_parts === void 0 ? void 0 : get_parts()) || [];
			untrack(() => {
				if (element_or_component !== get_value(...parts)) {
					update(element_or_component, ...parts);
					if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) update(null, ...old_parts);
				}
			});
		});
		return () => {
			let p = parent;
			while (p !== component_effect && p.parent !== null && p.parent.f & 33554432) p = p.parent;
			const teardown = () => {
				if (parts && is_bound_this(get_value(...parts), element_or_component)) update(null, ...parts);
			};
			const original_teardown = p.teardown;
			p.teardown = () => {
				teardown();
				original_teardown === null || original_teardown === void 0 || original_teardown();
			};
		};
	});
	return element_or_component;
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/dom/legacy/lifecycle.js
/** @import { ComponentContextLegacy } from '#client' */
/**
* Legacy-mode only: Call `onMount` callbacks and set up `beforeUpdate`/`afterUpdate` effects
* @param {boolean} [immutable]
*/
function init(immutable = false) {
	const context = component_context;
	const callbacks = context.l.u;
	if (!callbacks) return;
	let props = () => deep_read_state(context.s);
	if (immutable) {
		let version = 0;
		let prev = {};
		const d = /* @__PURE__ */ derived(() => {
			let changed = false;
			const props = context.s;
			for (const key in props) if (props[key] !== prev[key]) {
				prev[key] = props[key];
				changed = true;
			}
			if (changed) version++;
			return version;
		});
		props = () => get(d);
	}
	if (callbacks.b.length) user_pre_effect(() => {
		observe_all(context, props);
		run_all(callbacks.b);
	});
	user_effect(() => {
		const fns = untrack(() => callbacks.m.map(run));
		return () => {
			for (const fn of fns) if (typeof fn === "function") fn();
		};
	});
	if (callbacks.a.length) user_effect(() => {
		observe_all(context, props);
		run_all(callbacks.a);
	});
}
/**
* Invoke the getter of all signals associated with a component
* so they can be registered to the effect this function is called in.
* @param {ComponentContextLegacy} context
* @param {(() => void)} props
*/
function observe_all(context, props) {
	if (context.l.s) for (const signal of context.l.s) get(signal);
	props();
}
//#endregion
//#region ../node_modules/svelte/src/internal/client/reactivity/props.js
/** @import { Effect, Source } from './types.js' */
/**
* The proxy handler for rest props (i.e. `const { x, ...rest } = $props()`).
* Is passed the full `$$props` object and excludes the named props.
* @type {ProxyHandler<{ props: Record<string | symbol, unknown>, exclude: Array<string | symbol>, name?: string }>}}
*/
var rest_props_handler = {
	get(target, key) {
		if (target.exclude.includes(key)) return;
		return target.props[key];
	},
	set(target, key) {
		return false;
	},
	getOwnPropertyDescriptor(target, key) {
		if (target.exclude.includes(key)) return;
		if (key in target.props) return {
			enumerable: true,
			configurable: true,
			value: target.props[key]
		};
	},
	has(target, key) {
		if (target.exclude.includes(key)) return false;
		return key in target.props;
	},
	ownKeys(target) {
		return Reflect.ownKeys(target.props).filter((key) => !target.exclude.includes(key));
	}
};
/**
* @param {Record<string, unknown>} props
* @param {string[]} exclude
* @param {string} [name]
* @returns {Record<string, unknown>}
*/
/* @__NO_SIDE_EFFECTS__ */
function rest_props(props, exclude, name) {
	return new Proxy({
		props,
		exclude
	}, rest_props_handler);
}
/**
* The proxy handler for legacy $$restProps and $$props
* @type {ProxyHandler<{ props: Record<string | symbol, unknown>, exclude: Array<string | symbol>, special: Record<string | symbol, (v?: unknown) => unknown>, version: Source<number>, parent_effect: Effect }>}}
*/
var legacy_rest_props_handler = {
	get(target, key) {
		if (target.exclude.includes(key)) return;
		get(target.version);
		return key in target.special ? target.special[key]() : target.props[key];
	},
	set(target, key, value) {
		if (!(key in target.special)) {
			var previous_effect = active_effect;
			try {
				set_active_effect(target.parent_effect);
				/** @type {Record<string, (v?: unknown) => unknown>} */
				target.special[key] = prop({ get [key]() {
					return target.props[key];
				} }, key, 4);
			} finally {
				set_active_effect(previous_effect);
			}
		}
		target.special[key](value);
		update(target.version);
		return true;
	},
	getOwnPropertyDescriptor(target, key) {
		if (target.exclude.includes(key)) return;
		if (key in target.props) return {
			enumerable: true,
			configurable: true,
			value: target.props[key]
		};
	},
	deleteProperty(target, key) {
		if (target.exclude.includes(key)) return true;
		target.exclude.push(key);
		update(target.version);
		return true;
	},
	has(target, key) {
		if (target.exclude.includes(key)) return false;
		return key in target.props;
	},
	ownKeys(target) {
		return Reflect.ownKeys(target.props).filter((key) => !target.exclude.includes(key));
	}
};
/**
* @param {Record<string, unknown>} props
* @param {string[]} exclude
* @returns {Record<string, unknown>}
*/
function legacy_rest_props(props, exclude) {
	return new Proxy({
		props,
		exclude,
		special: {},
		version: source(0),
		parent_effect: active_effect
	}, legacy_rest_props_handler);
}
/**
* The proxy handler for spread props. Handles the incoming array of props
* that looks like `() => { dynamic: props }, { static: prop }, ..` and wraps
* them so that the whole thing is passed to the component as the `$$props` argument.
* @type {ProxyHandler<{ props: Array<Record<string | symbol, unknown> | (() => Record<string | symbol, unknown>)> }>}}
*/
var spread_props_handler = {
	get(target, key) {
		let i = target.props.length;
		while (i--) {
			let p = target.props[i];
			if (is_function(p)) p = p();
			if (typeof p === "object" && p !== null && key in p) return p[key];
		}
	},
	set(target, key, value) {
		let i = target.props.length;
		while (i--) {
			let p = target.props[i];
			if (is_function(p)) p = p();
			const desc = get_descriptor(p, key);
			if (desc && desc.set) {
				desc.set(value);
				return true;
			}
		}
		return false;
	},
	getOwnPropertyDescriptor(target, key) {
		let i = target.props.length;
		while (i--) {
			let p = target.props[i];
			if (is_function(p)) p = p();
			if (typeof p === "object" && p !== null && key in p) {
				const descriptor = get_descriptor(p, key);
				if (descriptor && !descriptor.configurable) descriptor.configurable = true;
				return descriptor;
			}
		}
	},
	has(target, key) {
		if (key === STATE_SYMBOL || key === LEGACY_PROPS) return false;
		for (let p of target.props) {
			if (is_function(p)) p = p();
			if (p != null && key in p) return true;
		}
		return false;
	},
	ownKeys(target) {
		/** @type {Array<string | symbol>} */
		const keys = [];
		for (let p of target.props) {
			if (is_function(p)) p = p();
			if (!p) continue;
			for (const key in p) if (!keys.includes(key)) keys.push(key);
			for (const key of Object.getOwnPropertySymbols(p)) if (!keys.includes(key)) keys.push(key);
		}
		return keys;
	}
};
/**
* @param {Array<Record<string, unknown> | (() => Record<string, unknown>)>} props
* @returns {any}
*/
function spread_props(...props) {
	return new Proxy({ props }, spread_props_handler);
}
/**
* This function is responsible for synchronizing a possibly bound prop with the inner component state.
* It is used whenever the compiler sees that the component writes to the prop, or when it has a default prop_value.
* @template V
* @param {Record<string, unknown>} props
* @param {string} key
* @param {number} flags
* @param {V | (() => V)} [fallback]
* @returns {(() => V | ((arg: V) => V) | ((arg: V, mutation: boolean) => V))}
*/
function prop(props, key, flags, fallback) {
	var runes = !legacy_mode_flag || (flags & 2) !== 0;
	var bindable = (flags & 8) !== 0;
	var lazy = (flags & 16) !== 0;
	var fallback_value = fallback;
	var fallback_dirty = true;
	var get_fallback = () => {
		if (fallback_dirty) {
			fallback_dirty = false;
			fallback_value = lazy ? untrack(fallback) : fallback;
		}
		return fallback_value;
	};
	/** @type {((v: V) => void) | undefined} */
	let setter;
	if (bindable) {
		var _get_descriptor$set, _get_descriptor;
		var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
		setter = (_get_descriptor$set = (_get_descriptor = get_descriptor(props, key)) === null || _get_descriptor === void 0 ? void 0 : _get_descriptor.set) !== null && _get_descriptor$set !== void 0 ? _get_descriptor$set : is_entry_props && key in props ? (v) => props[key] = v : void 0;
	}
	/** @type {V} */
	var initial_value;
	var is_store_sub = false;
	if (bindable) [initial_value, is_store_sub] = capture_store_binding(() => props[key]);
	else initial_value = props[key];
	if (initial_value === void 0 && fallback !== void 0) {
		initial_value = get_fallback();
		if (setter) {
			if (runes) props_invalid_value(key);
			setter(initial_value);
		}
	}
	/** @type {() => V} */
	var getter;
	if (runes) getter = () => {
		var value = props[key];
		if (value === void 0) return get_fallback();
		fallback_dirty = true;
		return value;
	};
	else getter = () => {
		var value = props[key];
		if (value !== void 0) fallback_value = void 0;
		return value === void 0 ? fallback_value : value;
	};
	if (runes && (flags & 4) === 0) return getter;
	if (setter) {
		var legacy_parent = props.$$legacy;
		return (function(value, mutation) {
			if (arguments.length > 0) {
				if (!runes || !mutation || legacy_parent || is_store_sub)
 /** @type {Function} */ setter(mutation ? getter() : value);
				return value;
			}
			return getter();
		});
	}
	var overridden = false;
	var d = ((flags & 1) !== 0 ? derived : derived_safe_equal)(() => {
		overridden = false;
		return getter();
	});
	if (bindable) get(d);
	var parent_effect = active_effect;
	return (function(value, mutation) {
		if (arguments.length > 0) {
			const new_value = mutation ? get(d) : runes && bindable ? proxy(value) : value;
			set(d, new_value);
			overridden = true;
			if (fallback_value !== void 0) fallback_value = new_value;
			return value;
		}
		if (is_destroying_effect && overridden || (parent_effect.f & 16384) !== 0) return d.v;
		return get(d);
	});
}
/**
* Takes the component function and returns a Svelte 4 compatible component constructor.
*
* @deprecated Use this only as a temporary solution to migrate your imperative component code to Svelte 5.
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @template {Record<string, any>} Events
* @template {Record<string, any>} Slots
*
* @param {SvelteComponent<Props, Events, Slots> | Component<Props>} component
* @returns {ComponentType<SvelteComponent<Props, Events, Slots> & Exports>}
*/
function asClassComponent(component) {
	return class extends Svelte4Component {
		/** @param {any} options */
		constructor(options) {
			super({
				component,
				...options
			});
		}
	};
}
var _events = /* @__PURE__ */ new WeakMap();
var _instance = /* @__PURE__ */ new WeakMap();
/**
* Support using the component as both a class and function during the transition period
* @typedef  {{new (o: ComponentConstructorOptions): SvelteComponent;(...args: Parameters<Component<Record<string, any>>>): ReturnType<Component<Record<string, any>, Record<string, any>>>;}} LegacyComponentType
*/
var Svelte4Component = class {
	/**
	* @param {ComponentConstructorOptions & {
	*  component: any;
	* }} options
	*/
	constructor(options) {
		var _options$intro, _options$props;
		_classPrivateFieldInitSpec(this, _events, void 0);
		_classPrivateFieldInitSpec(this, _instance, void 0);
		var sources = /* @__PURE__ */ new Map();
		/**
		* @param {string | symbol} key
		* @param {unknown} value
		*/
		var add_source = (key, value) => {
			var s = /* @__PURE__ */ mutable_source(value, false, false);
			sources.set(key, s);
			return s;
		};
		const props = new Proxy({
			...options.props || {},
			$$events: {}
		}, {
			get(target, prop) {
				var _sources$get;
				return get((_sources$get = sources.get(prop)) !== null && _sources$get !== void 0 ? _sources$get : add_source(prop, Reflect.get(target, prop)));
			},
			has(target, prop) {
				var _sources$get2;
				if (prop === LEGACY_PROPS) return true;
				get((_sources$get2 = sources.get(prop)) !== null && _sources$get2 !== void 0 ? _sources$get2 : add_source(prop, Reflect.get(target, prop)));
				return Reflect.has(target, prop);
			},
			set(target, prop, value) {
				var _sources$get3;
				set((_sources$get3 = sources.get(prop)) !== null && _sources$get3 !== void 0 ? _sources$get3 : add_source(prop, value), value);
				return Reflect.set(target, prop, value);
			}
		});
		_classPrivateFieldSet2(_instance, this, (options.hydrate ? hydrate : mount)(options.component, {
			target: options.target,
			anchor: options.anchor,
			props,
			context: options.context,
			intro: (_options$intro = options.intro) !== null && _options$intro !== void 0 ? _options$intro : false,
			recover: options.recover,
			transformError: options.transformError
		}));
		if (!async_mode_flag && (!(options === null || options === void 0 || (_options$props = options.props) === null || _options$props === void 0 ? void 0 : _options$props.$$host) || options.sync === false)) flushSync();
		_classPrivateFieldSet2(_events, this, props.$$events);
		for (const key of Object.keys(_classPrivateFieldGet2(_instance, this))) {
			if (key === "$set" || key === "$destroy" || key === "$on") continue;
			define_property(this, key, {
				get() {
					return _classPrivateFieldGet2(_instance, this)[key];
				},
				set(value) {
					_classPrivateFieldGet2(_instance, this)[key] = value;
				},
				enumerable: true
			});
		}
		_classPrivateFieldGet2(_instance, this).$set = (next) => {
			Object.assign(props, next);
		};
		_classPrivateFieldGet2(_instance, this).$destroy = () => {
			unmount(_classPrivateFieldGet2(_instance, this));
		};
	}
	/** @param {Record<string, any>} props */
	$set(props) {
		_classPrivateFieldGet2(_instance, this).$set(props);
	}
	/**
	* @param {string} event
	* @param {(...args: any[]) => any} callback
	* @returns {any}
	*/
	$on(event, callback) {
		_classPrivateFieldGet2(_events, this)[event] = _classPrivateFieldGet2(_events, this)[event] || [];
		/** @param {any[]} args */
		const cb = (...args) => callback.call(this, ...args);
		_classPrivateFieldGet2(_events, this)[event].push(cb);
		return () => {
			_classPrivateFieldGet2(_events, this)[event] = _classPrivateFieldGet2(_events, this)[event].filter(
				/** @param {any} fn */
				(fn) => fn !== cb
			);
		};
	}
	$destroy() {
		_classPrivateFieldGet2(_instance, this).$destroy();
	}
};
if (typeof HTMLElement === "function");
//#endregion
//#region ../node_modules/svelte/src/internal/client/hydratable.js
/**
* @template T
* @param {string} key
* @param {() => T} fn
* @returns {T}
*/
function hydratable(key, fn) {
	if (!async_mode_flag) experimental_async_required("hydratable");
	if (hydrating) {
		var _window$__svelte;
		const store = (_window$__svelte = window.__svelte) === null || _window$__svelte === void 0 ? void 0 : _window$__svelte.h;
		if (store === null || store === void 0 ? void 0 : store.has(key)) return store.get(key);
		hydratable_missing_but_expected(key);
	}
	return fn();
}
//#endregion
//#region ../node_modules/svelte/src/index-client.js
/** @import { ComponentContext, ComponentContextLegacy } from '#client' */
/** @import { EventDispatcher } from './index.js' */
/** @import { NotFunction } from './internal/types.js' */
var index_client_exports = /* @__PURE__ */ __exportAll({
	afterUpdate: () => afterUpdate,
	beforeUpdate: () => beforeUpdate,
	createContext: () => createContext,
	createEventDispatcher: () => createEventDispatcher,
	createRawSnippet: () => createRawSnippet,
	flushSync: () => flushSync,
	fork: () => fork,
	getAbortSignal: () => getAbortSignal,
	getAllContexts: () => getAllContexts,
	getContext: () => getContext,
	hasContext: () => hasContext,
	hydratable: () => hydratable,
	hydrate: () => hydrate,
	mount: () => mount,
	onDestroy: () => onDestroy,
	onMount: () => onMount,
	setContext: () => setContext,
	settled: () => settled,
	tick: () => tick,
	unmount: () => unmount,
	untrack: () => untrack
});
/**
* Returns an [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) that aborts when the current [derived](https://svelte.dev/docs/svelte/$derived) or [effect](https://svelte.dev/docs/svelte/$effect) re-runs or is destroyed.
*
* Must be called while a derived or effect is running.
*
* ```svelte
* <script>
* 	import { getAbortSignal } from 'svelte';
*
* 	let { id } = $props();
*
* 	async function getData(id) {
* 		const response = await fetch(`/items/${id}`, {
* 			signal: getAbortSignal()
* 		});
*
* 		return await response.json();
* 	}
*
* 	const data = $derived(await getData(id));
* <\/script>
* ```
*/
function getAbortSignal() {
	var _active_reaction$ac;
	if (active_reaction === null) get_abort_signal_outside_reaction();
	return ((_active_reaction$ac = active_reaction.ac) !== null && _active_reaction$ac !== void 0 ? _active_reaction$ac : active_reaction.ac = new AbortController()).signal;
}
/**
* `onMount`, like [`$effect`](https://svelte.dev/docs/svelte/$effect), schedules a function to run as soon as the component has been mounted to the DOM.
* Unlike `$effect`, the provided function only runs once.
*
* It must be called during the component's initialisation (but doesn't need to live _inside_ the component;
* it can be called from an external module). If a function is returned _synchronously_ from `onMount`,
* it will be called when the component is unmounted.
*
* `onMount` functions do not run during [server-side rendering](https://svelte.dev/docs/svelte/svelte-server#render).
*
* @template T
* @param {() => NotFunction<T> | Promise<NotFunction<T>> | (() => any)} fn
* @returns {void}
*/
function onMount(fn) {
	if (component_context === null) lifecycle_outside_component("onMount");
	if (legacy_mode_flag && component_context.l !== null) init_update_callbacks(component_context).m.push(fn);
	else user_effect(() => {
		const cleanup = untrack(fn);
		if (typeof cleanup === "function") return cleanup;
	});
}
/**
* Schedules a callback to run immediately before the component is unmounted.
*
* Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
* only one that runs inside a server-side component.
*
* @param {() => any} fn
* @returns {void}
*/
function onDestroy(fn) {
	if (component_context === null) lifecycle_outside_component("onDestroy");
	onMount(() => () => untrack(fn));
}
/**
* @template [T=any]
* @param {string} type
* @param {T} [detail]
* @param {any}params_0
* @returns {CustomEvent<T>}
*/
function create_custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
	return new CustomEvent(type, {
		detail,
		bubbles,
		cancelable
	});
}
/**
* Creates an event dispatcher that can be used to dispatch [component events](https://svelte.dev/docs/svelte/legacy-on#Component-events).
* Event dispatchers are functions that can take two arguments: `name` and `detail`.
*
* Component events created with `createEventDispatcher` create a
* [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
* These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
* The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
* property and can contain any type of data.
*
* The event dispatcher can be typed to narrow the allowed event names and the type of the `detail` argument:
* ```ts
* const dispatch = createEventDispatcher<{
*  loaded: null; // does not take a detail argument
*  change: string; // takes a detail argument of type string, which is required
*  optional: number | null; // takes an optional detail argument of type number
* }>();
* ```
*
* @deprecated Use callback props and/or the `$host()` rune instead — see [migration guide](https://svelte.dev/docs/svelte/v5-migration-guide#Event-changes-Component-events)
* @template {Record<string, any>} [EventMap = any]
* @returns {EventDispatcher<EventMap>}
*/
function createEventDispatcher() {
	const active_component_context = component_context;
	if (active_component_context === null) lifecycle_outside_component("createEventDispatcher");
	/**
	* @param [detail]
	* @param [options]
	*/
	return (type, detail, options) => {
		var _active_component_con;
		const events = (_active_component_con = active_component_context.s.$$events) === null || _active_component_con === void 0 ? void 0 : 		/** @type {Record<string, Function | Function[]>} */ _active_component_con[type];
		if (events) {
			const callbacks = is_array(events) ? events.slice() : [events];
			const event = create_custom_event(type, detail, options);
			for (const fn of callbacks) fn.call(active_component_context.x, event);
			return !event.defaultPrevented;
		}
		return true;
	};
}
/**
* Schedules a callback to run immediately before the component is updated after any state change.
*
* The first time the callback runs will be before the initial `onMount`.
*
* In runes mode use `$effect.pre` instead.
*
* @deprecated Use [`$effect.pre`](https://svelte.dev/docs/svelte/$effect#$effect.pre) instead
* @param {() => void} fn
* @returns {void}
*/
function beforeUpdate(fn) {
	if (component_context === null) lifecycle_outside_component("beforeUpdate");
	if (component_context.l === null) lifecycle_legacy_only("beforeUpdate");
	init_update_callbacks(component_context).b.push(fn);
}
/**
* Schedules a callback to run immediately after the component has been updated.
*
* The first time the callback runs will be after the initial `onMount`.
*
* In runes mode use `$effect` instead.
*
* @deprecated Use [`$effect`](https://svelte.dev/docs/svelte/$effect) instead
* @param {() => void} fn
* @returns {void}
*/
function afterUpdate(fn) {
	if (component_context === null) lifecycle_outside_component("afterUpdate");
	if (component_context.l === null) lifecycle_legacy_only("afterUpdate");
	init_update_callbacks(component_context).a.push(fn);
}
/**
* Legacy-mode: Init callbacks object for onMount/beforeUpdate/afterUpdate
* @param {ComponentContext} context
*/
function init_update_callbacks(context) {
	var _l$u;
	var l = context.l;
	return (_l$u = l.u) !== null && _l$u !== void 0 ? _l$u : l.u = {
		a: [],
		b: [],
		m: []
	};
}
//#endregion
export { _classPrivateFieldInitSpec as $, from_html as A, tick as B, html as C, set_text as D, if_block as E, event as F, child as G, template_effect as H, deep_read_state as I, proxy as J, first_child as K, get as L, text as M, delegate as N, append as O, delegated as P, _classPrivateFieldGet2 as Q, safe_get as R, slot as S, index as T, user_effect as U, untrack as V, user_pre_effect as W, state as X, set as Y, user_derived as Z, set_class as _, legacy_rest_props as a, setContext as at, component as b, spread_props as c, to_array as ct, bind_value as d, derived$1 as et, attribute_effect as f, set_style as g, bind_select_value as h, asClassComponent as i, push as it, from_svg as j, comment as k, init as l, set_attribute as m, onDestroy as n, getContext as nt, prop as o, enable_legacy_mode_flag as ot, remove_input_defaults as p, sibling as q, onMount as r, pop as rt, rest_props as s, reset as st, index_client_exports as t, writable as tt, bind_this as u, head as v, each as w, snippet as x, element as y, settled as z };
