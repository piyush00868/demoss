const display = document.querySelector("#display");
let expression = "";

function updateDisplay(value = expression || "0") {
  display.value = value;
}

function addValue(value) {
  if (value === "." && expression.split(/[+\-*/]/).pop().includes(".")) {
    return;
  }

  expression += value;
  updateDisplay();
}

function clearCalculator() {
  expression = "";
  updateDisplay();
}

function deleteValue() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function calculate() {
  if (!expression || !/[0-9]$/.test(expression)) {
    return;
  }

  try {
    const result = Function(`"use strict"; return (${expression})`)();
    if (!Number.isFinite(result)) {
      throw new Error("Invalid result");
    }

    expression = String(Number(result.toFixed(10)));
    updateDisplay();
  } catch {
    expression = "";
    updateDisplay("Error");
  }
}

document.querySelectorAll("[data-value]").forEach((button) => {
  button.addEventListener("click", () => addValue(button.dataset.value));
});

document.querySelector('[data-action="clear"]').addEventListener("click", clearCalculator);
document.querySelector('[data-action="delete"]').addEventListener("click", deleteValue);
document.querySelector('[data-action="calculate"]').addEventListener("click", calculate);

document.addEventListener("keydown", (event) => {
  if ("0123456789.+-*/".includes(event.key)) {
    addValue(event.key);
  } else if (event.key === "Enter" || event.key === "=") {
    calculate();
  } else if (event.key === "Escape") {
    clearCalculator();
  } else if (event.key === "Backspace") {
    deleteValue();
  }
});
