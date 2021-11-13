const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue } = calculator;

  calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
  console.log(calculator);
}

function inputDecimal(dot) {
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;

  const inputValue = parseFloat(displayValue); // become number

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

//1

function updateDisplay() {
  const display = document.querySelector(".calculator-screen");

  display.value = calculator.displayValue;
}

updateDisplay();

const keysContainer = document.querySelector(".container");

keysContainer.addEventListener("click", (event) => {
  const { target } = event;

  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operation")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(target.value);
    updateDisplay();
  }

  if (target.classList.contains("all-clear")) {
    console.log("clear", target.value);
    return;
  }
  if (target.classList.contains("equals")) {
    console.log("equals", target.value);
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});
