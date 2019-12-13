import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lekar } from './lekar';
import { Observable } from 'rxjs';


@Injectable()
export class LekarServces{
        
    private pacijetUrl:string;

    constructor(private http:HttpClient){
      //  this.pacijetUrl='http//localhost:8080/api/pacijenti';
    }
  
    public findAll(): Observable<Lekar[]> {
      return this.http.get<Lekar[]>("/api/lekari");
    }
    public findLekar(id:number):Observable<Lekar>{
      return this.http.get<Lekar>("/api/lekari/lekar/" + id);
    }

    public save(lekar:Lekar){
        return this.http.post<Lekar>("/api/lekari/dodajLekara",lekar);
    }

    public getLekare(idKlinike: number): Observable<Lekar[]> {
        return this.http.get<Lekar[]>("/api/lekari/" + idKlinike);
    }

    public getLekarePoTipu(idTipa: number): Observable<Lekar[]> {
      return this.http.get<Lekar[]>("/api/lekari/vratiPoTipu/" + idTipa);
  }

    public obrisi(lekar: Lekar) {
        return this.http.delete("/api/lekari/" + lekar.id);
    }

    

}