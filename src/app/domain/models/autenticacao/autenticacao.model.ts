import {
    ClaimModel,
    FactoryHelper
} from "app/core";

export class AutenticacaoModel {
    token = "";
    tokenRefresh = "";
    claims = new ClaimModel();

    public static create(data: any) {
        let instance = FactoryHelper.create(AutenticacaoModel, { ...data });
        instance.claims = !data || !data.claims ? new ClaimModel() : ClaimModel.create({ ...data.claims });
        return instance;
    }

    public static createFromJwtToken(data: any) {
        let instance = FactoryHelper.create(AutenticacaoModel, { ...data });
        instance.claims.createFromJwtToken(data);
        return instance;
    }
}