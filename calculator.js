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

let resetOnInput = false;
let memory = "0";
let operand = "0";
let operation = null;

numberBtns.forEach((btn) => {
    btn.onmousedown = (e) => inputNumber(btn.dataset.value);
});

operationBtns.forEach((btn) => {
    btn.onmousedown = (e) => inputOperation(btn.dataset.operation);
});

clearAllBtn.onmousedown = (e) => reset();

clearCurrentBtn.onmousedown = (e) => {
    if (resetOnInput) reset();

    operand = "0";
    currentInput.innerHTML = operand;
};

eraseBtn.onmousedown = (e) => {
    if (resetOnInput) reset();
    if (operand === "0") return;

    operand = (operand.length === 1 + (operand.includes("-") ? 1 : 0)) ? "0" : operand.slice(0, operand.length-1);
    currentInput.innerHTML = operand;
};

negateBtn.onmousedown = (e) => {
    if (resetOnInput) reset();
    if (operand === "0") return;

    operand = operand.includes("-") ? operand.slice(1) : `-${operand}`;
    currentInput.innerHTML = operand;
};

decimalBtn.onmousedown = (e) => {
    if (resetOnInput) reset();
    if (operand.includes(".")) return;

    operand += ".";
    currentInput.innerHTML = operand;
};

equalBtn.onmousedown = (e) => operate();

const round = (number, decPlaces=5) => Math.round(number * 10**decPlaces) / 10**decPlaces;

const reset = () => {
    memory = "0";
    operand = "0";
    operation = null;
    resetOnInput = false;
    lastOperation.innerHTML = "";
    currentInput.innerHTML = operand;
}

const inputNumber = (number) => {
    if (operand.length >= 16) return;
    if (resetOnInput) reset();

    operand = operand === "0" ? number : operand + number;
    currentInput.innerHTML = operand;
};

const inputOperation = (newOperation) => {
    if (operation === null) memory = operand;

    operand = "0";
    operation = newOperation;
    resetOnInput = false;

    lastOperation.innerHTML = `${round(memory)} ${operation}`;
    currentInput.innerHTML = memory;
};

const operate = () => {
    lastOperation.innerHTML = operation ? `${round(memory)} ${operation} ${round(operand)} = ` : `${round(operand)} = `;

    const divByZero = (operation === "/") && (+operand === 0);
    switch (operation) {
        case "/":
            operand = divByZero ? 0 : +memory / +operand;
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
    operand = operand.toString();

    operation = null;
    resetOnInput = true;
    
    currentInput.innerHTML = divByZero ? "err" : operand;
};

window.onload = () => reset();