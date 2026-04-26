import { computed } from "@angular/core"
import { withComputed, signalStoreFeature, type } from "@ngrx/signals"
import { AutenticacaoState } from "./autenticacao.state"

export function withAutenticacaoComputed() {
  return signalStoreFeature(
    { state: type<AutenticacaoState>() },
    withComputed((state) => {

      return {
        isLoadingTexto: computed(() => {
          const loading = state.isLoading();
          return loading ? 'Carregando...' : 'Pronto!';
        }),

        getNomeUsuario: computed(() => {
          const autenticacao = state.autenticacao();
          return autenticacao?.claims?.getValue('name');
        }),

        getEmailUsuario: computed(() => {
          const autenticacao = state.autenticacao();
          return autenticacao?.claims?.getValue('email');
        }),

        getAutenticacao: computed(() => {
          return state.autenticacao();
        }),

        getToken: computed(() => {
          const autenticacao = state.autenticacao();
          if (!autenticacao)
            return '';
          return autenticacao.token;
        }),

        getClaims: computed(() => {
          const autenticacao = state.autenticacao();

          if (!autenticacao)
            return null;

          return autenticacao.claims;
        }),

        hasRoleAdministrador: computed(() => {
          const autenticacao = state.autenticacao();

          if (!autenticacao)
            return false;

          if (!autenticacao.claims)
            return false;

          let claim = autenticacao
            .claims
            .getMappedRole();

          return claim.has('administrador');
        })
      }
    })
  );
}