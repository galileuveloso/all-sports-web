import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { from, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

import {
    patchState,
    signalStoreFeature,
    type,
    withMethods
} from '@ngrx/signals'

import {
    AllSportsService,
    HttpResponseError
} from 'app/core';

import {
    EstabelecimentoModel
} from 'app/domain';

import {
    EstabelecimentoState
} from 'app/features';

export function withEstabelecimentoMethods() {
    return signalStoreFeature(
        { state: type<EstabelecimentoState>() },
        withMethods((state) => {
            const service = inject(AllSportsService);

            return {
                selecionarEstabelecimentoByFilter: rxMethod<void>(
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
                                service.get<EstabelecimentoModel[]>('estabelecimento').pipe(
                                    tapResponse({
                                        next: (response: EstabelecimentoModel[]) => {
                                            patchState(state, {
                                                itens: response.map(item => EstabelecimentoModel.create(item)),
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
                ),
                inserirEstabelecimento: rxMethod<{ estabelecimento: EstabelecimentoModel }>(
                    pipe(
                        tap(() => {
                            patchState(state, {
                                isLoading: true,
                                isLoadingSuccess: false,
                                isLoadingFailure: false,
                                error: undefined
                            });
                        }),
                        switchMap(({estabelecimento}) =>
                            service.post<EstabelecimentoModel>('estabelecimento',
                                estabelecimento,
                            ).pipe(
                                tapResponse({
                                    next: (response: EstabelecimentoModel) => {
                                        console.log(estabelecimento);
                                        let itens = [...state.itens(), EstabelecimentoModel.create(response)]
                                        
                                        console.log(response);
                                        console.log(EstabelecimentoModel.create(response));
                                        console.log(itens);

                                        patchState(state, {
                                            itens: itens,
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
                                        patchState(state, { isLoading: false });
                                    }
                                })
                            )
                        )
                    )
                )
            }
        })
    )
}
