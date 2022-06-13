import { rm } from 'fs/promises';
import { resolve } from 'path';

import { OPERATION_FAILED_ERROR_MSG } from '../../constants.js';

export default async function removeFile(filePath, pwd) {
    try {
        await rm(resolve(pwd, filePath));
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error(OPERATION_FAILED_ERROR_MSG);
        }

        throw err;
    }
}