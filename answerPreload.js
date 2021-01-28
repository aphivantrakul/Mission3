"use strict";
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
window.addEventListener("DOMContentLoaded", function () {
    electron_1.ipcRenderer.on("answer", function (event, answer) {
        document.querySelector("h1").innerHTML = answer;
    });
});
