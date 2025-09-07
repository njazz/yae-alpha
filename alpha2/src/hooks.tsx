import React, { useState, useEffect, useRef, useCallback } from "react";

// import Module from './wasm/yae_lca_core_wasm.js';

// -----------------------------
// Utils (checksum + share)
// -----------------------------
function checksum(str) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
        sum = (sum + str.charCodeAt(i)) % 65535;
    }
    return sum.toString(16).padStart(4, "0");
}

export function encodeContent(content) {
    const cs = checksum(content);
    const data = cs + content;
    return btoa(encodeURIComponent(data));
}

export function decodeContent(encoded) {
    try {
        const decoded = decodeURIComponent(atob(encoded));
        const cs = decoded.slice(0, 4);
        const content = decoded.slice(4);
        if (checksum(content) !== cs) return null;
        return content;
    } catch {
        return null;
    }
}

// -----------------------------
// Hook: DSP / WASM engine
// -----------------------------
export function useDSP() {
    const [module, setModule] = useState(null);
    const [engine, setEngine] = useState(null);
    const [status, setStatus] = useState("Idle");

    // useEffect(() => {
    //   let freed = false;
    //   Module().then((mod) => {
    //     if (freed) return;
    //     setModule(mod);
    //     setEngine(mod._y_engine_new());
    //   });
    //   return () => {
    //     if (engine && module) {
    //       module._y_engine_free(engine);
    //     }
    //     freed = true;
    //   };
    // }, []);

    useEffect(() => {
        let freed = false;

        if (!window.Module) {
            console.error("WASM loader not found on window.Module");
            return;
        }


        // mod itself is the loader function, just call it
        window.YaeModule().then((instance) => {
            if (freed) return;
            setModule(instance);
            setEngine(instance._y_engine_new());
        });


        return () => {
            if (engine && module) {
                module._y_engine_free(engine);
            }
            freed = true;
        };
    }, []);


    const compile = useCallback(
        (code) => {
            try {
                if (!module || !engine) return;
                const ptr = module.allocateUTF8(code);
                const builder = module._y_engine_try_parse_to_builder(engine, ptr);
                module._free(ptr);

                const hasValue = module._y_optional_dsp_build_fn_has_value(builder);
                if (hasValue) {
                    setStatus("✅ DSP parsed successfully");
                    module._y_engine_dsp_set(engine, builder);
                    module._y_engine_dsp_node_prepare(engine, 2, 512, 48000);
                } else {
                    setStatus("❌ DSP parse error");
                }
                if (builder) module._y_optional_dsp_build_fn_free(builder);
            } catch (err) {
                console.error("WASM DSP error:", err);
                setStatus("❌ DSP runtime error: "+err);
            }
        },
        [module, engine]
    );

    const setSlider = useCallback(
        (index, val) => {
            if (engine && module) {
                module._y_engine_set_slider(engine, index, val);
            }
        },
        [module, engine]
    );

    return { module, engine, status, compile, setSlider };
}

// -----------------------------
// Hook: Audio engine
// -----------------------------
export function useAudioEngine(dsp) {
    const [running, setRunning] = useState(false);
    const audioCtxRef = useRef(null);
    const scriptNodeRef = useRef(null);
    const bufferOutRef = useRef(null);

    const start = useCallback(() => {
        if (running || !dsp.module || !dsp.engine) return;
        const audioCtx = new AudioContext();
        const blockSize = 512;
        const channels = 2;

        const bufferInPtr = dsp.module._malloc(blockSize * channels * 4);
        const bufferOutPtr = dsp.module._malloc(blockSize * channels * 4);

        bufferOutRef.current = new Float32Array(
            dsp.module.HEAPF32.buffer,
            bufferOutPtr,
            blockSize * channels
        );

        const scriptNode = audioCtx.createScriptProcessor(blockSize, 2, 2);
        scriptNode.onaudioprocess = (e) => {
            const outputL = e.outputBuffer.getChannelData(0);
            const outputR = e.outputBuffer.getChannelData(1);
            dsp.module._y_engine_dsp_node_process(
                dsp.engine,
                bufferInPtr,
                bufferOutPtr
            );
            for (let i = 0; i < blockSize; i++) {
                outputL[i] = bufferOutRef.current[i];
                outputR[i] = bufferOutRef.current[i + blockSize];
            }
        };

        scriptNode.connect(audioCtx.destination);
        scriptNodeRef.current = scriptNode;

        audioCtxRef.current = audioCtx;
        // bufferOutRef.current = bufferOut;
        setRunning(true);
    }, [running, dsp]);

    const stop = useCallback(() => {
        if (!running) return;
        if (scriptNodeRef.current) scriptNodeRef.current.disconnect();
        if (audioCtxRef.current) audioCtxRef.current.close();
        setRunning(false);

        if (scriptNodeRef.current) {
scriptNodeRef.current.disconnect();
scriptNodeRef.current = null;
}


if (audioCtxRef.current) {
audioCtxRef.current.close();
audioCtxRef.current = null;
}


if (engine && module) {
module._y_engine_free(engine);
setEngine(null);
setModule(null);
}


bufferOutRef.current = null;

    }, [running]);

    return { running, start, stop, bufferOutRef, scriptNodeRef };
}

export default { useDSP, useAudioEngine }

// -----------------------------
// Components
// -----------------------------
// function CodeEditor({ value, onChange }) {
//   return (
//     <CodeMirror
//       value={value}
//       height="400px"
//       extensions={[cpp()]}
//       onChange={(val) => onChange(val)}
//       theme="dark"
//     />
//   );
// }

// function Faders({ count, onChange }) {
//   return (
//     <div className="faders">
//       {Array.from({ length: count }).map((_, i) => (
//         <div key={i}>
//           <label>F{i}</label>
//           <input
//             type="range"
//             min="0"
//             max="100"
//             defaultValue="50"
//             onChange={(e) => onChange(i, e.target.value / 100)}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// -----------------------------
// App
// -----------------------------
// export default function App() {
//   const [code, setCode] = useState("@main @[~~440]");
//   const dsp = useDSP();
//   const audio = useAudioEngine(dsp);

//   useEffect(() => {
//     dsp.compile(code);
//   }, [code, dsp.compile]);

//   return (
//     <div>
//       <h1>React DSP Playground</h1>
//       <CodeEditor value={code} onChange={setCode} />
//       <div>Status: {dsp.status}</div>
//       <button onClick={audio.start} disabled={audio.running}>
//         Start Audio
//       </button>
//       <button onClick={audio.stop} disabled={!audio.running}>
//         Stop Audio
//       </button>
//       <Faders count={4} onChange={dsp.setSlider} />
//     </div>
//   );
// }