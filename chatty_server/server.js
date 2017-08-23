const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  console.log(wss.clients.size);
  ws.on('message', function incoming(message) {
    let parsedMessage = JSON.parse(message)

    if (parsedMessage.type === 'postMessage') {
      let parsedObject = {
        id: uuidv1(),
        username: parsedMessage.username,
        content: parsedMessage.content,
        type: "incomingMessage"
      };
      console.log(`User ${parsedObject.username} said ${parsedObject.content}`);
      wss.broadcast(JSON.stringify(parsedObject));
    } else if (parsedMessage.type === 'postNotification' ) {
      let parsedObject = {
        id: uuidv1(),
        content: parsedMessage.content,
        type: "incomingNotification"
      };

      wss.broadcast(JSON.stringify(parsedObject));
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

// Broadcast to all
wss.broadcast = function broadcast(messages) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messages);
    }
  });
};