import { createReadStream, createWriteStream } from 'fs';
import { createBrotliCompress } from 'zlib';
import { resolve } from 'path';
import { OPERATION_FAILED_ERROR_MSG } from '../constants.js';

export default function compress(srcPath, destPath, pwd) {
    return new Promise((res, rej) => {
        if (srcPath === destPath) {
            rej(new Error(OPERATION_FAILED_ERROR_MSG));
        }

        const readStream = createReadStream(resolve(pwd, srcPath));
        const writeStream = createWriteStream(resolve(pwd, destPath));

        readStream.on('error', (err) => {
            if (err.code === 'ENOENT') {
                rej(new Error('FS operation failed'));
            }

            rej(err);
        });
        readStream.on('end', () => res());

        const brotliCompress = createBrotliCompress();

        readStream.pipe(brotliCompress).pipe(writeStream);
    });
}