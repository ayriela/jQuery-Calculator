const express = require('express');

const app = express();
const PORT = 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true})); 

//create array to store history
const pastOperations=[];

app.use(express.static('server/public'));

//send the calculated result
app.get('/equals', (req, res) => {
    res.send(result.toString());
}); 

//send the historic calculations
app.get('/past', (req,res)=>{
    res.send(pastOperations);
});

let operator;

//get the user entered operator
app.post('/operator', (req,res)=>{
    operator=req.body.value;
    res.sendStatus(200);
});

//get the numbers and push operation object
app.post('/equals', (req, res) => {
    let math=req.body;
    //calculate result variable
    calculate(math);
    //push the new calculation object
    pastOperations.push({
        num1: math.num1,
        num2: math.num2,
        operator: operator,
        calculation: result.toString()
    })
    //reset operator
    operator='';
    //reset result
    result='';
    console.log(result);
    res.sendStatus(200);
});

//create result to hold calculation
let result;

function calculate(object){
    if (operator=='plus'){
        result=Number(object.num1) + Number(object.num2);
        operator='+';
    } else if (operator=='minus'){
        result=object.num1 - object.num2;
        operator='-';
    } else if (operator=='multiply'){
        result=object.num1 * object.num2;
        operator='*';
    } else {
        ///REMEMBER TO CATCH CASE WHERE USE HASN"T ENTERED A NEW OPERATION and clear old selection
        result=object.num1 / object.num2;
        operator='/';
    }
}



app.listen(PORT, () => {
    console.log('listening on port', PORT)
});