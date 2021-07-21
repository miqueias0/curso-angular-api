import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProdutos } from "./pessoas/I-produtos";

@Injectable({
    providedIn: 'root'
})
export class ProdutoService{
    constructor(
        private readonly httpClient: HttpClient
    ){}

    async getProdutos(query:string, posInicial){
        const endpoint = 'http://desenv.ni.nfnoato.com.br/produto/api/produto/obterLista'
        const params = {
            texto_pesquisa: query,
            pos_inicial: posInicial,
            qtde_registros: 50,
            status: 'A'
        }
        return await this.httpClient.get<IProdutos[]>(endpoint, {
            params: params as any
        }).toPromise()
    }
}