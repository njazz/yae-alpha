// dsp-worklet.js
// AudioWorkletProcessor for Y engine WASM DSP backend

globalThis.process = {
  env: {}
};

import createModule from "./wasm/yae_wasm3.js";

class YWorklet extends AudioWorkletProcessor {
  constructor(options = {}) {
    super();

    const opts = options.processorOptions || {};

    this.blockSize = opts.blockSize || 512;
    this.channels = opts.channels || 2;
    this.loaderUrl = opts.loaderUrl || null;

    this.module = null;
    this.engine = null;
    this.ready = false;

    this.simpleState = null;

    this._alloced = false;

    this._bufferInPtr = 0;
    this._bufferOutPtr = 0;
    this._bufferIn = null;
    this._bufferOut = null;

    this.port.onmessage = async (ev) => {
      const msg = ev.data || {};

      switch (msg.type) {
        case "init":
          if (msg.payload?.loaderUrl) {
            this.loaderUrl = msg.payload.loaderUrl;
          }
          await this._initWasm();
          break;

        case "eval":
          if (msg.payload?.code) {
          if (!this.module)
            await this._initWasm();

            let  code = msg.payload?.code;
              var ptr = this.module.allocateUTF8(code);
              this.module._y_engine_eval(this.engine, ptr);

              var b =  this.module._y_engine_reload_dsp(this.engine);

          }
          // this._initWasm();
          break;

        case "eval_expression":
          if (msg.payload?.code) {
          if (!this.module)
            await this._initWasm();

            let  code = msg.payload?.code;
              var ptr = this.module.allocateUTF8(code);
              this.module._y_engine_eval_expression(this.engine, ptr);

              var b =  this.module._y_engine_reload_dsp(this.engine);

          }
          // this._initWasm();
          break;

        case "set_slider":
          
          if (this.module) {
            this.module._y_simple_state_set_slider(
              this.simpleState,
              msg.payload.index,
              msg.payload.value
            );
            this.port.postMessage({ type: "set_slider_", obj: this.simpleState, index: msg.payload.index, value: msg.payload.value });          

          }
          break;

        case "set_toggle":
          if (this.ready) {
            this.module._y_simple_state_set_toggle(
              this.simpleState,
              msg.payload.index,
              msg.payload.value
            );
          }
          break;

        case "set_button":
          if (this.ready) {
            this.module._y_simple_state_set_button(
              this.simpleState,
              msg.payload.index,
            );
          }
          break;
      }
    };

    // if (this.loaderUrl) {
    //   this._initWasm();
    // }
  }

  async _initWasm() {
    if (this.ready) return;

    try {
      if (this.loaderUrl) {
        // importScripts(this.loaderUrl);
      }

      //
      // const createModule = (await import("./wasm/yae_wasm3.js")).default;

      this.module = await createModule({
        locateFile: (path) => {
          if (path.endsWith(".wasm")) {
            return "/wasm/yae_wasm3.wasm";
          }
          return path;
        }
      });

      // if (typeof this.YaeModule !== "function") {
      //   this.port.postMessage({
      //     type: "error",
      //     message: "YaeModule not found in worklet scope",
      //   });
      //   return;
      // }

      // this.module = await self.YaeModule();
      this.engine = this.module._y_engine_new();

      
      // TEST
      this.module._y_engine_eval(this.engine, this.module.allocateUTF8("#dsp ~%;"));
      var b =  this.module._y_engine_reload_dsp(this.engine);

      this.dsp = this.module._y_engine_get_dsp(this.engine);

      // TODO
      this.module._y_dsp_prepare(this.dsp, 2, 128, 48000);

      // TODO
      this.simpleState = this.module._y_engine_get_simple_state(this.engine);

      this.ready = true;

      this.port.postMessage({ type: "ready" });

      this.port.postMessage({ type: "ready", message: Object.keys(this.module) });

    } catch (err) {
      this.port.postMessage({
        type: "error",
        message: String(err),
      });
    }
  }

  _ensureBuffers() {
    if (this._alloced) return;

    const samples = this.blockSize * this.channels;

    this._bufferInPtr = this.module._malloc(samples * 4);
    this._bufferOutPtr = this.module._malloc(samples * 4);

    this._bufferIn = new Float32Array(
      this.module.HEAPF32.buffer,
      this._bufferInPtr,
      samples
    );

    this._bufferOut = new Float32Array(
      this.module.HEAPF32.buffer,
      this._bufferOutPtr,
      samples
    );

    this._alloced = true;
  }

  async process(inputs, outputs) {
    if (!this.ready) return true;

    const input = inputs[0] || [];
    const output = outputs[0] || [];

    this._ensureBuffers();

    const block = this.blockSize;
    const ch = this.channels;

    // -------------------------
    // write input (interleaved)
    // -------------------------
    for (let c = 0; c < ch; c++) {
      const inCh = input[c] || new Float32Array(block);
      const offset = c * block;
      this._bufferIn.set(inCh, offset);
    }

    // -------------------------
    // DSP call (C API)
    // -------------------------
    try {
      this.module._y_dsp_process(
        this.dsp,
        this._bufferInPtr,
        this._bufferOutPtr
      );
    } catch (e) {
      this.port.postMessage({
        type: "error",
        message: "DSP process error: " + e,
      });

      // fail:
      this.ready = false;

      // reinit once
      await _initWasm();

      return true;
    }

    // -------------------------
    // write output
    // -------------------------
    for (let c = 0; c < ch; c++) {
      const outCh = output[c];
      if (!outCh) continue;

      const offset = c * block;

      for (let i = 0; i < block; i++) {
        outCh[i] = this._bufferOut[offset + i];
      }
    }

    return true;
  }
}

registerProcessor("yae-worklet", YWorklet);
