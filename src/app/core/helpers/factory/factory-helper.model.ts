import {
    InputValidatorHelper
} from "../validators/input-validator";

export class FactoryHelper {
    // TODO: verificar se deveríamos modificar este método para ele ser case insensitivy
    static create<T>(type: { new(): T; }, json: any): T {
        let instance = new type();
        if (!json || json == null)
            return instance;

        let props: Map<string, any> = FactoryHelper.getPropsByType(type);

        for (const [key, value] of Object.entries(json as Object)) {
            if (props.has(key))
                props.set(key, FactoryHelper.tryConvertValue(key, value));
            else {
                const lowercasedKey = key.charAt(0).toLowerCase() + key.slice(1);
                if (props.has(lowercasedKey))
                    props.set(lowercasedKey, FactoryHelper.tryConvertValue(lowercasedKey, value));
            }
        }

        Object.assign(instance as Object, Object.fromEntries<T>(props));
        return instance;
    }

    public static getPropsByType<T>(type: { new(): T; }): Map<string, any> {
        let props: Map<string, any> = new Map<string, any>();
        for (const [key, value] of Object.entries(new type() as Object))
            props.set(key, value);
        return props;
    }


    public static tryConvertValue(
        key: string,
        value: any
    ): any {

        if (InputValidatorHelper.isId(key))
            return FactoryHelper.getIdValue(value);

        if (InputValidatorHelper.isEmpty(value))
            return value;

        if (FactoryHelper.isString(value))
            return value.toString();

        return value;
    }

    public static getIdValue = (
        value: any
    ): string => {

        if (InputValidatorHelper.isEmpty(value))
            return '';

        return String(value);
    }

    public static isString(
        value: any
    ): boolean {
        return typeof value === 'string' || value instanceof String;
    }

    public static isNumber(
        value: any
    ): boolean {

        return !isNaN(value);
    }

    public static isDate(
        key: string,
        value: any
    ): boolean {

        return value
            && value != null
            && FactoryHelper
                .getManyDateProperty
                .includes(key);
    }

    private static getManyDateProperty: string[] = [
        'dataCadastro',
        'dataAtualizacao',
        'dataUltimaAtualizacao',
        'dataRemocao',
        'dataSaida',
        'dataEntrada',
        'dataExecucao',
        'dataVigenciaInicio',
        'dataVigenciaFim',
        'dataFimFluxo',
        'dataEntrega',
        'dataProximaExecucao',
        'dataPrazoProximaExecucao'
    ];
}