export function parseUsernameFlagFromArgv() {
    const argsRaw = process.argv.slice(2);
    const targetPrefix = '--username=';
    const usernameArg = argsRaw.find(arg => arg.startsWith(targetPrefix));
    const name = usernameArg && usernameArg.slice(targetPrefix.length) || 'Anonymous';

    return name;
}