import {
  signalStore,
  withState,
} from '@ngrx/signals';

import {
  withDevtools
} from '@angular-architects/ngrx-toolkit';

import {
  withEstabelecimentoComputed,
  withEstabelecimentoMethods,
} from '.';

import {
  EstabelecimentoModel
} from 'app/domain';

import {
  HttpResponseError
} from 'app/core';

export interface EstabelecimentoState {
  itens: EstabelecimentoModel[],
  isLoading: boolean;
  isLoadingSuccess: boolean;
  isLoadingFailure: boolean;
  error: HttpResponseError | undefined;
}

export const initialEstabelecimentoState: EstabelecimentoState = {
  itens: [],
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false,
  error: undefined
}

export const EstabelecimentoStore = signalStore(
  { providedIn: 'root' },
  withState(initialEstabelecimentoState),
  withEstabelecimentoComputed(),
  withEstabelecimentoMethods(),
  withDevtools('EstabelecimentoStore')
);