import { FactoryHelper } from "app/core";

export class EstabelecimentoModel {

    id = '';
    nome = '';
    telefone = '';
    endereco = '';
    modalidades = '';
    ativo = false;
    dataCadastro: Date | null = null;
    dataAtualizacao: Date | null = null;
    dataRemocao: Date | null = null;

    public static create(data: any) {
        let instance = FactoryHelper.create(EstabelecimentoModel, { ...data });
        return instance;
    }
}
