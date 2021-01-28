import http from "http";

const server: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
	const path: string | undefined = req.url;
	const method : string | undefined = req.method;
	
	if (path === "/questions" && method === "GET") {
		const questions: {[key: number]: string} = {
			1: "What is your favorite color?",
			2: "What is your favorite food?",
			3: "What is your favorite animal?"
		};

		res.statusCode = 200;
		res.setHeader("content-Type", "application/json");
		res.end(JSON.stringify(questions));
	} else if (path === "/answers" && method === "GET") {
		const answers: {[key: number]: string} = {
			1: "Blue",
			2: "Sushi",
			3: "Cats & Dogs"
		};

		res.statusCode = 200;
		res.setHeader("content-Type", "application/json");
		res.end(JSON.stringify(answers));
	}
});

const hostname: string = "127.0.0.1";
const port: number = 3000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});