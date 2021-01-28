"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var server = http_1.default.createServer(function (req, res) {
    var path = req.url;
    var method = req.method;
    if (path === "/questions" && method === "GET") {
        var questions = {
            1: "What is your favorite color?",
            2: "What is your favorite food?",
            3: "What is your favorite animal?"
        };
        res.statusCode = 200;
        res.setHeader("content-Type", "application/json");
        res.end(JSON.stringify(questions));
    }
    else if (path === "/answers" && method === "GET") {
        var answers = {
            1: "Blue",
            2: "Sushi",
            3: "Cats & Dogs"
        };
        res.statusCode = 200;
        res.setHeader("content-Type", "application/json");
        res.end(JSON.stringify(answers));
    }
});
var hostname = "127.0.0.1";
var port = 3000;
server.listen(port, hostname, function () {
    console.log("Server running at http://" + hostname + ":" + port + "/");
});
