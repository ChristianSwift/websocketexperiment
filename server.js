const readline = require('readline');
const WebSocket = require('ws');
const cmd = readline.createInterface(process.stdin, process.stdout);
clients = new Array();
const wss = new WebSocket.Server({ port: 9000 });

wss.on('listening', function listening(res, req) {
    cmd.setPrompt('Cloud Console> ');
    cmd.prompt();
    cmd.on('line', function(line) {
        line = line.trim();
        switch(line.split(" ")[0]){
            case "help":
                console.log("Type 'show' to see all fog.");
                break;
            case "show":
                console.log(clients);
                break;
            case "open":
                if (line.split(" ")[1].length!=8){
                    console.log("Wrong lock ID, Please check.")
                }else{
                    console.log("Lock No."+line.split(" ")[1]+" will open!");
                }
                break;
            case "com":
                try {
                    clients[line.split(" ")[1]].send(line.split(" ")[2]);
                } catch (e) {
                    console.warn("Fog do not exist or invalid!");
                }
                break;
            case "bdc":
                res.send("echo");
                break;
            default:
                console.warn("Unacceptable command!");
                break;
        }
        cmd.prompt();
    });

    cmd.on('close', function() {
        console.log('Terminated!');
        process.exit(0);
    });
});

wss.on('connection', function connection(res, req) {
    clients[req.url.split("/")[1]]=res;
    res.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    
});
