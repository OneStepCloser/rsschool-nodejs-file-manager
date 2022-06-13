import { resolve } from 'path';

export default function getUpperPath (pwd) {
    const destPath = resolve(pwd, '..');

    return destPath;
}
