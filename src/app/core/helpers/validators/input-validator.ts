export class InputValidatorHelper {

    public static isId(
        key: string
    ): boolean {

        if (!key)
            return false;

        let value = String(key);

        return value.endsWith('Id');
    }

    public static isEmpty(
        value: any
    ): boolean {

        if (!value)
            return true;

        if (value == null)
            return true;

        if (value == undefined)
            return true;

        return value == '';
    }
    
}
