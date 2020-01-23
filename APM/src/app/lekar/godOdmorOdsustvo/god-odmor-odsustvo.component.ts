import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZahtevOdsustvo } from './ZahtevOdsustvo';
import { LekarServces } from '../lekar.services';
import { Lekar } from '../lekar';
import { OdsustvoServices } from './odsustvo.services';

@Component({
  selector: 'pm-god-odmor-odsustvo',
  templateUrl: './god-odmor-odsustvo.component.html',
  styleUrls: ['./god-odmor-odsustvo.component.css']
})
export class GodOdmorOdsustvoComponent implements OnInit {

  lekarKlinike: Lekar;
  zahtevZaPoslati: ZahtevOdsustvo;

  mozesDodati: boolean;

  constructor(private _router:Router, private lekarService: LekarServces, private odsustvoService: OdsustvoServices) { 
    this.zahtevZaPoslati = new ZahtevOdsustvo();
    this.zahtevZaPoslati.datumPocetka = this.toDateString(new Date);
    this.zahtevZaPoslati.datumZavrsetka = this.toDateString(new Date);
  }

  ngOnInit() {
    this.lekarService.getLekaraKlinike().subscribe({
      next: lekar => {
        this.lekarKlinike = lekar;
      }
    })
  }

  private toDateString(date: Date): string {
    return (date.getFullYear().toString() + '-' 
       + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
       + ("0" + (date.getDate())).slice(-2))
       + 'T' + date.toTimeString().slice(0,5);
  }

  onSubmit() {
    this.mozesDodati = true;
    this.zahtevZaPoslati.idLekara = this.lekarKlinike.id;
    this.zahtevZaPoslati.idKlinike = this.lekarKlinike.idKlinike;
    this.zahtevZaPoslati.prihvacen = false;
    this.zahtevZaPoslati.obradjen = false;
    let datumVremeSada: string = this.toDateString(new Date);

    if (datumVremeSada > this.zahtevZaPoslati.datumPocetka || datumVremeSada > this.zahtevZaPoslati.datumZavrsetka || this.zahtevZaPoslati.datumZavrsetka < this.zahtevZaPoslati.datumPocetka) {
      alert("Uneti datum je prosao ili je zavrsetak pre pocetka!\nPonovite unos datuma!");
      this.mozesDodati = false;
    }

    if (this.mozesDodati == true) {
      this.odsustvoService.posalji(this.zahtevZaPoslati).subscribe();
      alert("Zahtev uspesno poslat!!");
      this._router.navigate(['/lekar']);    
    }
  }

  refresh(): void {
    window.location.reload();
  }

  onBack(): void {
    this._router.navigate(['/lekar']);
  }

}
