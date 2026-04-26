import {
  withComputed,
  signalStoreFeature,
  withState,
} from "@ngrx/signals"

import {
  computed
} from "@angular/core";

import {
  EstabelecimentoState,
  initialEstabelecimentoState
} from "./estabelecimento.state";

export function withEstabelecimentoComputed() {
  return signalStoreFeature(
    withState<EstabelecimentoState>(initialEstabelecimentoState),
    withComputed((state) => ({
      getItens: computed(() => {
        return state.itens();
      })
    }))
  );
}
