import { jwtDecode } from 'jwt-decode';

import {
    ClaimItemModel
} from '../claim-item/claim-item.model';

export class ClaimModel {
    public itens: ClaimItemModel[] = new Array<ClaimItemModel>();

    public get(
        key: string
    ): ClaimItemModel | undefined {

        return this
            .itens
            .find((item) => item.key == key);
    }

    public getValue(
        key: string
    ): string {

        let claim = this
            .itens
            .find((item) => item.key == key);

        return claim == undefined ? '' : claim.value;
    }

    public getItens(
        key: string
    ): ClaimItemModel[] {

        return this
            .itens
            .filter((item) => item.key.includes(key));
    }

    public getMappedRole(): Map<string, boolean> {
        let mappedItens = new Map<string, boolean>();
        let role = this.get('role');

        if (!role || role.value == null) {
            return mappedItens;
        }

        if (typeof role.value == 'string') {
            mappedItens.set(role.value.trim(), true);
            return mappedItens;
        }


        if (role) {
            if (role.value == 'root')
                mappedItens.set('root', true);
            else
                (role.value as any)
                    .forEach((role: any) => {
                        if (role)
                            mappedItens.set(role.toString().trim(), true);
                    });
        }

        return mappedItens;
    }

    public getPermissionTree(): any {
        let instance = {};
        let props: Map<string, boolean> = this.getMappedRole();
        return Object.assign(instance as any, Object.fromEntries(props))
    }

    public set(
        claim: ClaimItemModel
    ) {

        this.itens = [...this.itens, claim];
    }

    public setValue(
        key: string,
        value: string
    ) {

        this.itens = this
            .itens
            .map(item => {
                if (item.key == key)
                    item.value = value;
                return item;
            })
    }

    public add(
        key: string,
        value: any
    ) {

        this
            .itens
            .push(ClaimItemModel.create({
                'key': key,
                'value': value
            }));
    }

    public upsert(
        key: string,
        value: any
    ) {

        let index = this.findIndex(key);
        if (index < 0)
            this.add(key, value);
        else
            this.itens[index].value = value;
    }

    public replace(
        value: string
    ): string {

        let response = value.trim();
        this
            .itens
            .forEach(item => {
                response = response.replace(item.key, item.value.toString());
            });
        return response;
    }

    public findIndex(
        key: string
    ): number {

        return this
            .itens
            .findIndex(element => element.key == key);
    }

    public remove(
        key: string
    ) {

        this.itens = this
            .itens
            .filter(item => item.key != key);
    }

    public clear() {
        this.itens = new Array<ClaimItemModel>();
    }

    public static create(
        data: any
    ) {

        let instance = new ClaimModel();
        instance.itens = !data || !data.itens ? [] : data.itens.map((item: any) => ClaimItemModel.create(item));
        return instance;
    }

    public createFromJwtToken(
        jwtToken: string
    ) {

        let entries = Object.entries(jwtDecode(jwtToken) as object);
        let map = new Map(entries);
        for (let [key, value] of map)
            this.add(this.claimKeyMap(key), value);
    }

    public static merge(
        source: ClaimModel,
        target: ClaimModel
    ): ClaimModel {

        let claimModel = ClaimModel.create(source);
        target
            .itens
            .forEach(item => {
                claimModel.upsert(item.key, item.value);
            });
        return claimModel;
    }

    private claimKeyMap = (
        key: string
    ): string => {

        switch (key) {
            case 'sub':
                return 'usuario.id';
            //TODO case role, tratamento especial?
            default:
                return key;
        }
    }
}