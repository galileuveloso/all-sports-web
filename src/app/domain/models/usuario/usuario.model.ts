import { FactoryHelper } from "app/core";
import { TipoUsuarioEnum } from "app/core/enums";

export class UsuarioModel {

    id = '';
    nome = '';
    email = '';
    tipo: TipoUsuarioEnum = TipoUsuarioEnum.None;
    dataCadastro: Date | null = null;
    dataAtualizacao: Date | null = null;
    dataRemocao: Date | null = null;

    public static create(data: any) {
        let instance = FactoryHelper.create(UsuarioModel, { ...data });
        return instance;
    }
}
