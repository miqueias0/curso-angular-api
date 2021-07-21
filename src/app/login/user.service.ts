import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(
        private readonly httpClient: HttpClient,
        private readonly router: Router
    ){}

    async login(username: string, password: string){
        let headers = new HttpHeaders({'Content-type':'application/x-www-form-urlencoded'});
        let body = new HttpParams().set(`identificador`, username).set(`senha`, password);
        return this.httpClient.post<string>("http://desenv.ni.nfnoato.com.br/allus/api/autenticador/autenticar", body, {
          headers: headers,
          responseType: 'text'
        } as any).toPromise().then((r) => {if(r){
          this.router.navigate(['/painel'])
        }
        return r;
      });
      }
}