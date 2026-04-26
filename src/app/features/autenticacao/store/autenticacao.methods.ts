import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators'

import {
    patchState,
    type,
    signalStoreFeature,
    withMethods,
} from '@ngrx/signals'

import {
    rxMethod
} from '@ngrx/signals/rxjs-interop';

import {
    pipe,
    switchMap,
    tap
} from 'rxjs';

import {
    AllSportsService,
    HttpResponseError
} from 'app/core';

import {
    AutenticacaoModel
} from 'app/domain'

import {
    AutenticacaoState
} from './autenticacao.state';

import { Router } from '@angular/router';


export function withAutenticacaoMethods() {
    return signalStoreFeature(
        { state: type<AutenticacaoState>() },
        withMethods((
            state,
            service = inject(AllSportsService),
            router = inject(Router)) => ({
                autenticaUsuario: rxMethod<{ login: string | null | undefined; senha: string | null | undefined }>(
                    pipe(
                        tap(() => {
                            patchState(state, {
                                isLoading: true,
                                isLoadingSuccess: false,
                                isLoadingFailure: false,
                                error: undefined
                            });
                        }),
                        switchMap(({ login, senha }) =>
                            service.post<AutenticacaoModel>('autenticacao/autenticar', {
                                Login: login,
                                Senha: senha
                            },
                            ).pipe(
                                tapResponse({
                                    next: (response: AutenticacaoModel) => {
                                        let autenticacaoResponse = AutenticacaoModel.create(response);
                                        autenticacaoResponse.claims.createFromJwtToken(response.token);
                                        patchState(state, {
                                            autenticacao: autenticacaoResponse,
                                            isLoading: false,
                                            isLoadingSuccess: true
                                        });
                                        localStorage.setItem('token', response.token);
                                        router.navigate(['loading']);
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
                ),
                //TODO - Implementar o logout
                // logoutUsuario: rxMethod<{ tokenAutenticacao: string, tokenRefresh: string, redirectGov: boolean }>(
                //     pipe(
                //         tap(() => {
                //             patchState(state, {
                //                 isLoading: true,
                //                 isLoadingSuccess: false,
                //                 isLoadingFailure: false,
                //                 error: undefined
                //             });
                //         }),
                //         switchMap(({ tokenAutenticacao, tokenRefresh, redirectGov }) => {
                //             return from(
                //                 authService.post<AutenticacaoModel>
                //                     (
                //                         'autenticacao/deslogar',
                //                         {
                //                             Token: tokenRefresh
                //                         },
                //                         tokenAutenticacao
                //                     ).pipe(
                //                         tapResponse({
                //                             next: (response: AutenticacaoModel) => {
                //                                 patchState(state, {
                //                                     autenticacao: undefined,
                //                                     isLoading: false,
                //                                     isLoadingSuccess: true
                //                                 });
                //                                 impersonateStore.setarImpersonating(false);
                //                                 localStorage.removeItem('token');
                //                                 localStorage.removeItem('token-impersonate');
                //                                 if (redirectGov)
                //                                     window.location.href = `${environment.govProvider.authority}/logout?post_logout_redirect_uri=${environment.govProvider.logout_uri}`;
                //                                 else
                //                                     router.navigate(["suporte"]);
                //                             },
                //                             error: (error: HttpResponseError) => {
                //                                 patchState(state, {
                //                                     isLoading: false,
                //                                     isLoadingFailure: true,
                //                                     error: error
                //                                 });
                //                                 impersonateStore.setarImpersonating(false);
                //                                 localStorage.removeItem('token');
                //                                 localStorage.removeItem('token-impersonate');
                //                                 window.location.href = `${environment.govProvider.authority}/logout?post_logout_redirect_uri=${environment.govProvider.logout_uri}`;
                //                             },
                //                             finalize: () => {
                //                             }
                //                         })
                //                     )
                //             );
                //         })
                //     )
                // ),
                setAutenticacao(token: string) {
                    const novaAutenticacao = AutenticacaoModel.createFromJwtToken(token);
                    novaAutenticacao.token = token;
                    patchState(state, {
                        autenticacao: novaAutenticacao
                    });
                },
                setLoadingSuccess(value: boolean) {
                    patchState(state, { isLoadingSuccess: value });
                },
                logout() {
                    patchState(state, {
                        autenticacao: undefined
                    });
                }
            }))
    )
}
