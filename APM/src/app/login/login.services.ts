import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './login';
import { Korisnik } from './Korisnik';
import { map } from "rxjs/operators";


@Injectable()
export class LoginServces{
    private pacijetUrl:string;
  adapter: any;


    constructor(private http:HttpClient){
      //  this.pacijetUrl='http//localhost:8080/api/pacijenti';
    }

    public getKorisnika():Observable<Korisnik>{
      return this.http.get<Korisnik>("/api/login/vratiUlogovanog")//.pipe(
      //  map((data: Korisnik) =>
        //  data.map(
          //  (item: Korisnik) =>
            //  new Korisnik(item.ime, item.prezime,item.email,item.password,item.grad,
              //  item.drzava,item.adresa,item.telefon,item.broj_osiguranika,item.uloga)))
          //)
        //)
  }
  
    public ulogujSe(loginZahtev:Login){
      return this.http.post<Response>("/api/login", loginZahtev);
  }
  public IzlogujSe(request:Request){
    return this.http.post("/api/login/logOut",request);
}
 
}