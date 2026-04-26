
import { FactoryHelper } from "../../helpers";

import {
    FluentValidationError
} from "../fluent-validation-error";

export class HttpResponseError {
    public error: FluentValidationError | undefined = undefined;
    public message: string = '';
    public name: string = '';
    public ok: boolean = false;
    public status: number = 500;
    public statusText: string = '';
    public url: string = '';

    public static create(data: any): HttpResponseError {
        let instance = FactoryHelper.create(HttpResponseError, { ...data });
        instance.error = !data || !data.error ? undefined : FluentValidationError.create(data.error);
        return instance;
    }
}
