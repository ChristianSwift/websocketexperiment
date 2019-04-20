const WebSocket = require('ws');
clients = new Array();
const wss = new WebSocket.Server({ port: 9000 });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

wss.on('listening', function listening(res, req) {
    app.post('/open', function(req, res){
        console.log(req.body);
        clients[req.body.fid].send("open");
        res.send("Received!");
    });
});

wss.on('connection', function connection(res, req) {
    clients[req.url.split("/")[1]]=res;
    res.on('message', function incoming(message) {
        console.log('received: %s', message);
    }); 
});

app.listen(3000);