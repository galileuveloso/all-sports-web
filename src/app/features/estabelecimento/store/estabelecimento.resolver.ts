import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { EstabelecimentoStore } from "./estabelecimento.state";

export const EstabelecimentoResolver: ResolveFn<boolean> = () => {
    const store = inject(EstabelecimentoStore);
    //TODO - aqui dai verificar a role do sujeito e fazer a busca dos itens de acordo com o que ele pode ver?
    store.selecionarEstabelecimentoByFilter();
    return true;
};