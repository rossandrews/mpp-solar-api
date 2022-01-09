var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(
  cors({
    origin: "*", //TODO: lock this down with a proper whitelist
  })
);

var mqtt = require("mqtt");

const port = 3002
app.listen(port, function () {
  console.log("Example app listening at port " + port);
});

app.get("/runCommand", (req, res, next) => {
  var command = req.query.command;
  console.log("Command received: " + command);

  var commandTopic = "mpp-solar/api-client";
  
  //This can be changed if you want to use a different topic for the response
  var responseTopicBase = commandTopic+"/requests/"; 
  var responseTopic = responseTopicBase + command;

  console.log("ResponseTopic: " + responseTopic);
  var clientCommand = mqtt.connect("mqtt://localhost", {
    clientId: "demo-client",
  });
  clientCommand.on("connect", function () {
    clientCommand.subscribe([responseTopic], { qos: 0 });
  });
  
  clientCommand.on("message", function (topic, message, packet) {
    console.log(message.toString())
    if (topic == responseTopic) {
      res.json(message.toString());
    }

    clientCommand.end();
  });

  const commandObj = {command: command, topic: responseTopicBase};
  const commandJSON = JSON.stringify(commandObj);
  console.log(JSON.stringify(commandObj));

  clientCommand.publish(commandTopic, commandJSON);

  timer = setTimeout(function () {
    if (!messageSent) {
      console.log("timeout");
      res.status(200).json("no response");
      res.end();
    }
  }, 10000);
});


