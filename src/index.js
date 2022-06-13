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
import printHash from './commands/hash.js';
import printFileContent from './commands/fs/cat.js';
import addFile from './commands/fs/add.js';
import renameFile from './commands/fs/rn.js';
import copyFile from './commands/fs/cp.js';
import moveFile from "./commands/fs/mv.js";
import removeFile from "./commands/fs/rm.js";

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

function asyncLaunchCommand(commandName, argsArray) {
    return new Promise((resolve, reject) => {
        switch (commandName) {
            case 'up': {
                pwd = getUpperPath(pwd);
                resolve();
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
                resolve();
                break;
            }
            case 'ls': {
                printDirContent(pwd);
                resolve();
                break;
            }
            case 'os': {
                if (argsArray.length !== 1) {
                    throw new Error(INVALID_INPUT_ERROR_MSG);
                }

                runOSCommand(argsArray[0]);
                resolve();
                break;
            }
            case 'compress': {
                if (argsArray.length !== 2) {
                    throw new Error(INVALID_INPUT_ERROR_MSG);
                }

                compress(argsArray[0], argsArray[1], pwd).then(resolve, reject);

                break;
            }
            case 'decompress': {
                if (argsArray.length !== 2) {
                    throw new Error(INVALID_INPUT_ERROR_MSG);
                }

                decompress(argsArray[0], argsArray[1], pwd).then(resolve, reject);

                break;
            }
            case 'hash': {
                if (argsArray.length !== 1) {
                    throw new Error(INVALID_INPUT_ERROR_MSG);
                }

                printHash(argsArray[0], pwd).then(resolve, reject);
                break;
            }
            case 'cat': {
                if (argsArray.length !== 1) {
                    throw new Error(INVALID_INPUT_ERROR_MSG);
                }

                printFileContent(argsArray[0], pwd).then(resolve, reject);
                break;
            }
            case 'add': {
                if (argsArray.length !== 1) {
                    throw new Error(INVALID_INPUT_ERROR_MSG);
                }

                addFile(argsArray[0], pwd).then(resolve, reject);
                break;
            }
            case 'rn': {
                if (argsArray.length !== 2) {
                    throw new Error(INVALID_INPUT_ERROR_MSG);
                }

                renameFile(argsArray[0], argsArray[1], pwd).then(resolve, reject);
                break;
            }
            case 'cp': {
                if (argsArray.length !== 2) {
                    throw new Error(INVALID_INPUT_ERROR_MSG);
                }

                copyFile(argsArray[0], argsArray[1], pwd).then(resolve, reject);
                break;
            }
            case 'mv': {
                if (argsArray.length !== 2) {
                    throw new Error(INVALID_INPUT_ERROR_MSG);
                }

                moveFile(argsArray[0], argsArray[1], pwd).then(resolve, reject);
                break;
            }
            case 'rm': {
                if (argsArray.length !== 1) {
                    throw new Error(INVALID_INPUT_ERROR_MSG);
                }

                removeFile(argsArray[0], pwd).then(resolve, reject);
                break;
            }
            case '.exit': {
                finishWork();
                resolve();
                break;
            }
            default: {
                reject(new Error(INVALID_INPUT_ERROR_MSG));
            }
        }
    });
}

function asyncProcessUserInput(input) {
    const inputItems = input.trim().split(/\s+/)
    const commandName = inputItems[0];

    const args = inputItems.slice(1);

    return asyncLaunchCommand(commandName, args);
}

export default function init() {
    fillGlobalVariables();
    
    greet(username);
    printPwd(pwd);

    process.stdin.on('data', (chunk) => {
        asyncProcessUserInput(chunk.toString())
            .then(() => {
                printPwd(pwd);
            })
            .catch((err) => {
                console.log(err.message);
            });
    });

    process.on('SIGINT', function() {
        finishWork();
    });
}

init();