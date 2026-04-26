import { 
  signalStore,
  withState,
}  from '@ngrx/signals';

import {
  HttpResponseError,
} from 'app/core'

import {
 AutenticacaoModel
} from 'app/domain'
import {
  withAutenticacaoComputed
} from './autenticacao.computed'
import {
  withAutenticacaoMethods
} from './autenticacao.methods'

export interface AutenticacaoState {
  autenticacao: AutenticacaoModel | undefined;
  continuarLogadoProvider: boolean;
  isLoading: boolean;
  isLoadingSuccess: boolean;
  isLoadingFailure: boolean;
  error: HttpResponseError | undefined;
  mensagemErro: string;
  mensagemSucesso: string;
}
 export const initialAutenticacaoState: AutenticacaoState = {
  autenticacao: undefined,
  continuarLogadoProvider: false,
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false,
  error: undefined,
  mensagemErro: '',
  mensagemSucesso: '',
 }

 export const AutenticacaoStore = signalStore(
  { providedIn: 'root'},
  withState(initialAutenticacaoState),
  withAutenticacaoComputed(),
  withAutenticacaoMethods()
);