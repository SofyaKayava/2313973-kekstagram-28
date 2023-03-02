// Функция для проверки длины строки
const testingStringOne = 'проверяемая строка';

function checkLength(string, length) {
  if (string.length <= length) {
    return 'Cтрока проходит по длине';
  }
  return 'Строка не подходит';
}
checkLength(testingStringOne, 10);

// Функция для проверки, является ли строка палиндромом
const testingStringTwo = 'Кёша на полке клопа нашёл';

function checkPalindrome(string) {
  const stringTwo = string.split('').reverse().join('');
  if (string.replaceAll(' ', '').toLowerCase() === stringTwo.replaceAll(' ', '').toLowerCase()) {
    return 'Это палиндром!';
  }
  return 'Это не палиндром';
}
checkPalindrome(testingStringTwo);


/* Функция, которая превращает все цифры из строки в целые положительные числа
В этом задании я смогла найти способ только с использованием регулярного выражения replace. Как я поняла,
в квардратных скобках после знака ^ идут символы, которые не нужно заменять, потом их еняют на пропуск.
*/

const testingStringThree = 1.5;


function toNumber(string) {
  if (typeof string === 'string') {
    const newNumberOne = string.replace(/[^0-9]/g,'');
    return parseInt(newNumberOne, 10);
  }
  const newNumber = String(string).replace(/[^0-9]/g,'');
  return parseInt(newNumber, 10);
}

toNumber(testingStringThree);

//Функция, которая добавляет символы до нужной длины строки

function addLetters (string, minlength, letter) {
  while (string.length < minlength) {
    string = letter.substring(0, minlength - string.length) + string;
  }
  return string;
}

addLetters('1', 4, '0');
