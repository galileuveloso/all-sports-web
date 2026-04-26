import { FactoryHelper } from "app/core";

export class UsuarioModel {

    id = '';
    nome = '';
    email = '';
    tipo = 0; //TODO - transformar em enum
    dataCadastro: Date | null = null;
    dataAtualizacao: Date | null = null;
    dataRemocao: Date | null = null;

    public static create(data: any) {
        let instance = FactoryHelper.create(UsuarioModel, { ...data });
        return instance;
    }
}
