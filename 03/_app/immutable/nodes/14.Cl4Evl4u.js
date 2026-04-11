import { A as from_html, O as append, U as user_effect, it as push, o as prop, r as onMount, rt as pop, u as bind_this } from "../chunks/Db9Uo94o.js";
import "../chunks/8XMRajqd.js";
//#region src/lib/components/WaveformOverview.svelte
var root = from_html(`<canvas style="width: 100%; height: 100px; background: #111; border-radius: 4px;"></canvas>`);
function WaveformOverview($$anchor, $$props) {
	push($$props, true);
	let range = prop($$props, "range", 19, () => [-1, 1]), color = prop($$props, "color", 3, "#0af");
	let canvas;
	let ctx = null;
	function draw() {
		if (!$$props.buffer || !ctx || !canvas) return;
		const { width, height } = canvas;
		ctx.clearRect(0, 0, width, height);
		const [minY, maxY] = range();
		const yScale = height / (maxY - minY);
		const midY = height * (maxY / (maxY - minY));
		ctx.beginPath();
		ctx.moveTo(0, midY);
		const step = Math.ceil($$props.buffer.length / width);
		for (let x = 0; x < width; x++) {
			const start = x * step;
			let min = Infinity;
			let max = -Infinity;
			for (let i = 0; i < step; i++) {
				var _$$props$buffer;
				const v = (_$$props$buffer = $$props.buffer[start + i]) !== null && _$$props$buffer !== void 0 ? _$$props$buffer : 0;
				if (v < min) min = v;
				if (v > max) max = v;
			}
			ctx.lineTo(x, midY - max * yScale);
			ctx.lineTo(x, midY - min * yScale);
		}
		ctx.strokeStyle = color();
		ctx.lineWidth = 1;
		ctx.stroke();
	}
	function resizeCanvas() {
		if (!canvas || !ctx) return;
		const dpr = window.devicePixelRatio || 1;
		const rect = canvas.getBoundingClientRect();
		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.scale(dpr, dpr);
	}
	onMount(() => {
		if (!canvas) return;
		ctx = canvas.getContext("2d");
		if (!ctx) return;
		resizeCanvas();
		draw();
		const observer = new ResizeObserver(() => {
			resizeCanvas();
			draw();
		});
		observer.observe(canvas);
		const onResize = () => {
			resizeCanvas();
			draw();
		};
		window.addEventListener("resize", onResize);
		return () => {
			observer.disconnect();
			window.removeEventListener("resize", onResize);
		};
	});
	user_effect(() => {
		if (ctx && $$props.buffer) draw();
	});
	user_effect(() => {
		if (ctx && color()) draw();
	});
	user_effect(() => {
		if (ctx && range()) draw();
	});
	var canvas_1 = root();
	bind_this(canvas_1, ($$value) => canvas = $$value, () => canvas);
	append($$anchor, canvas_1);
	pop();
}
//#endregion
//#region src/routes/tests/waveform/+page.svelte
function _page($$anchor, $$props) {
	push($$props, true);
	let buffer = new Float32Array(2e3);
	setInterval(() => {
		for (let i = 0; i < buffer.length; i++) buffer[i] = Math.random() * 2 - 1;
		buffer = buffer;
	}, 200);
	WaveformOverview($$anchor, { get buffer() {
		return buffer;
	} });
	pop();
}
//#endregion
export { _page as component };
