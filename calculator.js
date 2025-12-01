/*let previous = "";
let current = "";
let operator = "";

const prevDisplay = document.getElementById("previousoperand");
const currDisplay = document.getElementById("currentoperand");

document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
        let value = btn.getAttribute("data-action");

        
        if (!isNaN(value) || value === ".") {
            current += value;
            currDisplay.textContent = current;
        }

        
        if (["+", "-", "*", "/", "%"].includes(value)) {
            operator = value;
            previous = current;
            current = "";
            prevDisplay.textContent = previous + " " + operator;
        }

        
        if (value === "clear") {
            previous = "";
            current = "";
            operator = "";
            prevDisplay.textContent = "";
            currDisplay.textContent = "0";
        }

        
        if (value === "delete") {
            current = current.slice(0, -1);
            currDisplay.textContent = current || "0";
        }

        
        if (value === "equals") {
            let result;

            let a = Number(previous);
            let b = Number(current);

            if (operator === "+") result = a + b;
            if (operator === "-") result = a - b;
            if (operator === "*") result = a * b;
            if (operator === "/") result = a / b;
            if (operator === "%") result = a % b;

            currDisplay.textContent = result;
            prevDisplay.textContent = "";
            current = result.toString();
            previous = "";
            operator = "";
        }
    });
});*/
const previousOperand = document.getElementById("previousoperand");
const currentOperand = document.getElementById("currentoperand");
const buttons = document.querySelectorAll("button");

let current = "";
let previous = "";
let operation = undefined;

// Update display
function updateDisplay() {
    currentOperand.textContent = current || "0";
    previousOperand.textContent = previous ? `${previous} ${operation || ""}` : "";
}

// Clear all
function clearAll() {
    current = "";
    previous = "";
    operation = undefined;
    updateDisplay();
}

// Delete last number
function deleteNumber() {
    current = current.toString().slice(0, -1);
    updateDisplay();
}

// Add number
function appendNumber(num) {
    if (num === "." && current.includes(".")) return;
    current += num;
    updateDisplay();
}

// Choose operation
function chooseOperation(op) {
    if (current === "") return;
    if (previous !== "") calculate();
    operation = op;
    previous = current;
    current = "";
    updateDisplay();
}

// Calculate
function calculate() {
    let result;
    const prev = parseFloat(previous);
    const curr = parseFloat(current);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operation) {
        case "+": result = prev + curr; break;
        case "-": result = prev - curr; break;
        case "*": result = prev * curr; break;
        case "/": result = prev / curr; break;
        case "%": result = prev % curr; break;
        default: return;
    }

    // 🔥 Fix long decimal numbers
    if (!Number.isInteger(result)) {
        result = parseFloat(result.toFixed(10));
    }

    current = result.toString();
    previous = "";
    operation = undefined;
    updateDisplay();
}



// Button Events
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const action = btn.dataset.action;

        if (!isNaN(action) || action === ".") {
            appendNumber(action);
        } 
        else if (["+", "-", "*", "/", "%"].includes(action)) {
            chooseOperation(action);
        } 
        else if (action === "equals") {
            calculate();
        } 
        else if (action === "clear") {
            clearAll();
        } 
        else if (action === "delete") {
            deleteNumber();
        }
    });
});

// Initial display
updateDisplay();


