const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', getInput));
let input ='';

function createEquation() {
    const mathEquation = {};
    mathEquation.input1;
    mathEquation.input2;
    mathEquation.output;
    mathEquation.operatorSelected;

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
    //CHECK THIS
    equation = createEquation();
    input = '';
    return;
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
    input.includes('.') ? parseFloat(input): parseInt(input);
    
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
            operate(equation.input1, equation.input2, equation.operatorSelected)
            updateDisplay(equation.output);
            break;
        
        case '*':
        case '/':
        case '-':
        case '+':    
            equation.operatorSelected = key;
            updateDisplay(key);
            input = '';
        //TO DO
        case 'plus/minus':
            console.log('toggle neg/pos or multiply by -1(?)');
            break;

        default:
        
        //store operator
        input += key;
        
        if(equation.operatorSelected == undefined) {
            equation.input1 = storeNumber(input);
        }
        else {
            equation.input2 = storeNumber(input);
        }



        updateDisplay(input);
       

        }

    
    //then it is first input
    // if(newEquation.operatorSelected == undefined){   
    //     console.log(typeof input1)
    //     if(input1==''){
    //         input1 = key;
    //     }
    //     else{
    //         input1 += key;
    //         updateDisplay(input1)
    //     }
    // }
    
    // if(operatorSelected != undefined){
    //     if(key == '0' && operatorSelected == '/'){
    //         updateDisplay('Error');
            
    //         return;
    //     }

    //     else if (input2 == ''){
    //         x.input2 = key;
    //         x.input2.replace(/[\+\-\*\/]/gi,'');
    //         updateDisplay(input2);
    //     }
    //     else{
    //         x.input2 += ""+key;
    //         updateDisplay(x.input2);
    //     }
    // }
    
 console.log('input: ' + input);
   console.log(typeof input)
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
    return num1 / num2;
}
function multiply(num1,num2){
    return num1 * num2;
}
