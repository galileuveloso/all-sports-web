import {
  withComputed,
  signalStoreFeature,
  withState,
} from "@ngrx/signals"

import {
  computed
} from "@angular/core";

import {
  UsuarioEstabelecimentoState,
  initialUsuarioEstabelecimentoState
} from "./usuario-estabelecimento.state";

export function withUsuarioEstabelecimentoComputed() {
  return signalStoreFeature(
    withState<UsuarioEstabelecimentoState>(initialUsuarioEstabelecimentoState),
    withComputed((state) => ({
      getItens: computed(() => {
        return state.itens();
      }),
      getItensByIdEstabelecimento: computed(() => {
        return (idEstabelecimento: string) => {
          return state.itens().filter(item => item.idEstabelecimento === idEstabelecimento);
        }
      })
    }))
  );
}
