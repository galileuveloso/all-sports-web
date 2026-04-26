import {
    patchState,
    type,
    signalStoreFeature,
    withMethods,
    withState,
} from '@ngrx/signals'

import {
    AppState,
    initialAppState
} from './app.state';

import { HttpResponseError } from '../core';


export function withAppMethods() {
    return signalStoreFeature(
        withState<AppState>(initialAppState),
        withMethods((state) => {
            return {

                setLoadingPercentageIncrement(percentage: number) {
                    patchState(
                        state,
                        { loadingPercentage: Math.min(state.loadingPercentage() + percentage, 100) }
                    );
                },

                setLoadingPercentage(value: number) {
                    patchState(state, { loadingPercentage: Math.min(Math.max(value, 0), 100) });
                },

                setAppState(values: {
                    isLoading: boolean;
                    isLoadingSuccess: boolean;
                    isLoadingFailure: boolean;
                    error: HttpResponseError | undefined
                }) {
                    patchState(state, {
                        ...values
                    });
                },

                setSuccessState(values: {
                    isLoading: boolean;
                    isLoadingSuccess: boolean
                }) {
                    patchState(state, {
                        ...values
                    });
                },

                setFailureState(values: {
                    isLoading: boolean;
                    isLoadingFailure: boolean;
                    error: HttpResponseError | undefined
                }) {
                    patchState(state, {
                        ...values
                    });
                }
            };
        })
    )
}