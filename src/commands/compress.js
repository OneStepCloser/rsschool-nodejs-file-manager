import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { resolve } from 'path';
import { OPERATION_FAILED_ERROR_MSG } from '../constants.js';

export default function compress(srcPath, destPath, pwd) {
    if (srcPath === destPath) {
        throw new Error(OPERATION_FAILED_ERROR_MSG);
    }

    try {
        const readStream = createReadStream(resolve(pwd, srcPath));
        const writeStream = createWriteStream(resolve(pwd, destPath));

        const brotliCompress = createBrotliCompress();

        readStream.pipe(brotliCompress).pipe(writeStream);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error(OPERATION_FAILED_ERROR_MSG);
        }

        throw err;
    }
}