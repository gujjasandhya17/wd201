const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

const args = minimist(process.argv.slice(2));
const port = args.port || 3000; // Default port if not provided

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("home.html", (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not Found");
      } else {
        res.write(data);
        res.end();
      }
    });
  } else if (req.url === "/project") {
    // Corrected route
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("project.html", (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not Found");
      } else {
        res.write(data);
        res.end();
      }
    });
  } else if (req.url === "/registration") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("registration.html", (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not Found");
      } else {
        res.write(data);
        res.end();
      }
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
