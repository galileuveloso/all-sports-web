import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { from, pipe, switchMap, tap } from 'rxjs';
import { UsuarioModel } from 'app/domain';
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
    UsuarioState
} from './usuario.state';

export function withUsuarioMethods() {
    return signalStoreFeature(
        { state: type<UsuarioState>() },
        withMethods((state) => {
            const service = inject(AllSportsService);

            return {
                selecionarUsuarioByFilter: rxMethod<void>(
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
                                service.get<UsuarioModel[]>('usuario').pipe(
                                    tapResponse({
                                        next: (response: UsuarioModel[]) => {
                                            patchState(state, {
                                                itens: response.map(item => UsuarioModel.create(item)),
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
