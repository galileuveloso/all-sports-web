import { ResolveFn } from "@angular/router";
import { UsuarioStore } from "./usuario.state";
import { inject } from "@angular/core";

export const UsuarioResolver: ResolveFn<boolean> = () => {
    const store = inject(UsuarioStore);

    //TODO - aqui dai verificar a role do sujeito e fazer a busca dos itens de acordo com o que ele pode ver?
    store.selecionarUsuarioByFilter();
    return true;
};