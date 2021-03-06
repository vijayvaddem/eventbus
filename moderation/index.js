const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.listen("4003", () => {
  console.log("listening on port 4003");
});

app.post("/event", async (req, res) => {
  /*  id: commentId,
      commentText,
      status: "pending",
      documentId: req.params.id,
      */

  const { type, data } = req.body;

  //console.log("Incoming event received for moderation:", type);
  console.log("Incoming data received for moderation:", data);

  if (type === "commentCreated") {
    const status = data.commentText.includes("orange")
      ? "rejected"
      : "approved";

    await axios.post("http://localhost:4005/events", {
      type: "commentModerated",
      data: {
        id: data.id,
        commentText: data.commentText,
        status,
        documentId: data.documentId,
      },
    });
  }

  res.send({});
});
