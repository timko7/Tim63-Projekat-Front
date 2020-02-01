import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Sala } from './sala';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';
import { KalendarZauzecaSale } from './kalendarZauzecaSale';
import { SalaITermin } from '../lista-zahteva/salaITermin';

@Injectable()
export class SalaServices {

    constructor(private _http:HttpClient) {
        //url je /api/sale/add
    }
    
    public save(sala: Sala) {
        return this._http.post<Sala>("/api/sale/add", sala);
    }

    public getSale(idKlinike: number): Observable<Sala[]> {
        return this._http.get<Sala[]>("/api/sale/" + idKlinike);
    }

    public getSala(idSale: number): Observable<Sala> {
        return this._http.get<Sala>("/api/sale/uzmiSalu/" + idSale);
    }

    public obrisi(sala: Sala) {
        return this._http.delete("/api/sale/obrisi/"+sala.id);
    }

    public izmeni(sala: Sala) {     // /api/sale/izmeni/{naziv}
        return this._http.put("/api/sale/izmeni/" + sala.naziv, sala);
    }

    public pretraziSaluPoNazivuDatumuKlinike(idKlinike: number, naziv: string, datum: string): Observable<Sala[]> {
        return this._http.get<Sala[]>("/api/sale/pretrazi/" + "/" + idKlinike + "/" + naziv + "/" + datum);
    }

    public getKalendarZauzecaSale(idSale: number): Observable<KalendarZauzecaSale[]> {
        return this._http.get<KalendarZauzecaSale[]>("/api/kalendarSale/getPoIdSale/" + idSale);
    }

    public getPrviSledeciSlobodan(idKlinike: number, datum: string): Observable<SalaITermin> {
        return this._http.get<SalaITermin>("/api/sale/prvaSlobodna/" + idKlinike + "/"+ datum);
    }

}
