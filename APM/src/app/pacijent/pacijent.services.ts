
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pacijent } from './pacijent';
import { Korisnik } from '../login/Korisnik';

@Injectable()
export class PacijentServces{
    private pacijetUrl:string;

    constructor(private http:HttpClient){
      //  this.pacijetUrl='http//localhost:8080/api/pacijenti';
    }
  
    public findAll(): Observable<Pacijent[]> {
      return this.http.get<Pacijent[]>("/api/pacijenti");
    }
    public vratiKorisnika(id:number):Observable<Pacijent>{
      return this.http.get<Korisnik>("/api/pacijenti/user/" + id);
    }

    public save(pacijent:Pacijent){
        return this.http.post<Pacijent>("/api/pacijenti/signup",pacijent);
    }

    public login(email: string, password: string){
      return this.http.post("/api/pacijenti/login", {email, password});
  }
  public update(pacijentZaIzmenu:Pacijent){
    return this.http.put("/api/pacijenti/"+pacijentZaIzmenu.id, pacijentZaIzmenu);
  }
 
 
}