import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sala } from './sala';
import { SalaServices } from './sala.services';
import { AdminKlinikeService } from '../profil-amina-klinike.services';
import { IAdminKlinike } from '../admin-klinike';

@Component({
  selector: 'pm-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  sala: Sala;
  sale: Sala[] = [];
  adminKlinike: IAdminKlinike;
  salaZaIzmenu: Sala;
  mozesDaMenjas: boolean = false;
  nazivSaleKojeSeMenja: string;
  noviNaziv: string;

  constructor(private _router: Router, private salaServices: SalaServices, private adminKlinikeService: AdminKlinikeService) { 
    this.sala = new Sala();
    this.salaZaIzmenu = new Sala();
    // this.adminKlinikeService.getAdminKlinike().subscribe({
    //     next: admin => {
    //       this.adminKlinike = admin;
    //     }
    //   });
  }

  ngOnInit() {
    
    this.adminKlinikeService.getAdminKlinike().subscribe({
        next: admin => {
          this.adminKlinike = admin;

          this.salaServices.getSale(this.adminKlinike.idKlinike).subscribe({
            next: sale => {
              this.sale = sale;
            }
          });

        }
      });
      
    // this.salaServices.getSale(this.adminKlinike.idKlinike).subscribe({
    //   next: sale => {
    //     this.sale = sale;
    //   }
    // });

    

  }

  onBack(): void {
    this._router.navigate(['/adminKlinike']);
  }

  onSubmit() {
    if (this.sala.naziv.replace(/\s/g, '').length) {
      this.sala.idKlinike = this.adminKlinike.idKlinike;
      this.salaServices.save(this.sala).subscribe();
      this.sala.naziv = "";
      //this.refresh();
    }
    else {
      alert('Uneti su samo prazni stringovi(spaces, tabs)\nUnesite ispravan naziv!');
      console.log('string only contains whitespace (ie. spaces, tabs or line breaks)');
      this.sala.naziv = "";
    }
  }

  refresh(): void {
    window.location.reload();
  }

    obrisiSalu(sala: Sala): void {
    this.salaServices.obrisi(sala).subscribe();
    this.refresh();
    }

    izmeniSalu(sala: Sala): void {
        this.mozesDaMenjas = true;
        this.nazivSaleKojeSeMenja = sala.naziv;
        this.salaZaIzmenu = sala;

    }

    onSubmitIzmeni() {
        this.salaZaIzmenu.naziv = this.noviNaziv;
        this.salaServices.izmeni(this.salaZaIzmenu).subscribe();
        this.mozesDaMenjas = false;
    }




}
