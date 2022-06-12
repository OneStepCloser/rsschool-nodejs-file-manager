import { arch, cpus, EOL, homedir, userInfo } from 'os';
import { INVALID_INPUT_ERROR_MSG } from '../constants.js';

const Flag = {
    EOL: '--EOL',
    CPUS: '--cpus',
    HOMEDIR: '--homedir',
    USERNAME: '--username',
    ARCHITECTURE: '--architecture',
};

export default function runOSCommand(flag) {
    switch (flag) {
        case Flag.EOL: {
            console.log(EOL);
            break;
        }
        case Flag.CPUS: {
            console.log(cpus());
            break;
        }
        case Flag.HOMEDIR: {
            console.log(homedir());
            break;
        }
        case Flag.ARCHITECTURE: {
            console.log(arch());
            break;
        }
        case Flag.USERNAME: {
            console.log(userInfo().username);
            break;
        }
        default: {
            throw new Error(INVALID_INPUT_ERROR_MSG);
        }
    }
}
