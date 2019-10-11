const express = require('express');

const app = express();
const PORT = 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true})); 

const pastOperations=[];

app.use(express.static('server/public'));

app.get('/equals', (req, res) => {
    res.send(result);
}); 

app.get('/past', (req,res)=>{
    res.send(pastOperations);
});

app.post('/equals', (req, res) => {
    let math=req.body
    calculate(math);
    pastOperations.push({
        num1: math.num1,
        num2: math.num2,
        operator: math.operator,
        calculation: result
    })
    console.log(result);
    res.sendStatus(200);
});

//create result to hold calculation
let result; 

function calculate(object){
    if (object.operator=='plus'){
        result=Number(object.num1) + Number(object.num2);
    } else if (object.operator=='minus'){
        result=object.num1 - object.num2;
    } else if (object.operator=='multiply'){
        result=object.num1 * object.num2;
    } else {
        ///REMEMBER TO CATCH CASE WHERE USE HASN"T ENTERED A NEW OPERATION and clear old selection
        result=object.num1 / object.num2;
    }
}



app.listen(PORT, () => {
    console.log('listening on port', PORT)
});