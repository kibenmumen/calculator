const calculator = document.querySelector("#calculator");
const previousOperand = document.querySelector(".user-input");
const currentOperand = document.querySelector(".output");

let operator = '';



calculator.addEventListener('click', e => {
    //Check if click is on the button and not on the container
    if (!e.target.closest('button')) return;

    const key = e.target;
    const keyValue = key.textContent;
    let previousOperandDisplay = previousOperand.textContent;
    let currentOperandDisplay = currentOperand.textContent;
    const { type } = key.dataset;
    lastKeyPressed = type;
    console.log(type);
    const prev = previousOperandDisplay;
    const current = currentOperandDisplay;
    //Update Display
    if (type === 'number') {
        const digits = currentOperandDisplay + keyValue;
        currentOperand.textContent = parseFloat(digits);
        //currentOperand.textContent = parseFloat(digits).toLocaleString('en-US');
    } else if (type === 'operator') {
        //operator = keyValue;
        console.log(keyValue);
        const prev = previousOperandDisplay;
        const current = currentOperandDisplay;
        //Compute if previous and current display is filled
        if (currentOperandDisplay !== '' && previousOperandDisplay !== '' && operator !== '') {
            previousOperand.textContent = `${operate(prev, current) + keyValue}`;
            currentOperand.textContent = '';
            operator = keyValue;
        } else if (currentOperandDisplay !== '') {
            //Update Previous Operand Display
            previousOperand.textContent = currentOperandDisplay + keyValue;
            currentOperand.textContent = '';
            operator = keyValue;
        }


    } else if (type === 'decimal') {
        if (currentOperandDisplay.includes('.')) return
        currentOperand.textContent = (currentOperandDisplay === '') ? '0.' : currentOperandDisplay + '.';
    }
    else if (type === 'allClear') {
        allClear();
    } else if (type === 'delete') {
        deleteLastDigit();
    } else if (type === 'equals') {
        if (currentOperandDisplay === '' || previousOperandDisplay === '') return
        let result = parseFloat(operate(prev, current));
        currentOperand.textContent = (currentOperandDisplay.includes('.')) ? result.toFixed(2) : result;
        previousOperand.textContent = '';
    }

})





const add = (a, b) => { return a + b }
const subtract = (a, b) => { return a - b };
const multiply = (a, b) => { return a * b };
const divide = (a, b) => { return a / b };
const remainder = (a, b) => { return a % b };

const operate = (firstNum, secondNum) => {
    let a = parseFloat(firstNum);
    let b = parseFloat(secondNum);
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '×': return multiply(a, b);
        case '÷': return (b !== 0) ? divide(a, b) : 0;
        case '%': return remainder(a, b);
        default: return ('somethings wrong');
    }
};


const allClear = () => {
    currentOperand.textContent = '';
    previousOperand.textContent = '';
    operator = '';
}

const deleteLastDigit = () => {
    const currentOperandDisplay = currentOperand.textContent;
    currentOperand.textContent = currentOperandDisplay.toString().slice(0, -1);
}