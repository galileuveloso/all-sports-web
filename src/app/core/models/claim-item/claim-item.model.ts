import {
    FactoryHelper   
} from "../../helpers/factory"

export class ClaimItemModel {
    public key: string = '';
    public value: string = '';

    public static create(data: any) {
        return FactoryHelper.create(ClaimItemModel, {
            ...data,
            //TODO - precisamos primeiro converter adequadamente as roles do backend que estão dentro do token
            //value: ClaimItemModel.convertValue(data)
        });
    }

    private static convertValue(data: any) {
        if (!data)
            return '';

        if (data.value == null)
            return '';

        if (data.value == undefined)
            return ''

        return data
            .value
            .toString();
    }
}