const express = require('express');

const app = express();
const PORT = 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true})); 

app.use(express.static('server/public'));


app.listen(PORT, () => {
    console.log('listening on port', PORT)
});