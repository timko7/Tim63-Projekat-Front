import { Component, OnInit } from '@angular/core';
import { Klinika } from 'src/app/klinika/klinika';
import { IAdminKlinike } from '../admin-klinike';
import { KlinikaServices } from 'src/app/klinika/klinika.services';
import { AdminKlinikeService } from '../profil-amina-klinike.services';
import { Router } from '@angular/router';
import { LekarServces } from 'src/app/lekar/lekar.services';
import { Lekar } from 'src/app/lekar/lekar';
import { IzvestajiService } from './izvestaji.service';

@Component({
  selector: 'pm-izvestaji-poslovanja',
  templateUrl: './izvestaji-poslovanja.component.html',
  styleUrls: ['./izvestaji-poslovanja.component.css']
})
export class IzvestajiPoslovanjaComponent implements OnInit {

  adminKlinike: IAdminKlinike;
  klinika: Klinika;
  lekariKlinike: Lekar[] = [];

  prOcenaKlinike: number;
  listaProsecnihOcenaLekara: number[] = [];

  pocetak: string; 
  kraj: string;
  prihod: number = 0;

  constructor(private _router: Router, private adminServis: AdminKlinikeService, private klinikaServis: KlinikaServices, private lekarServis: LekarServces, private izvestajService: IzvestajiService) { 
    this.adminKlinike = new IAdminKlinike();
    this.klinika = new Klinika();

    this.pocetak = this.toDateString(new Date);
    this.kraj = this.toDateString(new Date);
  }

  ngOnInit() {
    this.adminServis.getAdminKlinike().subscribe({
      next: admin => {
        this.adminKlinike = admin;
        if(this.adminKlinike != null) {
          this.klinikaServis.getKlinika(this.adminKlinike.idKlinike).subscribe({
            next: klinika => {
              this.klinika = klinika;
              this.klinikaServis.getSrednjaOcenaKlinike(this.klinika.id).subscribe({
                next: prosecnaOcena => {
                  this.prOcenaKlinike = prosecnaOcena;
                }
              });
              this.lekarServis.getLekare(this.klinika.id).subscribe({
                next: lekari => {
                  this.lekariKlinike = lekari;
                  //var zavrsio: boolean = true;
                  // for (let lekar of this.lekariKlinike) {
                  //   //if (zavrsio == true) {
                  //     //zavrsio = false;
                  //     this.lekarServis.getSrednjaOcenaLekara(lekar.id).subscribe({
                  //       next: prOcena => {
                  //         if (isNaN(prOcena)) {
                  //         //if (prOcena == NaN) {
                  //           this.listaProsecnihOcenaLekara.push(0.0);
                  //         } else {
                  //           this.listaProsecnihOcenaLekara.push(prOcena);
                  //         }
                  //         console.log("Pr ocena: ", prOcena);
                  //         console.log("A lista ocena je: ", this.listaProsecnihOcenaLekara);
                  //         //zavrsio = true;
                  //       }
                  //     });
                  //   //}                    
                  // }
                }
              });
            }
          });
        }
      }
    });
  }


  private toDateString(date: Date): string {
    return (date.getFullYear().toString() + '-' 
       + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
       + ("0" + (date.getDate())).slice(-2))
       + 'T' + date.toTimeString().slice(0,5);
  }

  vratiPrihod() {
    this.izvestajService.getPrihodPoPeriodu(this.klinika.id, this.pocetak, this.kraj).subscribe({
      next: ret => {
        this.prihod = ret;
      }
    });
  }


  onBack(): void {
    this._router.navigate(['/adminKlinike']);
  }



}


