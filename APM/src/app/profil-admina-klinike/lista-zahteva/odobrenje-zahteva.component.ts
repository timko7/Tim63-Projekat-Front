import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { zakazaniPregled } from 'src/app/home-page-pacijenta/zakazaniPregled';
import { Sala } from '../sale/sala';
import { AdminKlinikeService } from '../profil-amina-klinike.services';
import { SalaServices } from '../sale/sala.services';
import { IAdminKlinike } from '../admin-klinike';
import { KalendarZauzecaSale } from '../sale/kalendarZauzecaSale';
import { PregledOdZahteva } from './pregled-od-zahteva';
import { PregledOdZahtevaServices } from './pregled-od-zahteva.service';
import { PreglediService } from '../pregledi/pregledi.service';
import { SalaITermin } from './salaITermin';

@Component({
  selector: 'pm-odobrenje-zahteva',
  templateUrl: './odobrenje-zahteva.component.html',
  styleUrls: ['./odobrenje-zahteva.component.css']
})
export class OdobrenjeZahtevaComponent implements OnInit {

  data: any;
  adminKlinike: IAdminKlinike;
  zahtevZaOdobriti: zakazaniPregled;
  sveSale: Sala[] = [];

  pretrazeneSale: Sala[] = [];
  nazivSalePretrazivanje: string = "";
  datumSalePretrazivanjeStr: string;
  datumSalePretrazivanje: Date;
  nepronadjeneSale: boolean = false;

  kalendarZauzecaSale: KalendarZauzecaSale[] = [];

  isIzabranaSala: boolean = false;
  izabranaSala: Sala;

  noviPregledOdZahteva: PregledOdZahteva;

  kliknutoPrviSlobodan: boolean = false;
  prvaSalaITermin: SalaITermin;

  constructor(private _route: ActivatedRoute, private _router: Router, private salaServices: SalaServices, private adminKlinikeService: AdminKlinikeService, private pregledOdZahtevaService: PregledOdZahtevaServices, private pregledServices: PreglediService) { 
    this._route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });
    this.zahtevZaOdobriti = new zakazaniPregled();
    this.datumSalePretrazivanjeStr = this.toDateString(new Date);
    console.log("Datum sada: ", this.datumSalePretrazivanjeStr);
    this.izabranaSala = new Sala();
    this.noviPregledOdZahteva = new PregledOdZahteva();
    this.prvaSalaITermin = new SalaITermin();
    this.prvaSalaITermin.datum = new Date();
  }

  ngOnInit() {
    this.zahtevZaOdobriti = this.data;
    //this.datumSalePretrazivanjeStr = this.toDateString(this.zahtevZaOdobriti.datumVreme);

    this.adminKlinikeService.getAdminKlinike().subscribe({
      next: admin => {
        this.adminKlinike = admin;

        this.salaServices.getSale(this.adminKlinike.idKlinike).subscribe({
          next: sale => {
            this.sveSale = sale;
          }
        });      
      }
    });

  }

  private toDateString(date: Date): string {
    return (date.getFullYear().toString() + '-' 
       + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
       + ("0" + (date.getDate())).slice(-2))
       + 'T' + date.toTimeString().slice(0,5);
  }

  pretraziSale() {
    this.isIzabranaSala = false;
    this.pretrazeneSale = [];
    this.nepronadjeneSale = false;
    this.kalendarZauzecaSale = [];
    console.log("izabrani dat: ", this.datumSalePretrazivanjeStr);
    console.log("zahtev dat: ", this.zahtevZaOdobriti.datumVreme);
    this.datumSalePretrazivanje = new Date(this.datumSalePretrazivanjeStr);

    if (this.nazivSalePretrazivanje.replace(/\s/g, '').length) {
      this.salaServices.pretraziSaluPoNazivuDatumuKlinike(this.adminKlinike.idKlinike, this.nazivSalePretrazivanje, this.datumSalePretrazivanjeStr).subscribe({
        next: sale=> {
          this.pretrazeneSale = sale;
          if (this.pretrazeneSale.length == 0) {
            this.nepronadjeneSale = true;
          } else {
            this.nepronadjeneSale = false;
          }
          if (!(this.pretrazeneSale.length == 0)) {
            this.salaServices.getKalendarZauzecaSale(this.pretrazeneSale[0].id).subscribe({
              next: kal => {
                this.kalendarZauzecaSale = kal;
              }
            });
          }
        }
      });
    }
    else {
      alert('Uneti su samo prazni stringovi(spaces, tabs)\nUnesite ispravan naziv za pretragu!');
      this.nazivSalePretrazivanje = "";
    }
  }

  izaberiSalu(sala: Sala) {
    this.isIzabranaSala = true;
    this.izabranaSala = sala;
  }

  napraviPregled() {
    this.noviPregledOdZahteva.datumVreme = this.zahtevZaOdobriti.datumVreme;
    this.noviPregledOdZahteva.trajanjePregleda = this.zahtevZaOdobriti.trajanjePregleda;
    this.noviPregledOdZahteva.idTipa = this.zahtevZaOdobriti.idTipa;
    this.noviPregledOdZahteva.idSale = this.izabranaSala.id;
    this.noviPregledOdZahteva.idLekara = this.zahtevZaOdobriti.idLekara;
    this.noviPregledOdZahteva.idKlinike = this.zahtevZaOdobriti.idKlinike;
    this.noviPregledOdZahteva.cena = this.zahtevZaOdobriti.cena;
    this.noviPregledOdZahteva.idPacijenta = this.zahtevZaOdobriti.idPacijenta;
    this.noviPregledOdZahteva.odradjen = false;

    this.pregledOdZahtevaService.dodajPregledOdZahteva(this.noviPregledOdZahteva).subscribe(()=>{
      this.pregledServices.promeniOdradjenZahtev(this.zahtevZaOdobriti).subscribe();
    });

    this._router.navigate(['/adminKlinike']);
  }

  prviSledeciSlobodan() {
    this.salaServices.getPrviSledeciSlobodan(this.adminKlinike.idKlinike, this.datumSalePretrazivanjeStr).subscribe({
      next: ret => {
        this.prvaSalaITermin = ret;
      }
    });
    //this.prvaSala = null;
    //this.prviTermin = this.datumSalePretrazivanje;

    this.kliknutoPrviSlobodan = true;
  }

  izaberiPrviSledeciSlobodan() {
    this.izabranaSala = this.prvaSalaITermin.sala;

    this.noviPregledOdZahteva.datumVreme = this.prvaSalaITermin.datum;
    this.noviPregledOdZahteva.trajanjePregleda = this.zahtevZaOdobriti.trajanjePregleda;
    this.noviPregledOdZahteva.idTipa = this.zahtevZaOdobriti.idTipa;
    this.noviPregledOdZahteva.idSale = this.izabranaSala.id;
    this.noviPregledOdZahteva.idLekara = this.zahtevZaOdobriti.idLekara;
    this.noviPregledOdZahteva.idKlinike = this.zahtevZaOdobriti.idKlinike;
    this.noviPregledOdZahteva.cena = this.zahtevZaOdobriti.cena;
    this.noviPregledOdZahteva.idPacijenta = this.zahtevZaOdobriti.idPacijenta;
    this.noviPregledOdZahteva.odradjen = false;

    this.pregledOdZahtevaService.dodajPregledOdZahteva(this.noviPregledOdZahteva).subscribe(()=>{
      this.pregledServices.promeniOdradjenZahtev(this.zahtevZaOdobriti).subscribe();
    });

    this._router.navigate(['/adminKlinike']);


  }




}
