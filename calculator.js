const lastOperation = document.querySelector(".last-operation");
const currentInput = document.querySelector(".current-input");
const clearAllBtn = document.querySelector(".clear-all");
const clearCurrentBtn = document.querySelector(".clear-current");
const eraseBtn = document.querySelector(".erase");
const negateBtn = document.querySelector(".negate");
const decimalBtn = document.querySelector(".decimal");
const equalBtn = document.querySelector(".equal");

const numberBtns = document.querySelectorAll(".number");
const operationBtns = document.querySelectorAll(".operation");

let writeNewNumber = true;
let memory = "0";
let memorySign = 1;
let operand = "0";
let operandSign = 1;
let operation = null;

numberBtns.forEach((btn) => {
    btn.onmousedown = (e) => {
        inputNumber(btn.dataset.value);
    }
});

operationBtns.forEach((btn) => {
    btn.onmousedown = (e) => {
        inputOperation(btn.dataset.operation);
    }
});

clearAllBtn.onmousedown = (e) => {
    resetLogic();
    resetDisplay();
};

clearCurrentBtn.onmousedown = (e) => {
    if (!writeNewNumber) resetLogic(); resetDisplay();

    operand = "0";

    currentInput.innerHTML = getSigned(operand, operandSign);
};

eraseBtn.onmousedown = (e) => {
    if (!writeNewNumber) resetLogic(); resetDisplay();

    if (operand.length === 1) {
        operand = "0"
        operandSign = 1;
    } else {
        operand = operand.toString().slice(0,operand.toString().length-1);
    }
    currentInput.innerHTML = getSigned(operand, operandSign);
};

negateBtn.onmousedown = (e) => {
    if (operand === "0") return;

    operandSign = operandSign === -1 ? 1 : -1;
    currentInput.innerHTML = getSigned(operand, operandSign);
};

decimalBtn.onmousedown = (e) => {
    if (operand.toString().includes(".")) return;

    operand += ".";
    currentInput.innerHTML = getSigned(operand, operandSign, false);
};

equalBtn.onmousedown = (e) => {
    operate();
};

const roundNumber = (number, decPlaces) => Math.round(number * 10**decPlaces) / 10**decPlaces;

const getSigned = (number, sign, round=true) => (sign === -1 ? "-" : "") + (round ? roundNumber(number, 3) : number);

const resetLogic = () => {
    memory = "0";
    memorySign = 1;
    operand = "0";
    operandSign = 1;
    operation = null;
    writeNewNumber = true;
}

const resetDisplay = () => {
    lastOperation.innerHTML = "";
    currentInput.innerHTML = getSigned(operand, operandSign);
}

const inputNumber = (number) => {
    if (getSigned(operand, operandSign, false).length >= 16) return;
    if (!writeNewNumber) {resetLogic(); resetDisplay()};

    operand = operand === "0" ? number.toString() : operand + number;
    currentInput.innerHTML = getSigned(operand, operandSign, false);
};

const inputOperation = (newOperation) => {
    memory = operand;
    memorySign = operandSign
    operand = "0";
    operandSign = 1;
    operation = newOperation;
    writeNewNumber = true;

    lastOperation.innerHTML = `${getSigned(memory, memorySign)} ${operation}`;
};

const operate = () => {
    let signedMemory = +getSigned(memory, memorySign);
    let signedOperand = +getSigned(operand, operandSign);

    lastOperation.innerHTML = operation ? `${signedMemory} ${operation} ${signedOperand} = ` : `${signedOperand} = `;

    switch (operation) {
        case "/":
            if (signedOperand === 0) {
                currentInput.innerHTML = "err";
                resetLogic();
                return;
            }
            operand = signedMemory / signedOperand;
            break;
        case "*":
            operand = signedMemory * signedOperand;
            break;
        case "-":
            operand = signedMemory - signedOperand;
            break;
        case "+":
            operand = signedMemory + signedOperand;
            break;
    }
    operandSign = operand < 0 ? -1 : 1;
    /* operand = getSigned(operand, operandSign); */
    operand *= operandSign;

    operation = null;
    writeNewNumber = false;
    
    currentInput.innerHTML = getSigned(operand, operandSign);
};

window.onload = () => {resetLogic(); resetDisplay()};