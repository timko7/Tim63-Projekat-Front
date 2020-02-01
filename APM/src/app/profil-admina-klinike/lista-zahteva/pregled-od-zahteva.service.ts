import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PregledOdZahteva } from './pregled-od-zahteva';


@Injectable()
export class PregledOdZahtevaServices {

    constructor(private _http:HttpClient) {
        //url je /api/preglediOdZahteva
    }

    public dodajPregledOdZahteva(pregled: PregledOdZahteva) {
        return this._http.post<PregledOdZahteva>("/api/preglediOdZahteva/add", pregled);
    }
    
    

}
