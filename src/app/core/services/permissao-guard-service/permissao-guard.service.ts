import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AutenticacaoStore } from 'app/features';

export const PermissaoGuard: CanActivateFn = (route) => {
    const router = inject(Router);
    let autenticacaoStore = inject(AutenticacaoStore);
    let claims = autenticacaoStore.getClaims();

    if (!claims) {
        router.navigate(["/usuario-nao-autorizado"]);
        return false;
    }

    const rolesExigidas = route.data['role'] ?? [];
    const possuiPermissao = rolesExigidas.some((role: any) => claims.get("role")?.value.includes(role));

    if (!possuiPermissao) {
        router.navigate(["/usuario-nao-autorizado"]);
        return false;
    }

    return true;
};