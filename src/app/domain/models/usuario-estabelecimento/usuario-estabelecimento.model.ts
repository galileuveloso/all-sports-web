import { FactoryHelper } from "app/core";

export class UsuarioEstabelecimentoModel {

    idEstabelecimento = '';
    idUsuarioMany: string[] = [];
    
    public static create(data: any) {
        let instance = FactoryHelper.create(UsuarioEstabelecimentoModel, { ...data });
        return instance;
    }
}
