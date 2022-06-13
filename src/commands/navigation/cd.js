import { resolve } from 'path';
import { existsSync } from 'fs';

export default function getTargetPath (pwd, path) {
    const targetPath = resolve(pwd, path);

    return existsSync(targetPath) ? targetPath : null;
}
