import { homedir } from 'os';

import { parseUsernameFlagFromArgv } from './utils.js';

let username;
let pwd;

function greet() {
    console.log(`Welcome to the File Manager, ${username}!`);
}

function sayGoodbye() {
    console.log(`Thank you for using File Manager, ${username}!`);
}

function printPwd() {
    console.log(`You are currently in ${pwd}`);
}

function fillGlobalVariables() {
    username = parseUsernameFlagFromArgv();
    pwd = homedir();
}

function init() {
    fillGlobalVariables();
    
    greet();
    printPwd();
}

init();