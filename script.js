//* GLOBAL VARIABLES *//
const FORMULA_SCREEN = document.querySelector("#formulaScreen");
const OUTPUT_SCREEN = document.querySelector("#display");
const OPERATORS = ["+", "-", "x", "/"];

//* FUNCTIONS *//
const checkForOperator = () => OPERATORS.includes(OUTPUT_SCREEN.innerText);

const checkIfEmpty = () => OUTPUT_SCREEN.innerText === "0";

const getLastFormulaChar = () =>
  FORMULA_SCREEN.innerText[FORMULA_SCREEN.innerText.length - 1];

const checkForEqual = () => FORMULA_SCREEN.innerText.includes("=");

const replaceFormula = () => {
  const result = FORMULA_SCREEN.innerText.split("= ")[1];
  FORMULA_SCREEN.innerText = result;
};

//* EVENT LISTENERS *//

// Add listener to AC button
document.querySelector("#clear").addEventListener("click", () => {
  FORMULA_SCREEN.innerText = "";
  OUTPUT_SCREEN.innerText = "0";
});

// Add listener to = button
document.querySelector("#equals").addEventListener("click", () => {
  const formula = FORMULA_SCREEN.innerText.replace(/x/g, "*");
  const result = eval(formula);

  // update formula screen with result
  FORMULA_SCREEN.innerText += `= ${result}`;
  // update output screen with result
  OUTPUT_SCREEN.innerText = result;
});

// Add listener to number buttons
document.querySelectorAll(".numberBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    // get value of button
    const value = btn.innerText;

    // check if last number was a result from previous calculation
    if (checkForEqual()) replaceFormula();

    // prevent a number to begin with multiple zeros
    if (checkIfEmpty() && value === "0") return;

    // prevent multiple "."
    if (value === "." && OUTPUT_SCREEN.innerText.includes(".")) return;

    // update formula screen with value
    FORMULA_SCREEN.innerText += value;
    // update output screen with value
    if (checkForOperator() || checkIfEmpty()) {
      OUTPUT_SCREEN.innerText = value;
    } else {
      OUTPUT_SCREEN.innerText += value;
    }
  });
});

// Add listener to operator buttons
document.querySelectorAll(".mathOperatorBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    // get value of button
    const operator = btn.innerText;

    // check if last number was a result from previous calculation
    if (checkForEqual()) replaceFormula();

    // prevent multiple operators (dedicated to operator "-")
    if (getLastFormulaChar() === "-") {
      if (
        OPERATORS.includes(
          FORMULA_SCREEN.innerText[FORMULA_SCREEN.innerText.length - 2]
        )
      ) {
        FORMULA_SCREEN.innerText = FORMULA_SCREEN.innerText.slice(0, -2);
      }
    }

    // check for duplicate "-"
    if (operator === "-" && getLastFormulaChar() === "-") return;

    // update formula screen with value
    if (OPERATORS.includes(getLastFormulaChar()) && operator !== "-") {
      FORMULA_SCREEN.innerText = FORMULA_SCREEN.innerText.slice(0, -1);
    }

    FORMULA_SCREEN.innerText += operator;

    // update output screen with value
    OUTPUT_SCREEN.innerText = operator;
  });
});
