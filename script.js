let total = 0;
let initialValue = "0";
let previousOperator = null;
const screen = document.querySelector('.screen');

const calButton = document.querySelector('.cal-buttons');

calButton.addEventListener("click", function(event) {
    console.log(event.target.value);
    clickButton(event.target.innerText);
});

function clickButton(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleNumber(value) {
    if (initialValue === "0") {
        initialValue = value;
    } else {
        initialValue += value;
    }
}

function handleSymbol(value) {
    switch(value) {
        case 'C':
            initialValue = "0";
            total = 0;
            break;
        case "=":
            if (previousOperator === null) {
                return;
            }
            Operation(parseInt(initialValue));
            previousOperator = null;
            initialValue = " " + total;
            total = 0;
            break;
        case "↩":
            if (initialValue.length === 1) {
                initialValue = "0";
            } else {
                initialValue = initialValue.substring(0, initialValue.length - 1);
            }
            break;
        default:
            handleMaths(value);
            break;
    }
}

function handleMaths(value) {
    const intInitialValue = parseInt(initialValue);
    if (total === 0) {
        total = intInitialValue;
    } else {
        Operation(intInitialValue);
    }
    previousOperator = value;
    initialValue = "0";
}

function Operation(intInitialValue) {
    if (previousOperator === "+") {
        total += intInitialValue;
    } else if (previousOperator === "-") {
        total -= intInitialValue;
    } else if (previousOperator === "✕") {
        total *= intInitialValue;
    } else {
        total /= intInitialValue;
    }
}

function rerender() {
    screen.innerText = initialValue;
}

