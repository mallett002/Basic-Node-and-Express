var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// app.METHOD(PATH, HANDLER);

// --> 7)  Mount the Logger middleware here
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  // call next to end the response cycle
  next();
});

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({ extended: false }));

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

/** 7) Root-level Middleware - A logger ------------------------------------*/
// If only want to run middleware for posts use:
// app.post(middlewareFunction)
// app.get(middlewareFunction) for get etc...
// next() ends the cycle, if you don't call res.send

// mount a root level middeware, and log info about response
// Is mounted above (#7)

/** 8) Chaining middleware. A Time server -----------------------------------*/
// Mount a middleware at a specific route: app.METHOD(path, middlewareFunction)
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({ time: req.time });
  }
);

/** 9)  Get input from client - Route parameters ------------------------------------*/
// Route param /:word will be in req.params object with key "word"

// echo server mounted at "/:word/echo"
app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

/** 10) Get input from client - Query parameters -------------------------------------*/
// /name?first=<firstname>&last=<lastname>
// query params in req.query object

// api endpoint mounted at '/name'
// app.route(path).get(handler).post(handler) to chain diff handlers on same path route
app
  .route("/name")
  .get((req, res) => {
    const first = req.query.first;
    const last = req.query.last;
    res.send({ name: `${first} ${last}` });
  })
  .post((req, res) => {
    const first = req.query.first;
    const last = req.query.last;
    res.send({ name: `${first} ${last}` });
  });

/** 11) Get ready for POST Requests - the `body-parser` --------------------------------*/
// Place the bodyParser code before all the paths it will be used on!
// bodyParser placed above (#11)

/** 12) Mount a POST handler -----------------------------------------------------------*/
// First, mount a bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

// Mount the Post handler
app.post("/name", (req, res) => {
  const first = req.body.query.first;
  const last = req.body.query.last;
  res.json({ name: `${first} ${last}` });
});

// Tell the express app on which port to listen:
app.listen(process.env.PORT || 3000);

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
