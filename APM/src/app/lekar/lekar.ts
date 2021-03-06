import { Time } from '@angular/common';

export class Lekar{
    id: number;
    ime:string;
    prezime:string;
    email:string;
    password:string;
    grad:string;
    drzava:string;
    adresa:string;
    telefon:string;
    broj_osiguranika:string;
    radnoVremeOd: number;
    radnoVremeDo: number;
    slobodan: boolean;
    idKlinike: number;
    idTipa: number;
    srednjaOcena:number;
    prviPutLogovan: boolean;
}