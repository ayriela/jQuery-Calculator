$(document).ready(onReady);

function onReady(){
    $('.mathOp').on('click', setOperator);
    $('#equal').on('click', calculateResult);
}

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

function getResult(){
    $.ajax({
        type: 'GET',
        url: '/equals'
    }).then(function(response){
        $('#result').text(response);
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
        $('#pastCalculations').append(`<li>${item.num1} ${item.operator} ${item.num2} = ${item.calculation}</li>`);
    });
}



