import { readdirSync } from 'fs';

export default function printDirContent(absolutePath) {
    const dirEntities = readdirSync(absolutePath);

    console.log(dirEntities);
}
