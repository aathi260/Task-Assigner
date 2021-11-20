const express = require("express");
const cors = require("cors");
const Pusher = require("pusher");

//Configuration of Pusher//
const pusher = new Pusher({
  appId: "1296215",
  key: "7f23f5e83ed98dd456fe",
  secret: "876cf0bca09adec4b042",
  cluster: "ap2",
  useTLS: true,
});

const app = express();

//Initiating different ports for app/
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.use(express.json());

//Post request which acquires data from frontend and forwards it to pusher//
app.post("/api/tasks", async (req, res) => {
  await pusher.trigger("task", "newTask", {
    taskName: req.body.taskName,
    projectName: req.body.projectName,
    billable: req.body.billable,
  });

  res.json([]);
});

app.delete("/api/tasks/:id", async (req, res) => {
  await pusher.trigger("task", "deleteTask", {
    id: req.params.id,
  });
  console.log(req.params);
  res.json([]);
});

//Listening to the PORT 8000//
console.log("listening to port 8000");
app.listen(8000);
