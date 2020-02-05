import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IzvestajiService {
  
    constructor(private _http: HttpClient) { }
    
    getPrihodPoPeriodu(id: number, pocetak: string, kraj: string): Observable<number> {
        return this._http.get<number>("/api/klinike/prihod/" + id + "/" + pocetak + "/" + kraj);
    }

}