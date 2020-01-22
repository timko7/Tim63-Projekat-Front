import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ZahtevOdsustvo } from './ZahtevOdsustvo';

@Injectable({
  providedIn: 'root'
})
export class OdsustvoServices {
  
  constructor(private _http: HttpClient) { }

  public posalji(zahtevZaSlanje: ZahtevOdsustvo) {
    return this._http.post<ZahtevOdsustvo>("api/zahteviOdsustvo/add", zahtevZaSlanje);
  }

  getZahtevePoIDklinike(idKlinike: number) : Observable<ZahtevOdsustvo[]> {
    return this._http.get<ZahtevOdsustvo[]>("api/zahteviOdsustvo/getPoIDklinike/" + idKlinike);
  }

}
