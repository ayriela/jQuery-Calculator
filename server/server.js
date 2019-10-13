const express = require('express');

const app = express();
const PORT = 5000;
const bodyParser = require('body-parser');
const Decimal = require('decimal.js');
app.use(bodyParser.urlencoded({extended: true})); 

//create array to store history
const pastOperations=[];

app.use(express.static('server/public'));

//send the calculated result
app.get('/equals', (req, res) => {
    //console.log('in send result');
    //console.log(result);
    res.send(result.toString());
}); 

//send the historic calculations
app.get('/past', (req,res)=>{
    res.send(pastOperations);
});

/*for base mode
let operator;

//get the user entered operator
app.post('/operator', (req,res)=>{
    operator=req.body.value;
    res.sendStatus(200);
});
*/

//get the numbers and push operation object
app.post('/equals', (req, res) => {
    let math=req.body;
    //reset result
    result='';
    //calculate result variable
    calculate(math);
    //for debug 
    //console.log(math.operator);
    //console.log(math.num1, 'and', math.num2);
    //push the new calculation object
    pastOperations.push({
        num1: math.num1,
        num2: math.num2,
        //flip back to just operator in base mode
        operator: math.operator,
        calculation: result.toString()
    })
    //reset operator for base mode only
    // operator='';
    res.sendStatus(200);
});

//create result to hold calculation
let result;

function calculate(object){
    //all object.operator flip to operator for base mode and uncomment operator set
    //also flip back to == 'plus' 'minus' and 'multiply'
    let one = new Decimal(object.num1);
    let two = new Decimal(object.num2);
    if (object.operator=='+'){
        //result=Number(object.num1) + Number(object.num2);
        result= one.plus(two);
        //operator='+';
    } else if (object.operator=='-'){
        //result=object.num1 - object.num2;
        result=one.minus(two);
        //operator='-';
    } else if (object.operator=='*'){
        //result=object.num1 * object.num2;
        result=one.times(two);
        //operator='*';
    } else {
        ///REMEMBER TO CATCH CASE WHERE USE HASN"T ENTERED A NEW OPERATION and clear old selection
        //result=object.num1 / object.num2;
        result=one.dividedBy(two);
        //operator='/';
    }
}



app.listen(PORT, () => {
    console.log('listening on port', PORT)
});