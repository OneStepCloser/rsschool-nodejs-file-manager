import { basename, join } from 'path';

import renameFile from './rn.js';

export default async function moveFile(oldFilePath, destDirectoryPath, pwd) {
    const fileName = basename(oldFilePath);
    const newFilePath = join(destDirectoryPath, fileName);

    await renameFile(oldFilePath, newFilePath, pwd);
};
