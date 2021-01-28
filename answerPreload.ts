// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

import { ipcRenderer } from "electron";

window.addEventListener("DOMContentLoaded", () => {
	ipcRenderer.on("answer", function (event: Electron.IpcRendererEvent, answer: string) {
		document.querySelector("h1")!.innerHTML = answer;
	});
});