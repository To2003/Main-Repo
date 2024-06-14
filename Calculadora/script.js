// Obtenemos todos los elementos necesarios
const screen = document.getElementById('calculator-screen');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = null;

// Función para actualizar la pantalla de la calculadora
function updateScreen() {
    screen.textContent = currentInput || '0';
}

// Función para manejar los clicks en los botones
function handleButtonClick(e) {
    const button = e.target;
    const action = button.dataset.action;
    const buttonContent = button.textContent;

    switch (action) {
        case 'clear':
            currentInput = '';
            previousInput = '';
            operator = null;
            break;
        case 'delete':
            currentInput = currentInput.slice(0, -1);
            break;
        case 'percent':
            currentInput = String(parseFloat(currentInput) / 100);
            break;
        case 'operator':
            if (currentInput === '' && buttonContent === '-') {
                currentInput = '-';
            } else if (currentInput !== '') {
                if (previousInput !== '') {
                    currentInput = calculate();
                }
                operator = buttonContent;
                previousInput = currentInput;
                currentInput = '';
            }
            break;
        case 'calculate':
            if (previousInput !== '' && currentInput !== '') {
                currentInput = calculate();
                previousInput = '';
                operator = null;
            }
            break;
        default:
            if (currentInput === '0' && buttonContent !== '.') {
                currentInput = buttonContent;
            } else {
                currentInput += buttonContent;
            }
            break;
    }

    updateScreen();
}

// Función para realizar los cálculos
function calculate() {
    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);

    switch (operator) {
        case '+':
            return String(a + b);
        case '-':
            return String(a - b);
        case '*':
            return String(a * b);
        case '/':
            return String(a / b);
        default:
            return currentInput;
    }
}

// Añadimos los event listeners a los botones
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

// Inicializamos la pantalla
updateScreen();
