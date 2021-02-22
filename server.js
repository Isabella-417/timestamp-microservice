// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

const getUTCTime = (date) => date.toUTCString();
const getUnixTime = (date) => Math.floor(date.getTime());
const getDateFromUnix = (unixTime) => new Date(unixTime * 1);

app.get("/api/timestamp/:date", (req, res) => {
  const input = req.params.date;
  const dateSelected = new Date(input);
  const isUnixTime = /\d{13,}/.test(input);

  if (isNaN(dateSelected) && !isUnixTime) {
    return res.json({ error: "Invalid Date" });
  }
  if (isUnixTime) {
    let date = getDateFromUnix(input);
    objResponse = { unix: Number(input), utc: getUTCTime(date) };
  } else {
    const unixTime = getUnixTime(dateSelected);
    const utc = getUTCTime(dateSelected);
    objResponse = { unix: Number(unixTime), utc: utc };
  }
  res.json(objResponse);
});

app.get("/api/timestamp/", (req, res) => {
  const originalDate = new Date();
  return res.json({
    unix: getUnixTime(originalDate),
    utc: getUTCTime(originalDate),
  });
});

var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
