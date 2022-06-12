import { rename } from 'fs/promises';
import { resolve } from 'path';
import { OPERATION_FAILED_ERROR_MSG } from '../../constants.js';

export default async function renameAbsoluteFilePath(oldFilePath, newFilePath, pwd) {
    console.log('ABS RENAMING', resolve(pwd, oldFilePath), 'TO', resolve(pwd, newFilePath));

    try {
        await rename(resolve(pwd, oldFilePath), resolve(pwd, newFilePath));
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error(OPERATION_FAILED_ERROR_MSG);
        }

        throw err;
    }
};
