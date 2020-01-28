import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { zakazaniPregled } from './zakazaniPregled';



@Injectable()
export class ZakazaniPregledService{
    private klinikaUrl:string;

    constructor(private http:HttpClient){
    }
  
    public findAll(): Observable<zakazaniPregled[]> {
      return this.http.get<zakazaniPregled[]>("/api/zakazaniPregledi");
    }
    public nadjiPOId(id:number): Observable<zakazaniPregled> {
      return this.http.get<zakazaniPregled>("/api/zakazaniPregledi/"+id);
    }

        public save(zakazaniPregled:zakazaniPregled){
            return this.http.post<zakazaniPregled>("/api/zakazaniPregledi/add",zakazaniPregled);
        }

        public nadjiPoLekaru(id:number): Observable<zakazaniPregled[]> {
          return this.http.get<zakazaniPregled[]>("/api/zakazaniPregledi/uzmiZakazane/"+id);
        }
        public nadjiPoKlinici(id:number): Observable<zakazaniPregled[]> {
          return this.http.get<zakazaniPregled[]>("/api/zakazaniPregledi/uzmiZakazanePoKlinici/"+id);
        }

        public promeniOdradjen(pregled:zakazaniPregled) {
          return this.http.put<zakazaniPregled>("/api/zakazaniPregledi/zakaziPregled/"+pregled.id,pregled);
        }

        public nadjiPoPacijentu(id:number): Observable<zakazaniPregled[]> {
          return this.http.get<zakazaniPregled[]>("/api/zakazaniPregledi/uzmiZakazanePacijente/"+id);
        }
        

}