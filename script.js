const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', getInput));
let input ='';

function createEquation() {
    const equation = {};
    equation.input1;
    equation.input2;
    equation.output;
    equation.operatorSelected;

    return equation;
};


let newEquation = createEquation();
console.log(newEquation)
const box = document.querySelector('.display p');

function updateDisplay(string){
    box.firstChild.data = string;
}
function clearCalculator(){
    updateDisplay('0');
    newEquation = null;
    return;
}

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

function storeNumber(input){
    input.includes('.') ? parseFloat(input) : parseInt(input);
}

function getString(){}

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
            input2.replace(/=/gi,'');
    
            input2 = storeNumber(input2);
            // console.log(input2)
            // console.log(typeof input2)
            operate(input1, input2, operatorSelected)
            updateDisplay(output);
            break;
    
        case '+' ||  '-' ||  '/' || '*':    
            operatorSelected = key;
       
            updateDisplay(key);
        
            x.input1 = storeNumber(input1);
            console.log(newEquation.input1)
        //TO DO
        case 'plus/minus':
            console.log('toggle neg/pos or multiply by -1(?)');
            break;

        default:
 
        updateDisplay(key);
        //store operator
        getString(key);
        }

    
    //then it is first input
    if(newEquation.operatorSelected == undefined){   
        console.log(typeof input1)
        if(input1==''){
            input1 = key;
        }
        else{
            input1 += key;
            updateDisplay(input1)
        }
    }
    
    if(operatorSelected != undefined){
        if(key == '0' && operatorSelected == '/'){
            updateDisplay('Error');
            
            return;
        }

        else if (input2 == ''){
            x.input2 = key;
            x.input2.replace(/[\+\-\*\/]/gi,'');
            updateDisplay(input2);
        }
        else{
            x.input2 += ""+key;
            updateDisplay(x.input2);
        }
    }
    

   
    console.table(newEquation )
}



//Create a new function operate that takes an operator and 2 
//numbers and then calls one of the above functions on the numbers.
function operate(num1,num2,operator){
 //   console.log(num1,num2,operator);
   // console.log(typeof num1, typeof num2, typeof operator)
    switch(operator){
        case '+':
            output = add(num1,num2);
            break;

        case "-":
            output =subtract(num1,num2);
            break;

        case '*':
            output =multiply(num1,num2);
            break;

        case '/':
            output =divide(num1,num2);
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
