import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { Klinika } from '../klinika/klinika';
import { KlinikaServices } from '../klinika/klinika.services';
import { LekarServces } from '../lekar/lekar.services';
import { Lekar } from '../lekar/lekar';



@Component({
  templateUrl: './listaKlinika.html',

})
export class ListaKlinikaComponent implements OnInit{

  klinike:Klinika[]=[];
  lekari:Lekar[]=[];
  lekariPretrage:Lekar[]=[];
  prikaziLekare:boolean=false;
  filtriraneKlinike:Klinika[];
  izabranaKlinika:Klinika;
  _imeKlinike:string;
  _adresaKlinike:string;
  _imeLekara:string;
  _prezimeLekara:string;
  dugmeZaPretragu:boolean=false;
  dugmeZaPretraguKlinike:boolean=false;
  pom:Klinika[]=[];


  constructor(private _router: Router,private klinikaService:KlinikaServices,private lekarServices:LekarServces) {
    this.izabranaKlinika=new Klinika();
  }

  
  get imeKlinike():string{
    return this._imeKlinike;
  }

  set imeKlinike(value:string){
    this._imeKlinike=value;
    this.filtriraneKlinike= this.imeKlinike ? this.filtriraj(this.imeKlinike):this.klinike;
  }
  
  get adresaKlinike():string{
    return this._adresaKlinike;
  }

  set adresaKlinike(value:string){
    this._adresaKlinike=value;
    //this.filtriraneKlinike= this.imeKlinike ? this.filtriraj(this.imeKlinike):this.klinike;
  }

  filtriraj(poljeZaFilter:string):Klinika[]{
    poljeZaFilter=poljeZaFilter.toLowerCase();
    return this.klinike.filter((klinika:Klinika)=>klinika.ime.toLowerCase().indexOf(poljeZaFilter)!=-1);

  }

  get imeLekara():string{
    return this._imeLekara;
  }

  get prezimeLekara():string{
    return this._prezimeLekara;
  }

  set imeLekara(value:string){
    this._imeLekara=value;
  }

  set prezimeLekara(value:string){
    this._prezimeLekara=value;
  }


  ngOnInit() {
    this.klinikaService.findAll().subscribe( {
      next:klinike=>{this.klinike=klinike}
    });
    this.filtriraneKlinike=this.klinike;
    
       
    
  }
  onBack(): void {
    this._router.navigate(['/homePagePacijent']);
  }
  preuzmiZaPretragu(){
    this.dugmeZaPretraguKlinike=true;
      for(let klinika of this.klinike){
       if(klinika.adresa==this.adresaKlinike)
            this.pom.push(klinika);
            this.filtriraneKlinike=this.pom;
      }
      this.adresaKlinike="";
      this.pom=[];
  }

  idiNaListuLekara(klinika:Klinika):void{
    this.prikaziLekare=true;
    this.izabranaKlinika=klinika;
   // this.lekarPretrage=new Lekar();
   this.lekariPretrage=[];
    this.klinikaService.vratiKliniku(this.izabranaKlinika).subscribe({
      next: klinika => {

        this.lekarServices.getLekare(this.izabranaKlinika.id).subscribe({
          next: lekari => {
            this.lekari = lekari;
          }
        });

       
        

      }
    });
}
pretraziLekare(){
  this.dugmeZaPretragu=true;
  //this.lekarPretrage=new Lekar();
  for(let lekar of this.lekari){
    if(lekar.ime==this.imeLekara && lekar.prezime==this.prezimeLekara)
      this.lekariPretrage.push(lekar);
      this.lekari=this.lekariPretrage;
     console.log(this.lekari);
    
  }
   
    //this.dugmeZaPretragu=false;
    this.imeLekara="";
    this.prezimeLekara="";
    }

    nazad(){
      this.lekariPretrage=[];
      this.klinikaService.vratiKliniku(this.izabranaKlinika).subscribe({
        next: klinika => {
  
          this.lekarServices.getLekare(this.izabranaKlinika.id).subscribe({
            next: lekari => {
              this.lekari = lekari;
            }
          });
        }
      });
    }


}