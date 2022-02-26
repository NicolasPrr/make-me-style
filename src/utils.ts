
function isString(value: any) {
    return typeof (value) === 'string';
}

export const replaceLastOccurrenceInString = (input: any, find: any, replaceWith: any) => {
    if (!isString(input) || !isString(find) || !isString(replaceWith)) {
        // returns input on invalid arguments
        return input;
    }

    const lastIndex = input.lastIndexOf(find);
    if (lastIndex < 0) {
        return input;
    }

    return input.substr(0, lastIndex) + replaceWith + input.substr(lastIndex + find.length);
}

export const capitalice = (value: string) => {
    return value[0].toUpperCase() + value.substring(1, value.length)
}

export const template = (nameFile: string) =>
    `import { makeStyles, Theme } from "@material-ui/core";

const use${nameFile}s = makeStyles((theme: Theme) => ({

}));

export default use${nameFile}s;

`
