import { FactoryHelper } from "../../helpers";

export class FluentValidationError {
    public title: string = '';
    public status: string = '';
    public errors: FluentValidationErrorItem[] = [];

    public static create(data: any): FluentValidationError {
        let instance = FactoryHelper.create(FluentValidationError, { ...data });
        instance.errors = !data || !data.errors ? [] : data.errors.map((item: any) => FluentValidationErrorItem.create(item));
        return instance;
    }
}

export class FluentValidationErrorItem {
    public property: string = '';
    public messageMany: string[] = [];

    public static create(data: any): FluentValidationErrorItem {
        return FactoryHelper.create(FluentValidationErrorItem, { ...data });
    }
}