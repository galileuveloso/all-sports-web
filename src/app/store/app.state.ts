import { signalStore, withState } from "@ngrx/signals";
import { HttpResponseError } from "../core/models";
import { withAppComputed } from "./app.computed";
import { withAppMethods } from "./app.methods";

export interface AppState {
    loadingPercentage: number;
    isLoading: boolean;
    isLoadingSuccess: boolean;
    isLoadingFailure: boolean;
    error: HttpResponseError | undefined;
}
export const initialAppState: AppState = {
    loadingPercentage: 0,
    isLoading: false,
    isLoadingSuccess: false,
    isLoadingFailure: false,
    error: undefined
}

export const AppStore = signalStore(
    withState(initialAppState),
    withAppComputed(),
    withAppMethods()
);