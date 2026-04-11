import { A as from_html, E as if_block, G as child, O as append, U as user_effect, it as push, n as onDestroy, r as onMount, rt as pop, st as reset, u as bind_this } from "../chunks/Db9Uo94o.js";
import "../chunks/8XMRajqd.js";
//#region src/lib/components/Sonogram.svelte
var root$1 = from_html(`<canvas style="width: 100%; height: 100%;"></canvas>`);
function Sonogram($$anchor, $$props) {
	push($$props, true);
	let canvas;
	let ctx = null;
	let drawId = null;
	let freqData = new Uint8Array(0);
	function resizeCanvas() {
		if (!canvas) return;
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
	}
	function heatmapColorForValue(value) {
		const t = value / 255;
		const r = Math.min(255, 255 * t * 2);
		return `rgb(${r},${t > .5 ? Math.min(255, 255 * (t - .5) * 2) : 0},${.5 * r})`;
	}
	function draw() {
		if (!$$props.analyzer || !ctx || !canvas) return;
		drawId = requestAnimationFrame(draw);
		$$props.analyzer.getByteFrequencyData(freqData);
		const imgData = ctx.getImageData(1, 0, canvas.width - 1, canvas.height);
		ctx.putImageData(imgData, 0, 0);
		for (let y = 0; y < canvas.height; y++) {
			const value = freqData[Math.floor(y * freqData.length / canvas.height)];
			ctx.fillStyle = heatmapColorForValue(value);
			ctx.fillRect(canvas.width - 1, canvas.height - 1 - y, 1, 1);
		}
	}
	function handleResize() {
		if (drawId) cancelAnimationFrame(drawId);
		resizeCanvas();
		draw();
	}
	onMount(() => {
		if (!canvas) return;
		ctx = canvas.getContext("2d");
		if (!ctx) return;
		resizeCanvas();
		draw();
		window.addEventListener("resize", handleResize);
	});
	onDestroy(() => {
		if (drawId) cancelAnimationFrame(drawId);
		window.removeEventListener("resize", handleResize);
	});
	user_effect(() => {
		if ($$props.analyzer && $$props.analyzer.frequencyBinCount) {
			freqData = new Uint8Array($$props.analyzer.frequencyBinCount);
			if (ctx) handleResize();
		}
	});
	var canvas_1 = root$1();
	bind_this(canvas_1, ($$value) => canvas = $$value, () => canvas);
	append($$anchor, canvas_1);
	pop();
}
//#endregion
//#region src/routes/tests/sonogram/+page.svelte
var root = from_html(`<div style="height: 300px; background: black;"><!></div>`);
function _page($$anchor, $$props) {
	push($$props, true);
	let analyzer;
	onMount(() => {
		const audioCtx = new AudioContext();
		analyzer = audioCtx.createAnalyser();
		const osc = audioCtx.createOscillator();
		osc.connect(analyzer);
		analyzer.connect(audioCtx.destination);
		osc.start();
	});
	var div = root();
	var node = child(div);
	var consequent = ($$anchor) => {
		Sonogram($$anchor, { get analyzer() {
			return analyzer;
		} });
	};
	if_block(node, ($$render) => {
		if (analyzer) $$render(consequent);
	});
	reset(div);
	append($$anchor, div);
	pop();
}
//#endregion
export { _page as component };
