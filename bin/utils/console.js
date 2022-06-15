import chalk from 'chalk';

const errorColor = chalk.bold.red;
const warningColor = chalk.bold.hex('#FFA500');
const successColor = chalk.bold.green;
const infoColor = chalk.bold.white;


const error = (text, ) => {
    console.log(errorColor(text));
}

const warning = (text) => {
    console.log(warningColor(text));
}

const success = (text) => {
    console.log(successColor(text));
}

const info = (text) => {
    console.log(infoColor(text));
}

export {error, warning, success, info};