import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AutenticacaoStore } from 'app/features';

export const AuthGuard: CanActivateFn = (state) => {
    const router = inject(Router);
    const store = inject(AutenticacaoStore);

    const autenticacaoModel = store.autenticacao();

    if (autenticacaoModel?.token)
        return true;

    router.navigate(['local-storage-analyze'], {
        queryParams: { route: state.url }
    });

    return false;
};