import {
  withComputed,
  signalStoreFeature,
  withState,
} from "@ngrx/signals"

import {
  computed
} from "@angular/core";

import {
  UsuarioState,
  initialUsuarioState
} from "./usuario.state";

import { 
  TipoUsuarioEnum 
} from "app/core/enums";

export function withUsuarioComputed() {
  return signalStoreFeature(
    withState<UsuarioState>(initialUsuarioState),
    withComputed((state) => ({
      getItens: computed(() => {
        return state.itens();
      }),
      getUsuarioGestorQuadraMany: computed(() => {
        return state.itens().filter(item => item.tipo == TipoUsuarioEnum.GestorQuadra);
      }),
    }))
  );
}
