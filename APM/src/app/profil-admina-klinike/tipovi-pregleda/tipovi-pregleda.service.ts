import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITipPregleda } from './tip-pregleda';

@Injectable()
export class TipoviService {

    constructor(private _http: HttpClient) {}

    getTipovi() : Observable<ITipPregleda[]> {
        
        return this._http.get<ITipPregleda[]>("/api/tipoviPregleda");
    }

}