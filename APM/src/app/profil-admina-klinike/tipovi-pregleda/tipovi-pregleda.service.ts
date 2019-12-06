import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITipPregleda } from './tip-pregleda';

@Injectable()
export class TipoviService {

    constructor(private _http: HttpClient) {}

    public dodaj(tip: ITipPregleda) {
        return this._http.post<ITipPregleda>("/api/tipoviPregleda/add", tip);
    }

    getTipovi(idKlinike: number) : Observable<ITipPregleda[]> {
        
        return this._http.get<ITipPregleda[]>("/api/tipoviPregleda/" + idKlinike);
    }

    obrisi(tip: ITipPregleda) {
        return this._http.delete("/api/tipoviPregleda/obrisi/" + tip.id);
    }

    izmeni(tipZaIzmenu: ITipPregleda) {
        return this._http.put("/api/tipoviPregleda/izmeni/" + tipZaIzmenu.nazivTipa, tipZaIzmenu);
    }

}