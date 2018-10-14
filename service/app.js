const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const url = require('url');
const request = require('request');
const uuid = require('uuid/v4');
const dialogflow = require('dialogflow');

const dialogflowSessionClient = new dialogflow.SessionsClient();
const dialogflowProjectId = 'paradox-hack';
const dialogflowSessionId = uuid();
const dialogflowSessionPath = dialogflowSessionClient.sessionPath(dialogflowProjectId, dialogflowSessionId);

const app = express();

const server = require('http').Server(app);

// Socket.io is used to send messages to webapp
const io = require('socket.io')(server);

// Totally awesome and optimized storage in javascript object (please don't judge me)
const storage = {
  // This is the environment url
  apiUrl: "https://gapi-use1.genesyscloud.com",
  // This is the environment client id
  clientId: "b219ac0408a14a33ac4333382fc776c3",
  // This is the environment client secret
  clientSecret: "es33SiFOzMaaZ6KQ57jQ7L167owt2KOeaJq0BXEEdtlcY6V5",
  // This is your service port
  port: 3000,
  // This is needed as a header to authorize requests
  apiKey: "iB4b9IG8536FQCKiPlyXL9wJYfKbALKT4GZW9VGu"
};

// Serve webapp
app.use(express.static('webapp', {
  extensions: ['html', 'htm']
}));

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const nlp = require('./controllers/nlp');

require('./routes/nlp')(app, nlp, dialogflowSessionPath, dialogflowSessionClient);

server.listen(storage.port, () => {
  console.info(`Server started on port: ${storage.port}`);
});
