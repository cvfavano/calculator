const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', getInput));

//const deleteButton = document.querySelector('.delete');
//deleteButton.addEventListener('click', deleteValue);
let input ='';

const box = document.querySelector('.display > p');
let decimalButton = document.querySelector('button#decimal');

function createEquation() {
    const mathEquation = {
        input1: undefined,
        input2: undefined,
        output: undefined,
        operatorSelected: undefined,
        hasDecimal: false,
        isActive : 'input1'
        // input2Active: false,
        // operatorSelectedActive: false,
        // outputActive: false
    };

    decimalButton.disabled = false;

    return mathEquation;
};

let equation = createEquation();

console.log(equation)

  


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
    return equation.input2 == 0 ?  true : false;
}

function deleteValue(){  deleteValue:{

   // if (equation[equation.isActive]) == output
let 
     current = equation.isActive ;
console.log(current);
    if (current == 'input1' && input == ''){
        break deleteValue;
    }
    

    let newNumber = current.toString();
    input = newNumber.substring(0,newNumber.length-1);
    
    console.log('here ' +current);
    console.log('here 2 '+newNumber);
    
    //store number, find how to find current number
    updateDisplay(input);

    disableDecimal();
    console.log(input.length )
    if (input.length > 0){
        equation[equation.isActive] = storeNumber(input);
        updateDisplay(input);
    }
    else {

        //last case input1 is undefined 
        equation[equation.isActive] = undefined;
        input = '';
        updateDisplay(0);
    }
    console.log(input);
    console.log(equation)
}
}

function storeNumber(value){
    if(typeof value != 'string') {
        value = input.toString();
    }
    if(value.includes('.')){
        equation.hasDecimal = true;
        return parseFloat(value);
    }
    else{
        return parseInt(value);
    }   
}

//has total and uses total in next operation
function hasOutput(operator){
    if(equation.output != undefined) {
        equation.operatorSelected = operator;
        updateDisplay(equation.operatorSelected);
        equation.isActive = 'operator';
        
        input = '';
    }
}
function hasManyOperators(nextOperator){
    //has chained operations without total 9+9+9
    if (equation.operatorSelected != undefined) {
        
        operate(equation.input1, equation.input2, equation.operatorSelected)
            
        updateDisplay(equation.output);
        equation.input1 =  equation.output;
        equation.operatorSelected = nextOperator;
        equation.output = undefined;
        equation.isActive = 'operator';
            
        input = '';
    }
}

function disableDecimal(){

    if(input == '') {
        decimalButton.disabled = false;
    }
    if(box.textContent.includes('.')){
        decimalButton.disabled = true;
    } 

    else { 
        decimalButton.disabled = false;
    }
}

function getInput(){
    const key = this.getAttribute('data-key');
   

    switch(key){
        
        case 'clear':
            clearCalculator();
            break;
        
       case 'delete':
            deleteValue(input);
            break;
    
        case '=':
            operate(equation.input1, equation.input2, equation.operatorSelected)
            updateDisplay(equation.output);
          
            equation.isActive = 'operator';
            break;

        case '*':
        case '/':
        case '-':
        case '+':    
            
        if(equation.input1 && equation.input2 && equation.output){
            hasOutput(key);
            break;
        }
        //has many operators
        if(equation.input1 && equation.input2 && equation.output == undefined){
            hasManyOperators(key);
            break;
        }
        else {
            equation.operatorSelected = key;
            equation.isActive = 'operator';
            updateDisplay(key);
        }
            input = '';

            break;

        case 'plus-minus':
            Math.sign(input) == 1 ? input = -Math.abs(input) : input = Math.abs(input);
            updateDisplay(input);

            switch(equation.isActive) {
                case 'input1':
                    equation.input1 = storeNumber(input);
                    break;
                case 'input2':
                    equation.input2 = storeNumber(input);
                    break;
                case 'output':
                    equation.output = storeNumber(input);
                    break;
            }
            break;
        default:   
            input += key;
            if(equation.isActive == 'input1')  {
                equation.input1 = storeNumber(input);
            }    
            else {
                equation.input2 = storeNumber(input);
                equation.isActive = 'input2';
            }
            updateDisplay(input);
        }
    disableDecimal();
    console.table(equation);
}

function operate(num1,num2,operator){
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
            equation.output = divide(num1,num2);
            break;
    }
}

function getDecimalLength(input) {
    let x = String(input).split('.');
  
   if(x.length > 1 ) {
       return x[1].length
    }
    else  undefined;
}

function getMultiplier(input1,input2){
    const numberstring1 = String(input1);
    const numberstring2 = String(input2);
    let hasDecimal1 = getDecimalLength(input1);
    let hasDecimal2 = getDecimalLength(input2);

    let decimals;

    if( hasDecimal1 == undefined && hasDecimal2 == undefined) {
        equation.hasDecimal = false;

        //[multpiler,decimals]
        return [1,0];
    }
    if( hasDecimal1 == undefined) {
        decimals = String(input2).split('.')[1].length
    }
    if( hasDecimal2 == undefined) {
        decimals = String(input1).split('.')[1].length
    }
    if (hasDecimal1 != undefined && hasDecimal2 != undefined){
        hasDecimal1 = String(input1).split('.')[1].length;
        hasDecimal2 = String(input2).split('.')[1].length;
        if (hasDecimal1 > hasDecimal2 ) {
            decimals = hasDecimal1;
        }
        else {
            decimals = hasDecimal2;
        }

    }    
   
    let multiplier = '1';
    for(i = 0; i < decimals; i++) {
        multiplier += '0';
    }
    
    return [multiplier,decimals];
}


function add(num1,num2){
    if(equation.hasDecimal ){
        let multiplier = getMultiplier(num1, num2);
        return ((num1 * multiplier[0]) + (num2 * multiplier[0])) / multiplier[0];
    }
    else return num1 + num2;
}
function subtract(num1,num2){
    if(equation.hasDecimal){
        let multiplier = getMultiplier(num1, num2);
        return ((num1 * multiplier[0]) - (num2 * multiplier[0])) / multiplier[0];
    } 
    return num1 - num2;
}
function divide(num1,num2){
    const isError = divisbleByZeroError();
    if(isError){
        equation.output = 'undefined';
        return; 
    };

    if(equation.hasDecimal){
        let multiplier = getMultiplier(num1, num2);
        let quotient = (num1 * multiplier[0]) / (num2 * multiplier[0])
        return parseFloat(quotient.toFixed(multiplier[1]+1));
    }
    return num1 / num2;
}
function multiply(num1,num2){
    if(equation.hasDecimal){
        let multiplier = getMultiplier(num1, num2);
        let product = ((num1 ) * (num2 * multiplier[0])) / (multiplier[0]);
        return parseFloat(product.toFixed(multiplier[1]+1));
    }
    return num1 * num2;
}


// // // test cases weird math
// console.log(1.1 +1.3)
// console.log(3.025/2.2)
// console.log(3.5*2.21)
// console.log(1.1 +1.3 + .2)
// console.log((1.1 +1.3) + .2)
// console.log(32.09*100)