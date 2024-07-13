//Поле Вывода
let input = document.querySelector('.item--input');


//Смена темы калькулятора
let themeToggler = document.getElementById('themeToggler');
themeToggler.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});


const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const actions = ['+', '-', '*', '/', '.'];
const brackets = ['(', ')'];
let finish = false;


//Функция ввода + различные проверки на некорректность (можно сократить или что-то добавить???)
function insert(value) {
    if (finish) {
        finish = false;
        if (input.textContent === 'Ошибка') {
            if (numbers.includes(value)) {
                input.textContent = value;
                return;
            }
            if (actions.includes(value)) {
                input.textContent = '0' + value;
                return;
            }
        }
        if (numbers.includes(value)) {
            input.textContent = value;
            return;
        }
        if (actions.includes(value) && !brackets.includes(value)) {
            input.textContent += value;
            return;
        }
    }
    if (input.textContent === '0') {
        if (actions.includes(value)) {
            input.textContent += value;
            return;
        }
        if (numbers.includes(value) || brackets.includes(value)) {
            input.textContent = value;
            return;
        }
    }
    if (actions.includes(value) && (actions.includes(input.textContent.at(-1)))) {
        input.textContent = input.textContent.slice(0, -1) + value;
        return;
    }
    if (value === '(' && input.textContent.at(-1) === '(' || value === ')' && input.textContent.at(-1) === ')') {
        return;
    }
    if (numbers.includes(value) && input.textContent.at(-1) === '0' && actions.slice(0, -1).includes(input.textContent.at(-2))) {
        return;
    }
    input.textContent += value;
}


//Функция очистки поля вывода
function reset() {
    input.textContent = '0';
}


//Функция удаления последнего символа поля ввода
function back() {
    let text = input.textContent;
    if (text !== 'Ошибка') {
        if (text.length > 1) {
            input.textContent = input.textContent.slice(0, -1);
        }
        else {
            input.textContent = '0';
        }
    }
}


//Функция подсчёта + Обработка ошибок
function equal() {
    let expression = input.textContent;
    try {
        if (eval(expression) == Infinity) {
            input.textContent = 'Ошибка';
        }
        else {
            input.textContent = +eval(expression).toFixed(8);
        }
    } catch (e) {
        input.textContent = 'Ошибка';
    }
    finish = true;
}