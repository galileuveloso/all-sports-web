import { Routes } from '@angular/router';

import {
    AuthGuard,
    PermissaoGuard,
    UsuarioNaoAutorizadoUiComponent
} from './core';

import {
    EstabelecimentoListComponent,
    EstabelecimentoResolver,
    HomeComponent,
    LoadingComponent,
    LoginComponent,
    LoginLocalStorageAnalyzeComponent,
    UsuarioEstabelecimentoResolver,
    UsuarioResolver
} from './features';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: "loading",
        component: LoadingComponent,
        resolve: {
            estabelecimento: EstabelecimentoResolver,
            usuarioEstabelecimento: UsuarioEstabelecimentoResolver,
            usuario: UsuarioResolver
        },
        canActivate: [AuthGuard, PermissaoGuard],//TODO - Organizar as roles das paginas
        data: { role: ['Administrador', ''] }
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard, PermissaoGuard],//TODO - Organizar as roles das paginas
        data: { role: ['Administrador'] }
    },
    {
        path: 'estabelecimentos',
        component: EstabelecimentoListComponent,
        canActivate: [AuthGuard, PermissaoGuard],//TODO - Organizar as roles das paginas
        data: { role: ['Administrador'] }
    },
    {
        path: "local-storage-analyze",
        component: LoginLocalStorageAnalyzeComponent
    },
    {
        path: "usuario-nao-autorizado",
        component: UsuarioNaoAutorizadoUiComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'home',
    }
];
