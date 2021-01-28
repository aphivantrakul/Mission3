"use strict";
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
window.addEventListener("DOMContentLoaded", function () {
    electron_1.ipcRenderer.on("questions", function (event, questions) {
        var _loop_1 = function (questionNum, question) {
            var element = document.createElement("h3");
            element.setAttribute("id", questionNum);
            element.innerHTML = question;
            element.addEventListener("click", function () {
                electron_1.ipcRenderer.send("questionClicked", questionNum);
            });
            document.body.appendChild(element);
        };
        for (var _i = 0, _a = Object.entries(questions); _i < _a.length; _i++) {
            var _b = _a[_i], questionNum = _b[0], question = _b[1];
            _loop_1(questionNum, question);
        }
    });
});
