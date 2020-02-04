import { Component, OnInit } from '@angular/core';
import { ITipPregleda } from '../tipovi-pregleda/tip-pregleda';
import { Sala } from '../sale/sala';
import { Lekar } from 'src/app/lekar/lekar';
import { TipoviService } from '../tipovi-pregleda/tipovi-pregleda.service';
import { SalaServices } from '../sale/sala.services';
import { LekarServces } from 'src/app/lekar/lekar.services';
import { AdminKlinikeService } from '../profil-amina-klinike.services';
import { IAdminKlinike } from '../admin-klinike';
import { Pregled } from './pregled';
import { PreglediService } from './pregledi.service';
import { Router } from '@angular/router';
import { Time } from '@angular/common';

@Component({
  templateUrl: './pregledi.component.html',
  styleUrls: ['./pregledi.component.css']
})
export class PreglediComponent implements OnInit {

  adminKlinike: IAdminKlinike;
  tipoviKlinike: ITipPregleda[] = [];
  saleKlinike: Sala[] = [];
  lekariKlinike: Lekar[] = [];

  izabraniTip: ITipPregleda;
  izabranaSala: Sala;
  izabraniLekar: Lekar;

  pregledZaDodati: Pregled;

  mozesDodati: boolean = true;


  constructor(private _router:Router, private adminKlinikeService: AdminKlinikeService, private tipService: TipoviService, private saleService: SalaServices, private lekarService: LekarServces, private pregledService: PreglediService) { 
    this.pregledZaDodati = new Pregled();
    //this.pregledZaDodati.datumVreme = this.toDateString(new Date);
    this.izabraniTip = new ITipPregleda();
    this.izabranaSala = new Sala();
    this.izabraniLekar = new Lekar();
  }

  ngOnInit() {
    this.adminKlinikeService.getAdminKlinike().subscribe({
      next: admin => {
        this.adminKlinike = admin;

        this.saleService.getSale(this.adminKlinike.idKlinike).subscribe({
          next: sale => {
            this.saleKlinike = sale;
          }
        });

        this.lekarService.getLekare(this.adminKlinike.idKlinike).subscribe({
          next: lekari => {
            this.lekariKlinike = lekari;
          }
        });

        this.tipService.getTipovi(this.adminKlinike.idKlinike).subscribe({
          next: tipovi => {
            this.tipoviKlinike = tipovi;
          }
        });

      }
    });
  }


  onSubmit() {
    this.mozesDodati = true;
    //this.pregledZaDodati.trajanjePregleda = 
    //this.pregledZaDodati.datumVreme
    this.pregledZaDodati.idTipa = this.izabraniTip.id;
    this.pregledZaDodati.idSale = this.izabranaSala.id;
    this.pregledZaDodati.idLekara = this.izabraniLekar.id; 
    this.pregledZaDodati.idKlinike=this.izabraniLekar.idKlinike;
    //this.pregledZaDodati.cena
    //this.pregledZaDodati.datumVreme = this.toDateString(this.izabraniDatum);
    let datumVremeSada: string = this.toDateString(new Date);

    if (datumVremeSada > this.pregledZaDodati.datumVreme.toString()) {
      alert("Uneti datum i vreme su prosli!\nPonovite unos datuma i vremena!");
      this.mozesDodati = false;
    }

    if ( this.pregledZaDodati.trajanjePregleda < 1 ||
        this.pregledZaDodati.idTipa == undefined ||
        this.pregledZaDodati.idSale == undefined ||
        this.pregledZaDodati.idLekara == undefined ||
        this.pregledZaDodati.cena < 0 ) {
          alert("Neispravno uneti podaci!!\nPonovite unos!");
          this.mozesDodati = false;
          console.log("DATE now: ", this.toDateString(new Date));
          console.log("Izabrani date: ", this.pregledZaDodati.datumVreme);
      }

    if (this.mozesDodati == true) {
      this.pregledService.dodaj(this.pregledZaDodati).subscribe();
      alert("Uspesno definisan pregled!!");
      this.refresh();
    }

    console.log("Izabrano je: ", this.izabraniTip, this.izabranaSala, this.izabraniLekar);
  }

  refresh(): void {
    window.location.reload();
  }

  private toDateString(date: Date): string {
    return (date.getFullYear().toString() + '-' 
       + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
       + ("0" + (date.getDate())).slice(-2))
       + 'T' + date.toTimeString().slice(0,5);
  }

  onBack(): void {
    this._router.navigate(['/adminKlinike']);
  }

  
 
}
