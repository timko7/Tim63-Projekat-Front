import { Component, OnInit } from '@angular/core';
import { IAdminKlinike } from '../admin-klinike';
import { Router } from '@angular/router';
import { AdminKlinikeService } from '../profil-amina-klinike.services';
import { Lekar } from 'src/app/lekar/lekar';
import { LekarServces } from 'src/app/lekar/lekar.services';
import { OdbijanjeZahtevaOdsustvo } from 'src/app/lekar/godOdmorOdsustvo/odbijanjeZahtevaOdsustvo';
import { OdsustvoServices } from 'src/app/lekar/godOdmorOdsustvo/odsustvo.services';
import { ZahtevOdsustvo } from 'src/app/lekar/godOdmorOdsustvo/zahtevOdsustvo';

@Component({
  selector: 'pm-zahtevi-za-odsustvo',
  templateUrl: './zahtevi-za-odsustvo.component.html',
  styleUrls: ['./zahtevi-za-odsustvo.component.css']
})
export class ZahteviZaOdsustvoComponent implements OnInit {

  sviZahtevi: ZahtevOdsustvo[] = [];
  adminKlinike: IAdminKlinike;
  izabraniLekari: Lekar[] = [];

  mozesDaObradis: boolean = false;
  zahtevZaObradu: ZahtevOdsustvo;

  razlogOdbijanja: string = "";

  constructor(private _router: Router, private zahteviService: OdsustvoServices, private adminKlinikeService: AdminKlinikeService, private lekarService: LekarServces) { 
    this.izabraniLekari.splice(0,this.izabraniLekari.length);
    this.zahtevZaObradu = new ZahtevOdsustvo();
  }

  ngOnInit() {
    this.adminKlinikeService.getAdminKlinike().subscribe({
      next: admin => {
        this.adminKlinike = admin;
        this.zahteviService.getZahtevePoIDklinike(this.adminKlinike.idKlinike).subscribe({
          next: zahtevi => {
            this.sviZahtevi = zahtevi;
            for(let zahtev of this.sviZahtevi) {
              this.lekarService.findLekar(zahtev.idLekara).subscribe({
                next: lekarr => {
                  this.izabraniLekari.push(lekarr);
                }
              });
            }
          }
        });
      }
    });
  }

  onBack(): void {
    this._router.navigate(['/adminKlinike']);
  }

  obradiZahtev(zahtev: ZahtevOdsustvo) {
    this.mozesDaObradis = true;
    this.zahtevZaObradu = zahtev;
  }


  odobriZahtev(zahtev: ZahtevOdsustvo) {
    this.zahteviService.odobriZahtev(zahtev).subscribe(() => window.location.reload());
    // vamo pozovi odobrenje zahteva .....
    this.mozesDaObradis = false;
  }


  odbiZahtev(zahtev: ZahtevOdsustvo) {
    if (this.razlogOdbijanja.replace(/\s/g, '').length) {
      let raz: OdbijanjeZahtevaOdsustvo = new OdbijanjeZahtevaOdsustvo();
      raz.zahtevOdsustvo = zahtev;
      raz.razlogOdbijanja = this.razlogOdbijanja;
      this.zahteviService.odbiZahtev(raz).subscribe(() => window.location.reload());
      // vamo pozovi odbijanje zahteva
      this.mozesDaObradis = false;
    }
    else {
      alert('Nije unet razlog za odbijanje zahteva!');
      console.log('string only contains whitespace (ie. spaces, tabs or line breaks)');
      this.razlogOdbijanja = "";
    }
    this.mozesDaObradis = false;
  }




}
