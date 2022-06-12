import { cp } from 'fs/promises';
import { basename, resolve } from 'path';
import { OPERATION_FAILED_ERROR_MSG } from '../../constants.js';

export default async function copyFile(filePath, destDirectoryPath, pwd) {
    try {
        const fileName = basename(filePath);

        await cp(resolve(pwd, filePath), resolve(pwd, destDirectoryPath, fileName));
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error(OPERATION_FAILED_ERROR_MSG);
        }

        throw err;
    }
};
