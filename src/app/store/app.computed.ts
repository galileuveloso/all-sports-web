import { computed } from "@angular/core";
import { signalStoreFeature, withComputed, withState } from "@ngrx/signals";
import { AppState, initialAppState } from "./app.state";

export function withAppComputed() {
    return signalStoreFeature(
        withState<AppState>(initialAppState),
        withComputed((state) => ({
            getLoadingPercentage: computed(() => {
                return state.loadingPercentage();
            }),
            getIsLoading: computed(() => {
                return state.isLoading();
            }),
            getIsLoadingSuccess: computed(() => {
                return state.isLoadingSuccess();
            }),
            getIsLoadingFailure: computed(() => {
                return state.isLoadingFailure();
            }),
        }))
    );
}