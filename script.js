const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', getInput));
let input ='';

function createEquation() {
    const mathEquation = {
        input1: undefined,
        input2: undefined,
        output: undefined,
        operatorSelected: undefined,
        outputStored: false
    };
   
    return mathEquation;
};


let equation = createEquation();

console.log(equation)
const box = document.querySelector('.display p');

function updateDisplay(string){
    box.firstChild.data = string;
}
function clearCalculator(){
    updateDisplay('0');
    equation = createEquation();
    input = '';
    return;
}

function divisbleByZeroError(){
    if (equation.input2 == 0)
    {
        return true;
    }
    return false;
}

function deleteValues(){
// function deleteValues(){ //str = str.substr(0,str.length-1);
//     let storedValue;
//     if(input2 != '' ){


//         storedValue = input2;
//         updateDisplay(input2);

//         if(storedValue.length >= 0){
//             input2 = storedValue.replace('storedValue.length', '');
//             updateDisplay(input2);
//         }
//         if (storedVaue.length <= -1){
//             input2 = undefined;
//             updateDisplay(operatorSelected);
//         }
//     }

//     else if (input2 == '' && operatorSelected != undefined){
//         operatorSelected.replace('storedValue.length', '');
//         operatorSelected = undefined;
//         updateDisplay(input1);
//     }  
//     else{
//          if(input1.length > 0){
//             storedValue.replace('storedValue.length', '');
//         }
//         else{
//             input1 = '';
//             updateDisplay('0');
//         }
//     }
// }
}
function storeNumber(input){
    if(typeof input != 'string') {
        input = input.toString();
    }
if (input.includes('.')){
 return parseFloat(input) 
}
 else{
    return parseInt(input);
 }
}

//has total and uses total in next operations
function hasOutput(operator){
    if(equation.output != undefined) {
        equation.operatorSelected = operator;
        equation.input1 = equation.output;
        equation.input2 = undefined;
        equation.outputStored = true;
    }
}
function hasManyOperators(nextOperator){
    //has chained operations without total 9+9+9
    if (equation.operatorSelected != undefined) {
        operate(equation.input1, equation.input2, equation.operatorSelected);
        updateDisplay(equation.output);
        equation.input1 = equation.output;
        equation.input2 = undefined;
    }
}

function getInput(){
    const key = this.getAttribute('data-key');
    switch(key){
        
        case 'clear':
            clearCalculator();
            break;
        
        case 'delete':
            deleteValues();
            break;
    
        case '=' :
            if(equation.output == undefined){ 

                updateDisplay('Error');
                break;
            }
            operate(equation.input1, equation.input2, equation.operatorSelected)
            updateDisplay(equation.output);
            break;
        
        case '*':
        case '/':
        case '-':
        case '+':    
            
            hasOutput(key);

            if(equation.outputStored) {
                hasManyOperators(key);
            }

            equation.operatorSelected = key;
            updateDisplay(key);
            input = '';
            break;

        case 'plus-minus':
            Math.sign(input) == 1 ? input = -Math.abs(input) : input = Math.abs(input);s
            updateDisplay(input);
            equation.operatorSelected == undefined ? equation.input1 = storeNumber(input):   equation.input2 = storeNumber(input);
            break;

        default:   
            input += key;
        
            equation.operatorSelected == undefined ? equation.input1 = storeNumber(input):   equation.input2 = storeNumber(input);
        
            updateDisplay(input);
        }
    
    console.table(equation )
}



//Create a new function operate that takes an operator and 2 
//numbers and then calls one of the above functions on the numbers.
function operate(num1,num2,operator){
 //   console.log(num1,num2,operator);
   // console.log(typeof num1, typeof num2, typeof operator)
    switch(operator){
        case '+':
            equation.output = add(num1,num2);
            break;

        case "-":
            equation.output = subtract(num1,num2);
            break;

        case '*':
            equation.output = multiply(num1,num2);
            break;

        case '/':
            equation.output =divide(num1,num2);
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
    const isError = divisbleByZeroError();
    if(isError){
        equation.output='undefined';
        return;
    };
    return num1 / num2;
}
function multiply(num1,num2){
    return num1 * num2;
}
