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

export type NestedKeyOf<ObjectType extends object> =
    { [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
        ? `${Key}` | `${NestedKeyOf<ObjectType[Key]>}`
        : `${Key}`
    }[keyof ObjectType & (string | number)];

export type NestedKeyOfDot<ObjectType extends object> =
    { [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
        ? `${Key}` | `${Key}.${NestedKeyOfDot<ObjectType[Key]>}`
        : `${Key}`
    }[keyof ObjectType & (string | number)];

