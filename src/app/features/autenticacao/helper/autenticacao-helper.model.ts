import { AutenticacaoModel } from "app/domain";

import moment from "moment";

export class AutenticacaoHelper {
    public static getRotaProviderMps(
        rotaProvider: any
    ): string {
        let rota = String(rotaProvider.state?.route).split('@#')[0];

        if (!rota)
            return '/dashboard';

        return rota;
    }

    public static getManterLogadoProviderMps(
        rotaProvider: any
    ): boolean {
        let manterLogado = String(rotaProvider.state?.route).split('@#')[1];

        if (!manterLogado)
            return false;

        return true;
    }

    public static getContinuarLogadoMps(rotaProvider: any): boolean {
        return String(rotaProvider.state?.route).split('@#')[1] !== "false";
    }

    public static getTokenIsValid(token: string) {
        let autenticacao = AutenticacaoModel.createFromJwtToken(token);
        let data = moment.unix(+autenticacao.claims.getValue("exp"));

        return moment().isBefore(data);
    }
}