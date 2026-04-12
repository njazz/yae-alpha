// -----------------------------
// WORKLET: dsp-processor.js
// Place this file in your public/ folder and make sure DSP_WORKLET_URL above points to it.
// This worklet will:
//  - import the wasm loader script (via importScripts)
//  - instantiate the wasm Module in the worklet global scope
//  - accept control messages (compile, set-slider, set-toggle)
//  - create processors that run during audio process()
//
// NOTE: this code assumes the wasm loader creates a promise-style factory named `YaeModule`
// on the global scope in the worklet after importScripts(loaderUrl). If your loader exports a
// different global name, change LOADER_GLOBAL_NAME below.

'use strict';

const LOADER_GLOBAL_NAME = 'YaeModule'; // change if your loader uses another name
let wasmModule = null; // will hold the instantiated Emscripten module in worklet
let wasmReady = false;
let pendingInit = null;

// Per-engine state stored inside the worklet's wasm instance.
// engineId -> { enginePtr }
const engines = new Map();
let nextEngineId = 1;

// We'll implement a single AudioWorkletProcessor class where the same global wasm instance
// services all processors (control node + audio nodes). Different ports are used to target
// control vs audio roles.

class DSPProcessor extends AudioWorkletProcessor {
    constructor() {
        super();

        this.engine = null;
        this.wasmInstance = null;
        this.blockSize = 512;
        this.channels = 2;

        this.inPtr = 0;
        this.outPtr = 0;
        this.HEAPF32 = null;

        this.port.onmessage = (e) => this.handleMessage(e.data);
    }

    async handleMessage(msg) {
        console.log("AW:");console.log(msg.type);

        if (msg.type === "init-wasm") {
            const {wasmUrl} = msg;

            console.log(wasmUrl);

            // Load WASM binary
            const response = await fetch(wasmUrl);

            console.log(response.size());

            const bytes = await response.arrayBuffer();

            // Instantiate module
            const result = await WebAssembly.instantiate(bytes, msg.importObject);

            this.wasmInstance = result.instance;
            this.memory = this.wasmInstance.exports.memory;
            this.HEAPF32 = new Float32Array(this.memory.buffer);

            // Exported functions
            this._process = this.wasmInstance.exports._y_engine_dsp_node_process;
            this._malloc = this.wasmInstance.exports._malloc;

            // Allocate input/output buffers
            const bufSize = this.blockSize * this.channels * 4;
            this.inPtr = this._malloc(bufSize);
            this.outPtr = this._malloc(bufSize);

            this.port.postMessage({
                type: "wasm-ready"
            });

            console.log("AW: wasm-ready");
        }

        if (msg.type === "set-engine") {
            this.engine = msg.enginePtr;
        }

        if (msg.type === "update-blocksize") {
            this.blockSize = msg.blockSize;
        }
    }

    process(inputs, outputs) {
        if (!this.wasmInstance || !this.engine) return true;

        const input = inputs[0];
        const output = outputs[0];

        // Copy input → WASM memory
        for (let ch = 0; ch < this.channels; ch++) {
            const dst = this.inPtr / 4 + ch * this.blockSize;
            this.HEAPF32.set(input[ch], dst);
        }

        // DSP processing
        this._process(this.engine, this.inPtr, this.outPtr);

        // Copy WASM memory → output
        for (let ch = 0; ch < this.channels; ch++) {
            const src = this.outPtr / 4 + ch * this.blockSize;
            output[ch].set(
                this.HEAPF32.subarray(src, src + this.blockSize)
            );
        }

        return true;
    }
}

registerProcessor("dsp-processor", DSPProcessor);
