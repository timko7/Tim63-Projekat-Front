import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lekar } from './lekar';
import { Observable } from 'rxjs';
import { Zahtev } from './zahtev';
import { Ocena } from '../home-page-pacijenta/ocena';


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
  public pretraziLekare(zahtev: Zahtev): Observable<Lekar[]> {
    return this.http.post<Lekar[]>("/api/lekari/pretraziLekarePaVratiKlinike",zahtev);
}
public pretraziLekarePonovo(zahtev: Zahtev): Observable<Lekar[]> {
  return this.http.post<Lekar[]>("/api/lekari/pretraziLekare",zahtev);
}

    public obrisi(lekar: Lekar) {
        return this.http.delete("/api/lekari/" + lekar.id);
    }
    public oceniLekara(ocena:Ocena){
      return this.http.post("/api/lekari/oceniLekara/"+ocena.idLekara, ocena.ocena);
    }

    public update(lekar:Lekar){
      return this.http.put("/api/lekari/"+lekar.id, lekar);
    }

}