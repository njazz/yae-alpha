import "../chunks/Db9Uo94o.js";
import "../chunks/8XMRajqd.js";
import { t as FadersPage } from "../chunks/3Qe3_doK.js";
//#region src/routes/tests/faders_page/+page.svelte
function _page($$anchor) {
	function onFaderChange(index, value) {
		console.log("Fader:", index, value);
	}
	function onButtonChange(index, value) {
		console.log("Button:", index, value);
	}
	FadersPage($$anchor, {
		onFaderChange,
		onButtonChange
	});
}
//#endregion
export { _page as component };
