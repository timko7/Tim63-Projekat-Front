import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAdminKlinike } from './admin-klinike';
import { Korisnik } from '../login/Korisnik';


@Injectable()
export class AdminKlinikeService {
       
    private adminKlinike: IAdminKlinike;

    constructor(private _http: HttpClient) {}

    getAdminKlinike() : Observable<IAdminKlinike> {
        
        let param: any = {'id': 0};
        //this.http.get(`${ApiUrl}`, {params: param})
        return this._http.get<IAdminKlinike>("/api/login/vratiUlogovanog");
    }

    getAdminKlinikeUlogovanogKorisnik() : Observable<Korisnik> {
        
        let param: any = {'id': 0};
        //this.http.get(`${ApiUrl}`, {params: param})
        return this._http.get<Korisnik>("/api/login/vratiUlogovanog");
    }

    promeniLozinku(idAdmina: number, noviPassword: string) {
        return this._http.put("/api/adminiKlinike/promeniLozinku/" + idAdmina, noviPassword);
    }

    izmeniPodatke(admin: IAdminKlinike) {
        return this._http.put("/api/adminiKlinike/promeniPodatke/", admin);
    }



}
