export const getNestedValue = (obj: {}, prop: string[]): string => {
    let result = "";
    for (const p in prop) {
        if (!result) {
            result = obj[prop[p]];
        } else {
            result = result[prop[p]];
        }
    }
    return result;
};