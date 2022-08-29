const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', getInput));
let input1, input2, output = 0;
let operatorSelected;
const box = document.querySelector('.display p');

function updateDisplay(string){
    const text = document.createTextNode(string);
    box.appendChild(text);
}

function clearCalculator(){
    box.innerHTML = '';
    updateDisplay('0');
    input1 =0;
    input2 = 0;
    operatorSelected = null;
    output = 0;
    return;
}

function deleteValues(){
    let storedValue;
    if(input2 != undefined){
        storedValue = input2;
        updateDisplay(input2);

        if(storedValue.length >= 0){
            input2 = storedValue.replace('storedValue.length', '');
            updateDisplay(input2);
        }
        if (storedVaue.length <= -1){
            input2 = undefined;
            updateDisplay(storedOperator);
        }
    }

    else if (input2 == undefined && storedOperator != undefined){
        operatorSelected.replace('storedValue.length', '');
        operatorSelected = undefined;
        updateDisplay(input1);
    }  
    else{
        if(input1.length >= 0){
            storedValue.replace('storedValue.length', '');
        }
        else{
            input1 = undefined;
            updateDisplay('0');
        }
    }
}


function getInput(e){
    const key = this.getAttribute('data-key');

    if(key == 'clear'){
        clearCalculator();
        return;
    }

    if (key == 'delete') {
        deleteValues();
        return;
    }
    updateDisplay(key);
    if (key == '+' || key == '-' || key == '/' || key == '*'){
        console.log(key);
        operatorSelected = key;
        box.innerHTML='';
        updateDisplay(key);

        if(input1.includes('.')){
            input1 = parseFloat(input1);
            console.log(input1)
            console.log(typeof input1);
        }
        else {
           input1 = parseInt(input1);
           console.log(input1)
           console.log(typeof input1);
        }

    }

    //then it is first input
    if(operatorSelected == undefined){    
        if(!input1){
        input1 = key;
         console.log(typeof(input1));
        console.log(input1)
        }
         input1 += ""+key;
        console.log(typeof(input1));
        console.log(input1)
    }
    
}



//Create a new function operate that takes an operator and 2 
//numbers and then calls one of the above functions on the numbers.
function operate(num1,num2,operator){
    switch(operator){
        case '+':
            add(num1,num2);
            break;

        case "-":
            subtract(num1,num2);
            break;

        case '*':
            multiply(num1,num2);
            break;

        case '/':
            divide(num1,num2);
            break;
    }
}

function add(num1,num2){
    return num1 + num2;
}
function subtract(num1,num2){
    return num1 - num2;
}
function divide(num1,num2){
    return num1 / num2;
}
function multiply(num1,num2){
    return num1 * num2;
}