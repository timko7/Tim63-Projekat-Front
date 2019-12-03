import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAdminKlinike } from './admin-klinike';


@Injectable()
export class AdminKlinikeService {
     
    private adminKlinike: IAdminKlinike;

    constructor(private _http: HttpClient) {}

    getAdminKlinike() : Observable<IAdminKlinike> {
        
        let param: any = {'id': 0};
        //this.http.get(`${ApiUrl}`, {params: param})
        return this._http.get<IAdminKlinike>("/api/adminiKlinike/user/5");
    }

}
