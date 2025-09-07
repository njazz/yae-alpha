"use strict";

let yModule = null;
let engine = null;

// Initialize Monaco Editor
require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@0.45.0/min/vs' } });
let bufferIn, bufferOut; // yModule, engine,
let audioContext, scriptNode;
let analyzer, source, drawId;
let isAudioRunning = false;

require(["vs/editor/editor.main"], function() {

    const editor = monaco.editor.create(document.getElementById('editor'), {
        value: `@def ph() = @[Saw(2.05) ~*1.0]
@def bd() = @[

~+/{@[
ph() ~-_ Lt(0.25)
ADSR(0.005 0.02 0.0 0.0 ) ~*0.5 ~tanh ~*1.3
]
@[~~0 ~*0.05]
}
~~L 
~*@[ph() ~-_ Lt(0.5) ~*ADSR(0.05 0.01 0.0 0.0 ) ] ~*4.0 ]

@def hh() = @[
ph() ~-_ Gt(0.5) ADSR(0.01 0.05 0.0 0.0 ) ~tanh ~*~% ~*2
]
@def bass1() = @[
ph() ~-_ Gt(0.5)
ADSR(0.05 0.01 0.0 0.1 ) ~*@[~\\37 ~*0.15 ~~L] ~*2.0]

@def bass2() = @[
ph() ~-_ Gt(0.75)
ADSR(0.05 0.0 0.0 0.1 ) ~*@[~\\76 @[~*0.15 ~~0.97 ~-_ ~*0.15] ~~L ]  ~*1.0]

@def techno() = 

@/{bd() hh() bass1() bass2()}

@def v1()= @[
~+/{ 
@[~~440 
~*~~0.25 
]
~~0.3
}
~*0.5
Tanh()
~~L 
~*~~20 
~*~~0.05 
~~L 
~*0.50
]

@def v2()= @[
~+/{ 
@[~~320 
~*~~02.25 
]
~~0.5
}
~*0.5
Tanh()
~~L 
~*~~10 
~*~~0.5 
~~L 
~*0.50
]

@def sines() =  @[~+/{@[v1() ~*~~0.3] @[v2() ~*~~0.1]} ~*0.1 @[~~L] ]

@main @[techno() ~*sines()]


`,
        language: "cpp",
        theme: "vs-dark",
        automaticLayout: true,
    });

    function handleEditorChange() {
        if (!engine || !yModule) {
            console.warn("❌ engine / module error");
            return;
        }
        const code = editor.getValue();

        const ptr = yModule.allocateUTF8(code);
        const builder = yModule._y_engine_try_parse_to_builder(engine, ptr);
        yModule._free(ptr);

        const hasValue = yModule._y_optional_dsp_build_fn_has_value(builder);

        console.log(hasValue);

        if (!!hasValue) {
            console.log("✅ DSP parsed successfully");
            document.getElementById("dspstatus").innerHTML = "✅ DSP parsed successfully";
            yModule._y_engine_dsp_set(engine, builder);

            const sampleRate = 48000;
            const blockSize = 512;
            const channels = 2;
            yModule._y_engine_dsp_node_prepare(engine, channels, blockSize, sampleRate);

            try {
                if (!!builder)
                    yModule._y_optional_dsp_build_fn_free(builder);
            } catch (e) {
                console.log("WASM Error:");
                console.error(e);
            }



        } else {
            const errPtr = yModule._y_engine_get_new_last_error(engine);
            const err = yModule.UTF8ToString(errPtr);
            console.warn("❌ DSP error:", err);
            document.getElementById("dspstatus").innerHTML = "❌ DSP parse error";

            try {
                if (!!builder)
                    yModule._y_optional_dsp_build_fn_free(builder);
            } catch (e) {
                console.log("WASM Error:");
                console.error(e);
            }
        }

    }

    editor.onDidChangeModelContent(handleEditorChange);
    window.handleEditorChange = handleEditorChange;

    // --------------------------------------------------------------------------------

    // Utility for checksum: simple checksum by summing char codes mod 65535
    function checksum(str) {
        let sum = 0;
        for (let i = 0; i < str.length; i++) {
            sum = (sum + str.charCodeAt(i)) % 65535;
        }
        return sum.toString(16).padStart(4, '0'); // hex, 4 chars
    }

    function encodeContent(content) {
        const cs = checksum(content);
        const data = cs + content;
        return btoa(encodeURIComponent(data));
    }

    function decodeContent(encoded) {
        try {
            const decoded = decodeURIComponent(atob(encoded));
            const cs = decoded.slice(0, 4);
            const content = decoded.slice(4);
            if (checksum(content) !== cs) {
                console.warn("Checksum mismatch, data corrupted or tampered.");
                return null;
            }
            return content;
        } catch {
            return null;
        }
    }

    const MAX_SIZE = 2048; // max content length

    // On share button click
    document.getElementById('shareBtn').addEventListener('click', () => {
        let text = editor.getValue();

        if (text.length > MAX_SIZE) {
            alert("Text too long to share (max " + MAX_SIZE + " chars).");
            return;
        }

        const encoded = encodeContent(text);
        const url = window.location.origin + window.location.pathname + "?" + encoded;

        // You can either:
        // 1) Copy to clipboard:
        navigator.clipboard.writeText(url).then(() => {
            alert("Share URL copied to clipboard!");
        }, () => {
            alert("Failed to copy URL. Here it is:\n" + url);
        });

        // 2) Or just show the URL in a prompt (uncomment if you want)
        // prompt("Share this URL:", url);
    });

    // On page load, check for URL query
    window.addEventListener('load', () => {
        const query = window.location.search.slice(1);
        if (query) {
            const content = decodeContent(query);
            if (content && content.length <= MAX_SIZE) {
                //document.getElementById('editor').value = content;
                editor.setValue(content);

            } else {
                console.warn("Invalid or too long content in URL");
            }
        }
    });



    // --------------------------------------------------------------------------------
});



function startAudio() {
    if (isAudioRunning) return;
    isAudioRunning = true;

    audioContext = new AudioContext();
    console.log("AudioContext started:", audioContext);

    // Load WASM Module
    Module().then(mod => {
        yModule = mod;
        engine = yModule._y_engine_new();

        console.log(Object.keys(yModule).filter(k => k.startsWith('_')));

        const sampleRate = 48000;
        const blockSize = 512;
        const channels = 2;

        yModule._y_engine_dsp_node_prepare(engine, channels, blockSize, sampleRate);

        // --

        // Allocate aligned buffers once, outside the loop
        // PFFFT likes 16-byte alignment, Float32Array per channel
        yModule.bufferInPtr = yModule._malloc(blockSize * channels * 4); // 4 bytes per float
        yModule.bufferOutPtr = yModule._malloc(blockSize * channels * 4);

        // Create typed arrays for JS access
        const bufferIn = new Float32Array(yModule.HEAPF32.buffer, yModule.bufferInPtr, blockSize * channels);
        const bufferOut = new Float32Array(yModule.HEAPF32.buffer, yModule.bufferOutPtr, blockSize * channels);

        scriptNode = audioContext.createScriptProcessor(blockSize, 2, 2);

        scriptNode.onaudioprocess = function(e) {
            const outputL = e.outputBuffer.getChannelData(0);
            const outputR = e.outputBuffer.getChannelData(1);

            // Copy input to WASM buffer (if you have input)
            // const inputL = e.inputBuffer.getChannelData(0);
            // const inputR = e.inputBuffer.getChannelData(1);
            // for (let i = 0; i < blockSize; i++) {
            //     bufferIn[i] = inputL[i];
            //     bufferIn[i + blockSize] = inputR[i];
            // }

            try {
                yModule._y_engine_dsp_node_process(engine, yModule.bufferInPtr, yModule.bufferOutPtr);
            } catch (err) {
                document.getElementById("dspstatus").innerHTML = "❌ DSP engine error";
                console.error("DSP ERROR:", err);
                scriptNode.onaudioprocess = () => {};
                return;
            }

            // Copy output from WASM buffer to AudioBuffer
            for (let i = 0; i < blockSize; i++) {
                outputL[i] = bufferOut[i];
                outputR[i] = bufferOut[i + blockSize];
            }

            drawScope(outputL);
        };

        // --

        // bufferIn = yModule._malloc(blockSize * 4 * channels);
        // bufferOut = yModule._malloc(blockSize * 4 * channels);

        // scriptNode = audioContext.createScriptProcessor(blockSize, 2, 2);

        // scriptNode.onaudioprocess = function(e) {
        //     const output = e.outputBuffer.getChannelData(0);
        //     const outputR = e.outputBuffer.getChannelData(1);

        //     try {
        //         yModule._y_engine_dsp_node_process(engine, bufferIn, bufferOut);
        //     }
        //     catch (e) {
        //         document.getElementById("dspstatus").innerHTML = "❌ DSP engine error";
        //         console.log("DSP ERROR:");
        //         console.log(e);
        //         scriptNode.onaudioprocess = function(e) {};
        //         return;
        //     }

        //     const outputView = new Float32Array(yModule.HEAPF32.buffer, bufferOut, blockSize * 2);

        //     for (let i = 0; i < blockSize; i++) {
        //         output[i] = outputView[i];
        //         outputR[i] = outputView[i + blockSize];
        //     }

        //     drawScope(output);
        // };

        scriptNode.connect(audioContext.destination);

        document.getElementById('startAudio').disabled = true;
        document.getElementById('stopAudio').disabled = false;

        console.log("🔊 Audio running...");

        if (window.handleEditorChange) {
            window.handleEditorChange();
        }

        // sonogram
        (async function() {
            const canvas = document.getElementById("sonogram");
            const ctx = canvas.getContext("2d");

            const audioCtx = audioContext; //new (window.AudioContext || window.webkitAudioContext)();

            // --- Replace this with yae-alpha's output node ---
            // Example: microphone as input for testing
            // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            // source = audioCtx.createMediaStreamSource(stream);

            // Create analyzer
            analyzer = audioCtx.createAnalyser();
            analyzer.fftSize = 512; // lower = faster scrolling, less freq resolution
            const freqData = new Uint8Array(analyzer.frequencyBinCount);

            // Connect graph: source -> analyzer -> destination
            // source.connect(analyzer);
            scriptNode.connect(analyzer);
            // You may also connect analyzer to audioCtx.destination if you want monitoring
            // analyzer.connect(audioCtx.destination);

            let x = 0;

            if (drawId) {
                cancelAnimationFrame(drawId); // stop old loop
            }

            function heatmapColorForValue(value) {
                const t = value / 255; // normalize
                if (t <= 0) return 'rgb(0,0,0)'; // silence = black
                const r = Math.min(255, 255 * t * 2); // ramp up red fast
                const g = t > 0.5 ? Math.min(255, 255 * (t - 0.5) * 2) : 0; // add green later
                const b = 0.5 * r; // no blue in heatmap
                return `rgb(${r},${g},${b})`;
            }


            function draw() {
                drawId = requestAnimationFrame(draw);

                if (!analyzer) return;

                analyzer.getByteFrequencyData(freqData);

                // Shift old image left by 1 pixel
                const imgData = ctx.getImageData(1, 0, canvas.width - 1, canvas.height);
                ctx.putImageData(imgData, 0, 0);

                // Draw new column at the right
                for (let y = 0; y < canvas.height; y++) {
                    const value = freqData[Math.floor(y * freqData.length / canvas.height)];
                    // const hue = 240 - (value / 255) * 240; // blue->red
                    // ctx.fillStyle = `hsl(${hue},100%,50%)`;
                    ctx.fillStyle = heatmapColorForValue(value);
                    ctx.fillRect(canvas.width - 1, canvas.height - y, 1, 1);
                }
            }

            draw();
        })();



    });
}

function stopAudio() {
    if (!isAudioRunning) return;
    if (!yModule) return;

    isAudioRunning = false;

    if (analyzer) {
        analyzer.disconnect();
        analyzer = null;
        source = null;
    }

    if (scriptNode) {
        scriptNode.disconnect();
        scriptNode = null;
    }

    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }

    if (engine && yModule) {
        yModule._free(yModule.bufferInPtr);
        yModule._free(yModule.bufferOutPtr);

        if (bufferIn) {
            yModule._free(bufferIn);
            bufferIn = null;
        }
        if (bufferOut) {
            yModule._free(bufferOut);
            bufferOut = null;
        }

        yModule._y_engine_free(engine);
        engine = null;
        yModule = null;
    }

    document.getElementById('startAudio').disabled = false;
    document.getElementById('stopAudio').disabled = true;

    clearScope();
    console.log("🛑 Audio stopped.");
}

document.getElementById("startAudio").addEventListener("click", startAudio);
document.getElementById("stopAudio").addEventListener("click", stopAudio);

// Simple oscilloscope drawing
const scopeCanvas = document.getElementById('scope');
const scopeCtx = scopeCanvas.getContext('2d');

// Adjust canvas size for devicePixelRatio
function resizeScope() {
    const width = scopeCanvas.clientWidth;
    const height = scopeCanvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    scopeCanvas.width = width * dpr;
    scopeCanvas.height = height * dpr;
    scopeCtx.scale(dpr, dpr);
}
resizeScope();
window.addEventListener('resize', resizeScope);

function drawScope(buffer) {
    const width = scopeCanvas.clientWidth;
    const height = scopeCanvas.clientHeight;

    scopeCtx.clearRect(0, 0, width, height);
    scopeCtx.strokeStyle = '#0f0';
    scopeCtx.lineWidth = 2;
    scopeCtx.beginPath();

    const step = buffer.length / width;

    for (let i = 0; i < width; i++) {
        const idx = i * step;
        // simple floor to get sample index
        const sample = buffer[Math.floor(idx)] || 0;
        const y = (1 - (sample + 1) / 2) * height; // normalize -1..1 to canvas Y
        if (i === 0) {
            scopeCtx.moveTo(i, y);
        } else {
            scopeCtx.lineTo(i, y);
        }
    }
    scopeCtx.stroke();
}

function clearScope() {
    const width = scopeCanvas.clientWidth;
    const height = scopeCanvas.clientHeight;
    scopeCtx.clearRect(0, 0, width, height);
}

window.addEventListener("beforeunload", () => {
    if (engine && yModule) {
        yModule._y_engine_free(engine);
    }
});

// faders display
// sliders
document.querySelectorAll('.faders input[type="range"]').forEach((slider, i) => {
    const label = document.createElement('div');
    label.style.marginBottom = '2px';
    label.textContent = `F${i}: ${slider.value}%`;
    slider.parentNode.insertBefore(label, slider);

    const index = i;

    slider.addEventListener('input', e => {
        const val = e.target.value;
        e.target.style.background = `linear-gradient(to right, #ff6633 ${val}%, transparent ${val}%)`;
        label.textContent = `F${i}: ${val}%`;

        if (engine && yModule) {
            label.textContent = `F${index}: ${val}% *`;
            yModule._y_engine_set_slider(engine, index, val * 0.01);
        }
    });
});