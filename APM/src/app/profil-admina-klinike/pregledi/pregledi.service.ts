import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pregled } from './pregled';

@Injectable({
  providedIn: 'root'
})
export class PreglediService {

  constructor(private _http: HttpClient) { }

  public dodaj(pregledZaDodati: Pregled) {
    return this._http.post<Pregled>("/api/pregledi/add", pregledZaDodati);
  }


}
