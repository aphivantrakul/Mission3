// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

import { ipcRenderer } from "electron";
import { QuestionsObject } from "./main";

window.addEventListener("DOMContentLoaded", () => {
	ipcRenderer.on("questions", function (event: Electron.IpcRendererEvent, questions: QuestionsObject) {
		for (const [questionNum, question] of Object.entries(questions)) {
			let element: HTMLHeadElement = document.createElement("h3");
			element.setAttribute("id", questionNum);
			element.innerHTML = question;
			
			element.addEventListener("click", function(){
				ipcRenderer.send("questionClicked", questionNum);
			});

			document.body.appendChild(element);
		}
	});
});

