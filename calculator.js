const lastOperation = document.querySelector(".last-operation");
const currentInput = document.querySelector(".current-input");
const clearAllBtn = document.querySelector(".clear-all");
const clearCurrentBtn = document.querySelector(".clear-current");
const eraseBtn = document.querySelector(".erase");
const signBtn = document.querySelector(".sign");
const decimalBtn = document.querySelector(".decimal");

const numberBtns = document.querySelectorAll(".number");
const operationBtns = document.querySelectorAll(".operation");

numberBtns.forEach((btn) => {
    btn.onmousedown = (e) => {
        console.log(btn.dataset.value);
    }
});

operationBtns.forEach((btn) => {
    btn.onmousedown = (e) => {
        console.log(btn.dataset.operation);
    }
});