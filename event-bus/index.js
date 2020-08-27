const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

//listen on a port
app.listen("4005", () => {
  console.log("listening on 4005");
});

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://posts-clusterip-srv:4000/event", event);
  axios.post("http://comments-srv:4001/event", event);
  axios.post("http://query-srv:4002/event", event);
  axios.post("http://moderation-srv:4003/event", event);

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});
