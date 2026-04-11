import { t as _defineProperty } from "./C7Y5rWy5.js";
import { t as __vitePreload } from "./_p6pPjRb.js";
//#region ../engine/backends/wasm.ts
var WasmFloatBufferView = class {
	constructor(ptr, size, memory) {
		this.ptr = ptr;
		this.size = size;
		this.memory = memory;
	}
	get length() {
		return this.size;
	}
	toArray() {
		return Array.from(new Float32Array(this.memory.buffer, this.ptr, this.size));
	}
	view() {
		return new Float32Array(this.memory.buffer, this.ptr, this.size);
	}
	at(i) {
		return this.view()[i];
	}
	toArray() {
		return Array.from(this.view());
	}
};
var WasmBackend = class {
	constructor(memory) {
		_defineProperty(this, "wasm", void 0);
		_defineProperty(this, "enginePtr", void 0);
		_defineProperty(this, "audioCtx", void 0);
		_defineProperty(this, "workletNode", void 0);
		_defineProperty(this, "code", void 0);
		_defineProperty(this, "analyser", void 0);
		this.memory = memory;
	}
	_getModule() {
		return this.wasm;
	}
	async init() {
		const createWasm = (await __vitePreload(async () => {
			const { default: __vite_default__ } = await import("./T-jKgJIp.js");
			return { default: __vite_default__ };
		}, [], import.meta.url)).default;
		this.wasm = await createWasm({ locateFile: (path) => {
			if (path.endsWith(".wasm")) return "/wasm/yae_wasm3.wasm";
			return path;
		} });
		this.enginePtr = this.wasm._y_engine_new();
	}
	async start() {
		if (typeof AudioContext === "undefined") {
			console.log("AudioContext not available");
			return;
		}
		if (this.audioCtx) return;
		this.audioCtx = new AudioContext();
		await this.audioCtx.resume();
		console.log("audioCtx", this.audioCtx);
		console.log(this.audioCtx.state);
		await this.audioCtx.audioWorklet.addModule("/worklet.js");
		this.workletNode = new AudioWorkletNode(this.audioCtx, "yae-worklet", {
			numberOfInputs: 1,
			numberOfOutputs: 1,
			outputChannelCount: [2],
			processorOptions: {
				blockSize: 128,
				channels: 2,
				loaderUrl: "/worklet.js"
			}
		});
		this.workletNode.port.onmessage = (event) => {
			console.log("Audio Worklet:", event.data);
		};
		this.workletNode.port.postMessage({
			type: "init",
			payload: { loaderUrl: "/worklet.js" }
		});
		if (this.code) this.workletNode.port.postMessage({
			type: "eval",
			payload: { code: this.code }
		});
		this.osc = this.audioCtx.createOscillator();
		this.osc.frequency.value = 440;
		this.osc.connect(this.workletNode);
		this.workletNode.connect(this.audioCtx.destination);
		this.analyser = this.audioCtx.createAnalyser();
		this.analyser.fftSize = 2048;
		this.analyser.smoothingTimeConstant = .85;
		this.workletNode.connect(this.analyser);
		this.analyser.connect(this.audioCtx.destination);
		this.osc.start();
		console.log("Audio start");
		console.log(this.audioCtx.state);
	}
	getAnalyser() {
		var _this$analyser;
		return (_this$analyser = this.analyser) !== null && _this$analyser !== void 0 ? _this$analyser : null;
	}
	async stop() {
		if (this.workletNode) {
			this.workletNode.disconnect();
			this.workletNode.port.postMessage({ type: "free" });
			this.workletNode = void 0;
			this.analyser = null;
		}
		if (this.audioCtx) {
			await this.audioCtx.close();
			this.audioCtx = void 0;
		}
		console.log("Audio stop");
	}
	eval(code) {
		if (!this.wasm) return;
		const ptr = this.wasm.allocateUTF8(code);
		this.wasm._y_engine_eval(this.enginePtr, ptr);
		this.free(ptr);
		this.code = code;
	}
	reloadDSP() {
		var _this$workletNode;
		if (!this.wasm) return false;
		let ret = !!this.wasm._y_engine_reload_dsp(this.enginePtr);
		if (ret) (_this$workletNode = this.workletNode) === null || _this$workletNode === void 0 || _this$workletNode.port.postMessage({
			type: "eval",
			payload: { code: this.code }
		});
		else {
			var _this$workletNode2;
			(_this$workletNode2 = this.workletNode) === null || _this$workletNode2 === void 0 || _this$workletNode2.port.postMessage({
				type: "eval",
				payload: { code: "#dsp ~0;" }
			});
		}
		return ret;
	}
	getDSPBuilder() {
		if (!this.wasm) return {};
		return this.wasm._y_engine_get_dsp_builder(this.enginePtr);
	}
	getRootModule() {
		return this.wasm._y_engine_get_root_module(this.enginePtr);
	}
	getSimpleState() {
		return this.wasm._y_engine_get_simple_state(this.enginePtr);
	}
	getAmplitudeResponse(b) {
		if (!this.wasm) return {};
		const ptr = this.wasm._y_get_amplitude_response_svg(b);
		return this.wasm.UTF8ToString(ptr);
	}
	getPhaseResponse(b) {
		if (!this.wasm) return {};
		const ptr = this.wasm._y_get_phase_response_svg(b);
		return this.wasm.UTF8ToString(ptr);
	}
	getTransferFunction(b) {
		if (!this.wasm) return {};
		const ptr = this.wasm._y_get_transfer_function_svg(b);
		return this.wasm.UTF8ToString(ptr);
	}
	getProbeNames() {
		const vec = this.wasm._y_get_probe_names(this.enginePtr);
		const dataPtr = this.wasm.get_u32(vec);
		const size = this.wasm.get_size(vec);
		const out = [];
		for (let i = 0; i < size; i++) {
			const strPtr = this.wasm.get_ptr(dataPtr + i * 4);
			out.push(this.wasm.UTF8ToString(strPtr));
		}
		this.wasm._y_string_vector_free(vec);
		return out;
	}
	getProbeBufferByIndex() {
		const buf = this.wasm._y_get_probe_buffer_by_index(this.enginePtr, 0, 1, 0);
		return new WasmFloatBufferView(this.wasm._y_probe_buffer_get_data(buf), this.wasm._y_probe_buffer_get_size(buf), this.memory);
	}
	getProbeBufferByName() {
		const namePtr = this.allocString("default");
		const buf = this.wasm._y_get_probe_buffer_by_name(this.enginePtr, namePtr, 1, 0);
		this.free(namePtr);
		return new WasmFloatBufferView(this.wasm._y_probe_buffer_get_data(buf), this.wasm._y_probe_buffer_get_size(buf), this.memory);
	}
	free(ptr) {
		this.wasm._free(ptr);
	}
	destroy() {
		this.stop();
		this.wasm._y_engine_free(this.enginePtr);
	}
};
var YModule = class {
	constructor(ptr) {
		_defineProperty(this, "ptr", void 0);
		this.ptr = ptr;
	}
	static create() {
		const ptr = wasm.object_new();
		return new TObject(ptr);
	}
	free() {
		wasm.object_free(this.ptr);
		this.ptr = 0;
	}
};
var YDSPBuilder = class {
	constructor(ptr) {
		_defineProperty(this, "ptr", void 0);
		this.ptr = ptr;
	}
	static create() {
		const ptr = wasm.object_new();
		return new TObject(ptr);
	}
	free() {
		wasm.object_free(this.ptr);
		this.ptr = 0;
	}
};
function floatBinding(bb, sourcePtr) {
	let wasm = bb._getModule();
	let value = 0;
	let subPtr = null;
	let subscriberCount = 0;
	const subscribers = /* @__PURE__ */ new Set();
	function ensureSub() {
		if (subPtr !== null) return;
	}
	function cleanupSub() {
		if (subPtr === null) return;
		wasm._y_subscription_free(subPtr);
		subPtr = null;
	}
	function subscribe(run) {
		ensureSub();
		subscriberCount++;
		subscribers.add(run);
		run(value);
		return () => {
			subscribers.delete(run);
			subscriberCount--;
			if (subscriberCount === 0) cleanupSub();
		};
	}
	function set(v) {
		value = v;
		wasm._y_signal_source_float_set(sourcePtr, v);
		for (const s of subscribers) s(value);
	}
	function update(fn) {
		set(fn(value));
	}
	return {
		subscribe,
		set,
		update
	};
}
function floatValue(wasm, sourcePtr) {
	return { subscribe: floatBinding(wasm, sourcePtr).subscribe };
}
//#endregion
export { WasmBackend, WasmFloatBufferView, YDSPBuilder, YModule, floatBinding, floatValue };
