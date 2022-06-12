import { resolve } from 'path';
import { writeFile } from 'fs/promises';

export default async function addFile(filePath, pwd) {
    try {
        await writeFile(resolve(pwd, filePath), '', { flag: 'wx' });
    } catch (err) {
        if (err.code === 'EEXIST') {
            throw new Error('FS operation failed');
        }
    }
};