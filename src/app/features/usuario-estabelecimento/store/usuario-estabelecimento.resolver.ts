import { inject } from "@angular/core";
import { UsuarioEstabelecimentoStore } from "./usuario-estabelecimento.state";
import { ResolveFn } from "@angular/router";

export const UsuarioEstabelecimentoResolver: ResolveFn<boolean> = () => {
    const store = inject(UsuarioEstabelecimentoStore);

    //TODO - aqui dai verificar a role do sujeito e fazer a busca dos itens de acordo com o que ele pode ver?
    store.selecionarUsuarioEstabelecimentoByFilter();
    return true;
};