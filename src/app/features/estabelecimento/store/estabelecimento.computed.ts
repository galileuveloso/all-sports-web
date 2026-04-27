import {
  withComputed,
  signalStoreFeature,
  withState,
} from "@ngrx/signals"

import {
  computed,
  inject
} from "@angular/core";

import {
  EstabelecimentoState,
  initialEstabelecimentoState
} from "./estabelecimento.state";

import { UsuarioEstabelecimentoStore } from "app/features";
import { EstabelecimentoModel } from "app/domain";

export function withEstabelecimentoComputed() {
  return signalStoreFeature(
    withState<EstabelecimentoState>(initialEstabelecimentoState),
    withComputed((state) => {

      const usuarioEstabelecimentoStore = inject(UsuarioEstabelecimentoStore);

      return {
        getItens: computed(() => {
          let usuarioEstabelecimentoMany = usuarioEstabelecimentoStore.getItens();

          return state.itens().map(item => {
            var itemMany = usuarioEstabelecimentoMany.filter(ue => ue.idEstabelecimento === item.id);

            return EstabelecimentoModel.create({
              ...item,
              idUsuarioGestorMany: itemMany.map(ue => ue.idUsuario)
            });
          });
        })
      }
    })
  )
}
