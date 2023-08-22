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
let operand = "0";
let operation = null;

numberBtns.forEach((btn) => {
    btn.onmousedown = (e) => inputNumber(btn.dataset.value);
});

operationBtns.forEach((btn) => {
    btn.onmousedown = (e) => inputOperation(btn.dataset.operation);
});

clearAllBtn.onmousedown = (e) => {resetLogic(); resetDisplay()};

clearCurrentBtn.onmousedown = (e) => {
    if (!writeNewNumber) {resetLogic(); resetDisplay()};

    operand = "0";

    currentInput.innerHTML = operand;
};

eraseBtn.onmousedown = (e) => {
    if (!writeNewNumber) {resetLogic(); resetDisplay()};

    const hasSign = operand.toString().includes("-");
    if (operand.length === 1 + (hasSign ? 1 : 0)) {
        operand = "0";
    } else {
        operand = operand.toString().slice(0,operand.toString().length-1);
    }
    currentInput.innerHTML = operand;
};

negateBtn.onmousedown = (e) => {
    if (operand === "0") return;

    operand = operand * -1;
    currentInput.innerHTML = operand;
};

decimalBtn.onmousedown = (e) => {
    if (operand.toString().includes(".")) return;

    operand += ".";
    currentInput.innerHTML = operand;
};

equalBtn.onmousedown = (e) => operate();

const roundNumber = (number, decPlaces) => Math.round(number * 10**decPlaces) / 10**decPlaces;

const getSigned = (number, sign, round=true) => (sign === -1 ? "-" : "") + (round ? roundNumber(number, 3) : number);

const resetLogic = () => {
    memory = "0";
    operand = "0";
    operation = null;
    writeNewNumber = true;
}

const resetDisplay = () => {
    lastOperation.innerHTML = "";
    currentInput.innerHTML = operand;
}

const inputNumber = (number) => {
    if (operand.length >= 16) return;
    if (!writeNewNumber) {resetLogic(); resetDisplay()};

    operand = operand === "0" ? number.toString() : operand + number;
    currentInput.innerHTML = operand;
};

const inputOperation = (newOperation) => {
    memory = operand;
    operand = "0";
    operation = newOperation;
    writeNewNumber = true;

    lastOperation.innerHTML = `${memory} ${operation}`;
};

const operate = () => {
    lastOperation.innerHTML = operation ? `${+memory} ${operation} ${+operand} = ` : `${+operand} = `;

    switch (operation) {
        case "/":
            if (+operand === 0) {
                currentInput.innerHTML = "err";
                resetLogic();
                return;
            }
            operand = +memory / +operand;
            break;
        case "*":
            operand = +memory * +operand;
            break;
        case "-":
            operand = +memory - +operand;
            break;
        case "+":
            operand = +memory + +operand;
            break;
    }

    operation = null;
    writeNewNumber = false;
    
    currentInput.innerHTML = operand;
};

window.onload = () => {resetLogic(); resetDisplay()};