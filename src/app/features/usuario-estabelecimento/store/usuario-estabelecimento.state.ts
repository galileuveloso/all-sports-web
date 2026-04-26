import {
  signalStore,
  withState,
} from '@ngrx/signals';

import {
  withDevtools
} from '@angular-architects/ngrx-toolkit';

import {
  withUsuarioEstabelecimentoComputed,
  withUsuarioEstabelecimentoMethods,
} from '.';

import {
  UsuarioEstabelecimentoModel
} from 'app/domain';

import {
  HttpResponseError
} from 'app/core';

export interface UsuarioEstabelecimentoState {
  itens: UsuarioEstabelecimentoModel[],
  isLoading: boolean;
  isLoadingSuccess: boolean;
  isLoadingFailure: boolean;
  error: HttpResponseError | undefined;
}

export const initialUsuarioEstabelecimentoState: UsuarioEstabelecimentoState = {
  itens: [],
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false,
  error: undefined
}

export const UsuarioEstabelecimentoStore = signalStore(
  { providedIn: 'root' },
  withState(initialUsuarioEstabelecimentoState),
  withUsuarioEstabelecimentoComputed(),
  withUsuarioEstabelecimentoMethods(),
  withDevtools('UsuarioEstabelecimentoStore')
);