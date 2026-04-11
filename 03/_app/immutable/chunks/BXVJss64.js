import { A as from_html, O as append, U as user_effect, it as push, n as onDestroy, o as prop, r as onMount, rt as pop, u as bind_this } from "./Db9Uo94o.js";
import "./8XMRajqd.js";
//#region src/lib/components/Scope.svelte
var root = from_html(`<canvas style="width: 100%; height: 100%;"></canvas>`);
function Scope($$anchor, $$props) {
	push($$props, true);
	let buffer = prop($$props, "buffer", 3, void 0);
	let canvas;
	let ctx;
	let rafId = null;
	let resizeObserver;
	function resize() {
		if (!canvas) return;
		const parent = canvas.parentElement;
		if (!parent) return;
		const dpr = window.devicePixelRatio || 1;
		const width = parent.clientWidth;
		const height = parent.clientHeight;
		canvas.width = width * dpr;
		canvas.height = height * dpr;
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.scale(dpr, dpr);
	}
	function draw() {
		rafId = requestAnimationFrame(draw);
		if (!buffer()) return;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		ctx.clearRect(0, 0, width, height);
		ctx.beginPath();
		ctx.strokeStyle = "#0f0";
		const step = buffer().length * .5 / width;
		for (let i = 0; i < width; i++) {
			const y = (1 - ((buffer()[Math.floor(i * step)] || 0) + 1) / 2) * height;
			if (i === 0) ctx.moveTo(i, y);
			else ctx.lineTo(i, y);
		}
		ctx.stroke();
	}
	onMount(() => {
		ctx = canvas.getContext("2d");
		resize();
		resizeObserver = new ResizeObserver(resize);
		if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
		window.addEventListener("resize", resize);
		draw();
	});
	onDestroy(() => {
		if (rafId) cancelAnimationFrame(rafId);
		resizeObserver === null || resizeObserver === void 0 || resizeObserver.disconnect();
	});
	user_effect(() => {
		if (buffer()) {}
	});
	var canvas_1 = root();
	bind_this(canvas_1, ($$value) => canvas = $$value, () => canvas);
	append($$anchor, canvas_1);
	pop();
}
//#endregion
export { Scope as t };
