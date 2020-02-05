import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Klinika } from './klinika';
import { Ocena } from '../home-page-pacijenta/ocena';



@Injectable()
export class KlinikaServices{
  
    private klinikaUrl:string;

    constructor(private http:HttpClient){
    }
  
    public findAll(): Observable<Klinika[]> {
      return this.http.get<Klinika[]>("/api/klinike");
    }

        public save(klinika:Klinika){
            return this.http.post<Klinika>("/api/klinike/napraviKliniku",klinika);
        }
        public vratiKliniku(klinika:Klinika){
          return this.http.get<Klinika>("/api/klinike/" + klinika.id);
        }

        public vratiKlinikuPoId(id:number){
          return this.http.get<Klinika>("/api/klinike/" +id);
        }
        public oceniKliniku(ocena:Ocena){
          return this.http.post("/api/klinike/oceniKliniku/"+ocena.idKlinike, ocena.ocena);
        }

    
        
    public getKlinika(klinikaId:number): Observable<Klinika> {
      return this.http.get<Klinika>("/api/klinike/" + klinikaId);
    }

    azurirajKliniku(stariNazivKlinike: string, klinika: Klinika) {
      return this.http.put("/api/klinike/promeniPodatke/" + stariNazivKlinike, klinika);
    }


    public getSrednjaOcenaKlinike(klinikaId:number): Observable<number> {
      return this.http.get<number>("/api/klinike/srednjaOcenaKlinike/" + klinikaId);
    }


}