// Modules to control application life and create native browser window
import {app, BrowserWindow, ipcMain, net} from "electron";
import * as path from "path";

export {QuestionsObject};

interface QuestionsObject  {[key: number]: string};
let questions: QuestionsObject;

let mainWindow: BrowserWindow;

async function createMainWindow(): Promise<void> {

	mainWindow = new BrowserWindow ({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js")
		}
	});

	try {
		questions = await getQuestions();
		await mainWindow.loadFile("index.html");
		mainWindow.webContents.send("questions", questions);
	} catch (error) {
		console.error(error);
	}
	
}

app.whenReady().then(() => {
	createMainWindow();

	app.on("activate", function () {
		if (BrowserWindow.getAllWindows().length === 0) {
			createMainWindow();
		}
	});

	mainWindow.on("closed", function () {
		app.quit();
	});
});

app.on("window-all-closed", function () {
  	if (process.platform !== "darwin") {
		app.quit();
	}
});

let answerWindow: BrowserWindow | null;

interface AnswersObject  {[key: number]: string};

let answers: AnswersObject;

ipcMain.on("questionClicked", async function(event: Electron.IpcMainEvent, questionNum: number) {
	if (answerWindow === null || answerWindow === undefined) {
		answerWindow = new BrowserWindow({
			width: 400,
			height: 300,
			webPreferences: {
				preload: path.join(__dirname, "answerPreload.js")
			}
		});

		try {
			answers = await getAnswers();
			await answerWindow.loadFile("answer.html");
		} catch(error) {
			console.error(error);
		}
	}

	answerWindow.webContents.send("answer", answers[questionNum]);

	answerWindow.on("closed", function() {
		answerWindow = null;
	});
});

function getQuestions(): Promise<QuestionsObject> {
 	 return new Promise<QuestionsObject>(function(resolve, reject) {

		const request: Electron.ClientRequest = net.request("http://localhost:3000/questions");

		request.on("response", (response: Electron.IncomingMessage) => {
			response.on("data", (data: Buffer) => {
				resolve(JSON.parse(data.toString()));
			});
		});

		request.end();

	});
}

function getAnswers(): Promise<AnswersObject> {
  return new Promise<AnswersObject>(function(resolve, reject) {

		const request: Electron.ClientRequest = net.request("http://localhost:3000/answers");

		request.on("response", (response: Electron.IncomingMessage) => {
			response.on("data", (data: Buffer) => {
				resolve(JSON.parse(data.toString()));
			});
		});

		request.end();

	});
}