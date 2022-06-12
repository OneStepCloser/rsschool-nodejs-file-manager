import { createHmac } from 'crypto';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { OPERATION_FAILED_ERROR_MSG } from '../constants.js';

export default async function printHash(filePath, pwd) {
    try {
        const fileContent = await readFile(resolve(pwd, filePath), { encoding: 'utf8' });

        const hash = createHmac('sha256', fileContent)
            .digest('hex');

        console.log(hash);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error(OPERATION_FAILED_ERROR_MSG);
        }

        throw err;
    }
}

