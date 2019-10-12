$(document).ready(onReady);

function onReady(){
    //base $('.mathOp').on('click', setOperator);
    $('.mathOp').on('click', setCalcScreen);
    $('#equal').on('click', calculateResult);
    $('#clear').on('click',clearCalc);
}

/* base mode only
function setOperator(){
    //set value
    let operation=$(this).attr('id');
    $.ajax({
        type: 'POST',
        url: '/operator',
        data:{
            value: operation
        }
    }).then(function(){
        //format selected display
    });
}//end setOperator 
*/

//stretch set up calculator screen
function setCalcScreen(){
    let char=$(this).attr('id');
    let current=$('#calcScreen').val()
    $('#calcScreen').val(current+char);
}

function clearCalc(){
    $('#calcScreen').val('');
}

//function to parse input 
function calculateResult(){
    let current=$('#calcScreen').val();
    //look for + - * or \ in the calcScreen 
    let operator=current.match(/[\+|\*|\-|\/]/);
    //console.log(operator);
    //grab value before and after operator is found
    let num1=current.substring(0,operator.index);
    let num2=current.substring(operator.index+1,current.length+1);
    //pass values to server
    $.ajax({
        type: 'POST',
        url: '/equals',
        data: {
           num1: num1,
           num2: num2,
           operator: operator
        }
    }).then(function () {
        getResult();
        getPast();
    });
}

/*base mode function
function calculateResult(){
    $.ajax({
        type: 'POST',
        url: '/equals',
        data: {
           num1: $('#num1').val(),
           num2: $('#num2').val(),
        }
    }).then(function () {
        getResult();
        getPast();
    });
}
*/

function getResult(){
    $.ajax({
        type: 'GET',
        url: '/equals'
    }).then(function(response){
        $('#calcScreen').val(response);
        //base mode $('#result').text(response);
    });
}

function getPast(){
    $.ajax({
        type:'GET',
        url: '/past'
    }).then(function(response){
        //empty current past display
        $('#pastCalculations').empty();
        // append data to the DOM
        loopPast(response);
    });
}
function loopPast(array){
    array.forEach( function(item){
        $('#pastCalculations').append(`<li>
        ${item.num1} 
        ${item.operator} 
        ${item.num2} = 
        ${item.calculation}</li>`);
    });
}



