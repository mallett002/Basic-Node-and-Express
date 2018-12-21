var express = require("express");
var app = express();

// app.METHOD(PATH, HANDLER);

// --> 7)  Mount the Logger middleware here

// --> 11)  Mount the body-parser middleware  here

/** 1) Meet the node console. */

/** 2) Start a working Express Server------------------------------------*/
// If you had a website at “example.com/” and wanted to serve a string
// such as “Hello World” to whoever visits the root domain you could do
// so easily using node and/or express:
app.get("/", (req, res) => {
  res.send("Hello Express!");
});

/** 3) Serve an HTML file ------------------------------------------------*/
// res.sendFile(absolutePath)

// The sendFile sets appropriate headers to tell your browser how to handle..
// ..the file you want to send

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

/** 4) Serve static assets  ---------------------------------------------*/
// middleware function: express.static(path)
// where path parameter is absolute path of folder containing assets
// Mount middleware with app.use(pathToApply, middlewareFunction)
// If no pathToApply, will be executed on all requests

// To serve a static webpage from the “views” folder:
app.use(express.static(__dirname + "/views"));

/** 5) Serve JSON on a specific route-------------------------------------*/
// Create an API that responds at path "/json"
app.get("/json", (req, res) => {
  res.json({ message: "Hello json" });
});

/** 6) Use the .env file to configure the app -----------------------------*/
// Used to pass environment variables to your app
// process.env = global Node object
// variable accessible through process.env.VAR_NAME

// Adding an env variable as config option:
app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    return res.json({ message: "HELLO JSON" });
  } else {
    return res.json({ message: "Hello Json" });
  }
});

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

/** 8) Chaining middleware. A Time server */

/** 9)  Get input from client - Route parameters */

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

/** 12) Get data form POST  */

// Tell the express app on which port to listen:
app.listen(process.env.PORT || 3000);

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
