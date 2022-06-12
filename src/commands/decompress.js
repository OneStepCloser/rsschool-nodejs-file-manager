import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';
import { resolve } from 'path';
import { OPERATION_FAILED_ERROR_MSG } from '../constants.js';

export default function decompress(srcPath, destPath, pwd) {
    if (srcPath === destPath) {
        throw new Error(OPERATION_FAILED_ERROR_MSG);
    }

    try {
        const readStream = createReadStream(resolve(pwd, srcPath));
        const writeStream = createWriteStream(resolve(pwd, destPath));

        const brotliDecompress = createBrotliDecompress();

        readStream.pipe(brotliDecompress).pipe(writeStream);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error(OPERATION_FAILED_ERROR_MSG);
        }

        throw err;
    }
}