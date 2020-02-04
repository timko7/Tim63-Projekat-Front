import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PregledOdZahteva } from './pregled-od-zahteva';
import { Observable } from 'rxjs';


@Injectable()
export class PregledOdZahtevaServices {

    constructor(private _http:HttpClient) {
        //url je /api/preglediOdZahteva
    }

    public dodajPregledOdZahteva(pregled: PregledOdZahteva) {
        return this._http.post<PregledOdZahteva>("/api/preglediOdZahteva/add", pregled);
    }
    public vratiPoLekaru(idLekara:number):Observable<PregledOdZahteva[]> {
        return this._http.get<PregledOdZahteva[]>("/api/preglediOdZahteva/vratiPoLekaru/"+idLekara);
    }
    public vratiPoPacijentu(idPacijenta:number):Observable<PregledOdZahteva[]> {
        return this._http.get<PregledOdZahteva[]>("/api/preglediOdZahteva/vratiPoPacijentu/"+idPacijenta);
    }
    public promeniOdradjen(pregled:PregledOdZahteva) {
        return this._http.put<PregledOdZahteva>("/api/preglediOdZahteva/odradiPregled/"+pregled.id,pregled);
      }

}
