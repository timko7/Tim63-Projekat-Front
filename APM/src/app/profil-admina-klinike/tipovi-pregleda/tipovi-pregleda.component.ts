import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITipPregleda } from './tip-pregleda';
import { TipoviService } from './tipovi-pregleda.service';
import { IAdminKlinike } from '../admin-klinike';
import { AdminKlinikeService } from '../profil-amina-klinike.services';

@Component({
  selector: 'pm-tipovi-pregleda',
  templateUrl: './tipovi-pregleda.component.html',
  styleUrls: ['./tipovi-pregleda.component.css']
})
export class TipoviPregledaComponent implements OnInit {

  tip: ITipPregleda;
  tipovi: ITipPregleda[] = [];
  adminKlinike: IAdminKlinike;
  tipZaIzmenu: ITipPregleda;
  mozesDaMenjas: boolean = false;
  nazivTipaKojiSeMenja: string = "";
  noviNaziv: string;
  novaCena:number;


  constructor(private _router: Router, private tipoviService: TipoviService, private adminKlinikeService: AdminKlinikeService) {
      this.tip = new ITipPregleda();
      this.tipZaIzmenu = new ITipPregleda();
  }

  ngOnInit() {
    this.adminKlinikeService.getAdminKlinike().subscribe({
        next: admin => {
          this.adminKlinike = admin;

          this.tipoviService.getTipovi(this.adminKlinike.idKlinike).subscribe({
            next: tipovi => {
              this.tipovi = tipovi;
            }
          });

        }
    });  
  }

  onBack(): void {
    this._router.navigate(['/adminKlinike']);
  }

  onSubmit() {
    if (this.tip.nazivTipa.replace(/\s/g, '').length) {
      this.tip.idKlinike = this.adminKlinike.idKlinike;
      this.tipoviService.dodaj(this.tip).subscribe();
      this.tip.nazivTipa = "";
      this.refresh();
    }
    else {
      alert('Uneti su samo prazni stringovi(spaces, tabs)\nUnesite ispravan naziv!');
      console.log('string only contains whitespace (ie. spaces, tabs or line breaks)');
      this.tip.nazivTipa = "";
    }
  }

  refresh(): void {
    window.location.reload();
  }

  obrisiTip(tip: ITipPregleda): void {
    this.tipoviService.obrisi(tip).subscribe();
    this.refresh();
  }

  izmeniTip(tip: ITipPregleda): void {
    this.noviNaziv = "";
    this.novaCena=null;
    this.mozesDaMenjas = true;
    this.nazivTipaKojiSeMenja = tip.nazivTipa.slice(0, tip.nazivTipa.length);
    this.tipZaIzmenu = tip;
  }  

  onSubmitIzmeni() {
    this.tipZaIzmenu.nazivTipa = this.noviNaziv;
    this.tipZaIzmenu.cena=this.novaCena;
    this.tipoviService.izmeni(this.tipZaIzmenu).subscribe();
    this.mozesDaMenjas = false;
    this.nazivTipaKojiSeMenja = "";
  }


}
