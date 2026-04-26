import {
  signalStore,
  withState,
} from '@ngrx/signals';

import {
  withDevtools
} from '@angular-architects/ngrx-toolkit';

import {
  withUsuarioComputed,
  withUsuarioMethods,
} from '.';

import {
  UsuarioModel
} from 'app/domain';

import {
  HttpResponseError
} from 'app/core';

export interface UsuarioState {
  itens: UsuarioModel[],
  isLoading: boolean;
  isLoadingSuccess: boolean;
  isLoadingFailure: boolean;
  error: HttpResponseError | undefined;
}

export const initialUsuarioState: UsuarioState = {
  itens: [],
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false,
  error: undefined
}

export const UsuarioStore = signalStore(
  { providedIn: 'root' },
  withState(initialUsuarioState),
  withUsuarioComputed(),
  withUsuarioMethods(),
  withDevtools('UsuarioStore')
);