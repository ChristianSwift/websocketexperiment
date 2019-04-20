const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.post('/api', function(req, res){
    console.log(req.body);
    res.send("Received!");
});
app.listen(3000);