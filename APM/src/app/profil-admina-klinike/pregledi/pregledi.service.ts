import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pregled } from './pregled';
import { Observable } from 'rxjs';
import { zakazaniPregled } from 'src/app/home-page-pacijenta/zakazaniPregled';

@Injectable({
  providedIn: 'root'
})
export class PreglediService {

  constructor(private _http: HttpClient) { }

  public dodaj(pregledZaDodati: Pregled) {
    return this._http.post<Pregled>("/api/pregledi/add", pregledZaDodati);
  }
  public getPregledeKlinike(idKlinike:number):Observable<Pregled[]>{
    return this._http.get<Pregled[]>("/api/pregledi/uzmiPreglede/" +idKlinike );
  }
  public getPregledeKlinikePoTipu(idTipa:number):Observable<Pregled[]>{
    return this._http.get<Pregled[]>("/api/pregledi/vratiPoTipu/" +idTipa );
  }
  public zakaziPregled(pregled:Pregled){
    return this._http.put("/api/pregledi/zakaziPregled/" +pregled.id,pregled );
  }
  public nadjiPoLekaru(id:number): Observable<Pregled[]> {
    return this._http.get<Pregled[]>("/api/pregledi/vratiPoLekaru/"+id);
  }
  public nadjiPoPacijentu(id:number): Observable<Pregled[]> {
    return this._http.get<Pregled[]>("/api/pregledi/vratiPoPacijentu/"+id);
  }
  public promeniOdradjen(pregled:Pregled) {
    return this._http.put<Pregled>("/api/pregledi/odradiPregled/"+pregled.id,pregled);
  }

  public promeniOdradjenZahtev(pregledZahtev:zakazaniPregled) {
    return this._http.put<zakazaniPregled>("/api/zakazaniPregledi/odradiZahtev/" + pregledZahtev.id, pregledZahtev);
  }

}
