import { homedir } from 'os';

import { greet, printPwd, sayGoodbye } from './common-actions.js';
import { parseUsernameFlagFromArgv } from './utils.js';
import { INVALID_INPUT_ERROR_MSG, OPERATION_FAILED_ERROR_MSG } from './constants.js';
import getUpperPath from './commands/navigation/up.js';
import getTargetPath from './commands/navigation/cd.js';
import printDirContent from './commands/navigation/ls.js';
import runOSCommand from './commands/os.js';
import compress from './commands/compress.js';
import decompress from './commands/decompress.js';

let username;
let pwd;

function fillGlobalVariables() {
    username = parseUsernameFlagFromArgv();
    pwd = homedir();
}

function finishWork() {
    sayGoodbye(username);
    process.exit();
}

function launchCommand(commandName, argsArray) {
    switch (commandName) {
        case 'up': {
            pwd = getUpperPath(pwd);
            break;
        }
        case 'cd': {
            if (argsArray.length !== 1) {
                throw new Error(INVALID_INPUT_ERROR_MSG);
            }

            const targetPath = getTargetPath(pwd, argsArray[0])

            if (targetPath) {
                pwd = targetPath;
            } else {
                throw new Error(OPERATION_FAILED_ERROR_MSG);
            }
            break;
        }
        case 'ls': {
            printDirContent(pwd);
            break;
        }
        case 'os': {
            if (argsArray.length !== 1) {
                throw new Error(INVALID_INPUT_ERROR_MSG);
            }

            runOSCommand(argsArray[0]);
            break;
        }
        case 'compress': {
            if (argsArray.length !== 2) {
                throw new Error(INVALID_INPUT_ERROR_MSG);
            }

            compress(argsArray[0], argsArray[1], pwd);
            break;
        }
        case 'decompress': {
            if (argsArray.length !== 2) {
                throw new Error(INVALID_INPUT_ERROR_MSG);
            }

            decompress(argsArray[0], argsArray[1], pwd);
            break;
        }
        case '.exit': {
            finishWork();
            break;
        }
        default: {
            throw new Error(INVALID_INPUT_ERROR_MSG);
        }
    }
}

function processUserInput(input) {
    const inputItems = input.trim().split(/\s+/)
    const commandName = inputItems[0];

    const args = inputItems.slice(1);

    try {
        launchCommand(commandName, args);
    } catch (err) {
        console.log(err.message);
    }
}

export default function init() {
    fillGlobalVariables();
    
    greet(username);
    printPwd(pwd);

    process.stdin.on('data', (chunk) => {
        processUserInput(chunk.toString());
        printPwd(pwd);
    });

    process.on('SIGINT', function() {
        finishWork();
    });
}

init();