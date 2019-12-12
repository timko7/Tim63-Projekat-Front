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
  _nazivSale:string;
  _zauzetostSale:string;
  pom:Sala[]=[];
  filtriraneSale:Sala[]=[];

  constructor(private _router: Router, private salaServices: SalaServices, private adminKlinikeService: AdminKlinikeService) { 
    this.sala = new Sala();
    this.salaZaIzmenu = new Sala();
    // this.adminKlinikeService.getAdminKlinike().subscribe({
    //     next: admin => {
    //       this.adminKlinike = admin;
    //     }
    //   });
  }

  ngOnInit():void {
    
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
      this.filtriraneSale=this.sale;
      
  }



  onSubmit() {
    if (this.sala.naziv.replace(/\s/g, '').length) {
      this.sala.idKlinike = this.adminKlinike.idKlinike;
      this.salaServices.save(this.sala).subscribe();
      this.sala.naziv = "";
      this.refresh();
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
  onBack(): void {
    this._router.navigate(['/adminKlinike']);
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

    get nazivSale():string{
      return this._nazivSale;
    }
  
    get zauzetostSale():string{
      return this._zauzetostSale;
    }
  
    set nazivSale(value:string){
      this._nazivSale=value;
    }
  
    set zauzetostSale(value:string){
      this._zauzetostSale=value;
      this.filtriraneSale= this.zauzetostSale ? this.filtriraj(this.zauzetostSale):this.sale;
    }

    filtriraj(poljeZaFilter:string):Sala[]{
      poljeZaFilter=poljeZaFilter.toLowerCase();
      return this.sale.filter((sala:Sala)=>(sala.slobodna? "Slobodna":"Zauzeta").toLowerCase().indexOf(poljeZaFilter)!=-1);
  
    }

    preuzmiZaPretragu(){

        for(let sala of this.sale){
         if(sala.naziv==this.nazivSale)
              this.pom.push(sala);
              this.filtriraneSale=this.pom;
        }
        this.nazivSale="";
        this.pom=[];
    }

    nazad(){
      this.pom=[];
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
      this.filtriraneSale=this.sale;
    }


}