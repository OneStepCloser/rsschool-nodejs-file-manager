import { resolve as resolvePath } from 'path';
import { createReadStream } from 'fs';

export default async function printFileContent(filePath, pwd) {
    return new Promise((resolve, reject) => {
        const readStream = createReadStream(resolvePath(pwd, filePath));

        readStream.on('data', (data) => console.log(data.toString('utf8')));
        readStream.on('end', () => resolve());
        readStream.on('error', (err) => {
            if (err.code === 'ENOENT') {
                reject(new Error('FS operation failed'));
            }

            reject(err);
        });
    });
};

