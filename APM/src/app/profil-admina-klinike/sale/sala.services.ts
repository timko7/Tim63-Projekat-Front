import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sala } from './sala';
import { Observable } from 'rxjs';

@Injectable()
export class SalaServices {

    constructor(private _http:HttpClient) {
        //url je /api/sale/add
    }
    
    public save(sala: Sala) {
        return this._http.post<Sala>("/api/sale/add", sala);
    }

    public getSale(): Observable<Sala[]> {
        return this._http.get<Sala[]>("/api/sale");
    }

    public obrisi(sala: Sala) {
        return this._http.delete("/api/sale/obrisi/"+sala.naziv);
    }
}
