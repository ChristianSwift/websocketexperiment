const WebSocket = require('ws');
const FogID = '0122';
const ws = new WebSocket('ws://127.0.0.1:9000/'+FogID);
ws.onopen = function(){  
    console.log("WS Connection Start.");
    ws.send("hello");
};
ws.onmessage = function(evt){
    console.log(evt.data)
    ws.send("Received!")
};
ws.onclose = function(evt){
    console.log("WS Connection Closed!");
};
ws.onerror = function(evt){
    console.log("WS Connection Error!");
};