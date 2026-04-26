import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { from, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

import {
    patchState,
    signalStoreFeature,
    type,
    withMethods,
    withState
} from '@ngrx/signals'

import {
    AllSportsService,
    HttpResponseError
} from 'app/core';

import {
    UsuarioEstabelecimentoState
} from './usuario-estabelecimento.state';

import {
    UsuarioEstabelecimentoModel
} from 'app/domain';

export function withUsuarioEstabelecimentoMethods() {
    return signalStoreFeature(
        { state: type<UsuarioEstabelecimentoState>() },
        withMethods((state) => {
            const service = inject(AllSportsService);

            return {
                selecionarUsuarioEstabelecimentoByFilter: rxMethod<void>(
                    pipe(
                        tap(() => {
                            patchState(state, {
                                isLoading: true,
                                isLoadingSuccess: false,
                                isLoadingFailure: false,
                                error: undefined
                            })
                        }),
                        switchMap(() => {
                            return from(
                                service.get<UsuarioEstabelecimentoModel[]>('usuario-estabelecimento').pipe(
                                    tapResponse({
                                        next: (response: UsuarioEstabelecimentoModel[]) => {
                                            patchState(state, {
                                                itens: response.map(item => UsuarioEstabelecimentoModel.create(item)),
                                                isLoading: false,
                                                isLoadingSuccess: true
                                            });
                                        },
                                        error: (error: HttpResponseError) => {
                                            patchState(state, {
                                                isLoading: false,
                                                isLoadingFailure: true,
                                                error: error
                                            });
                                        },
                                        finalize: () => {
                                        }
                                    })
                                )
                            );
                        })
                    )
                )
            }
        })
    )
}
