

var btnDecimal = document.getElementById('calc-decimal'),
btnClear = document.getElementById('calc-clear'),
btnBackspace = document.getElementById('calc-backspace'),
currentDisplayElement = document.getElementById('calc-display-val'),
currentDisplay = '0',
pendingValue,
evalStringArray = [],
allNumBtns = document.getElementsByClassName('calc-btn-num'),
allOperatorBtns = document.getElementsByClassName('calc-btn-operator'); 

//Updates the value being displayed to the current display value. 
//Grabs the number of the button being pressed, adds it to the number to be displayed and displays it.
var updateDisplayVal = (e) => {
    var btnText = e.target.innerText;

    if(currentDisplay==='0'){
        currentDisplay = '';
    }

    currentDisplay += btnText; 
    currentDisplayElement.innerText = currentDisplay; 
}

//Helper method for performOperation function. 
//Saves the current val, displays the number the user clicked on and then adds the original current val and the passed in parameter (an operator)
// to the evalutation array. 
var addToArray = (operatorForArray) => {
    pendingVal = currentDisplay; 
    currentDisplay = '0'; 
    currentDisplayElement.innerText = currentDisplay; 
    evalStringArray.push(pendingVal); 
    evalStringArray.push(operatorForArray); 
}

//Depending on operator, different mathematical symbols are added to the evaluation array
var performOperation = (e) => {
    var operator = e.target.innerText;

    //operator for division was '÷' and the switch statement case wasn't recognising the symbol.
    if(e.target.id==='calc-divide'){
        operator='/';
    }
    switch(operator){
        case '+':
            addToArray('+');
            break;
        case '-':
            addToArray('-');
            break;
        case 'x':
            addToArray('*');
            break;
        case '/':
            addToArray('/');
            break;  
        case '=':
            //when = is pressed, the current val is pushed to evaluation string array. We then join the array String items and ensure there is a space between them.
            //This string can then be evaluated using javascripts eval() function. The result becomes the current val to be displayed and the evaluation array is cleared. 
            evalStringArray.push(currentDisplay); 
            var evaluation = eval(evalStringArray.join(' ')); 
            currentDisplay = evaluation +''; 
            currentDisplayElement.innerText = currentDisplay; 
            evalStringArray = [];
            break;
        default:
            break;
    }
}

//click event listeners 
for(let i=0; i<allNumBtns.length; i++){
    allNumBtns[i].addEventListener('click', updateDisplayVal, false); 
}
for(let i=0; i<allOperatorBtns.length; i++){
    allOperatorBtns[i].addEventListener('click', performOperation, false); 
}

//On click action for the clear button
btnClear.onclick = () => {
    currentDisplay = '0';
    pendingVal = undefined;
    evalStringArray = [];
    currentDisplayElement.innerText = currentDisplay; 
}

//On click action for back space, utilising javascripts the String protoypes .slice() function.
btnBackspace.onclick = () => {
    let lengthOfCurrentDisplay = currentDisplay.length; 
    currentDisplay = currentDisplay.slice(0, lengthOfCurrentDisplay-1);
    if(currentDisplay===''){
        currentDisplay = 0; 
    }
    currentDisplayElement.innerText = currentDisplay; 
}

//On click action for decimal button.
//Ensures decimal can only be used once in a number to avoid 3.22.2 etc
btnDecimal.onclick = () => {
    if(!currentDisplay.includes('.')){
        currentDisplay = currentDisplay+ '.';
    }
    currentDisplayElement.innerText = currentDisplay; 
}
