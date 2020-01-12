import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Klinika } from './klinika';



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
        public oceniKliniku(k:Klinika){
          return this.http.put("/api/klinike/oceniKliniku/"+k.id, k);
        }

}