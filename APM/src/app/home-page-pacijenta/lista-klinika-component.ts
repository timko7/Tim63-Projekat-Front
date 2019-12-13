import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { Klinika } from '../klinika/klinika';
import { KlinikaServices } from '../klinika/klinika.services';
import { LekarServces } from '../lekar/lekar.services';
import { Lekar } from '../lekar/lekar';
import { Pregled } from '../profil-admina-klinike/pregledi/pregled';
import { PreglediService } from '../profil-admina-klinike/pregledi/pregledi.service';
import { Sala } from '../profil-admina-klinike/sale/sala';
import { ITipPregleda } from '../profil-admina-klinike/tipovi-pregleda/tip-pregleda';
import { TipoviService } from '../profil-admina-klinike/tipovi-pregleda/tipovi-pregleda.service';



@Component({
  templateUrl: './listaKlinika.html',

})
export class ListaKlinikaComponent implements OnInit{

  klinike:Klinika[]=[];
  lekari:Lekar[]=[];
  lekariPretrage:Lekar[]=[];
  tipoviKlinika:ITipPregleda[]=[];
  tipoviIzabraneKlinike:ITipPregleda[]=[];
  izabraniTip:ITipPregleda;
  izabraniTip2:ITipPregleda;
  izabrainDatum:string;
  preglediZaLekre:Pregled[]=[];
  lekarPregleda:Lekar;

  prikaziLekare:boolean=false;
  tipIzabran:boolean=false;
  filtriraneKlinike:Klinika[];
  izabranaKlinika:Klinika;
  _imeKlinike:string;
  _adresaKlinike:string;
  _imeLekara:string;
  _prezimeLekara:string;
  dugmeZaPretragu:boolean=false;
  dugmeZaPretraguKlinike:boolean=false;
  dugmeZaPrikazPregleda:boolean=false;
  pom:Klinika[]=[];
  preglediKlinike:Pregled[]=[];



  constructor(private _router: Router,private klinikaService:KlinikaServices,private lekarServices:LekarServces,
    private pregledService:PreglediService,private tipService:TipoviService) {
    this.izabranaKlinika=new Klinika();
    this.izabraniTip=new ITipPregleda();
    this.izabraniTip2=new ITipPregleda();
  
    
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
    this.tipService.sviTipovi().subscribe({
      next: tipovi=>{
        this.tipoviKlinika=tipovi;
      }
    })

    this.filtriraneKlinike=this.klinike;
    
       
    
  }
  onBack(): void {
    this._router.navigate(['/homePagePacijent']);
  }
  preuzmiZaPretragu(){
    this.dugmeZaPretraguKlinike=true;
    this.tipIzabran=true;
    console.log(this.izabraniTip);
      for(let klinika of this.klinike){
       if(klinika.adresa==this.adresaKlinike && klinika.id==this.izabraniTip.idKlinike)
            this.pom.push(klinika);
            this.filtriraneKlinike=this.pom;
      }
      this.adresaKlinike="";
      this.pom=[];
  }

  idiNaListuLekara(klinika:Klinika):void{
    this.prikaziLekare=true;
    this.izabranaKlinika=klinika;
  
        if(this.tipIzabran==true){
        this.pregledService.getPregledeKlinikePoTipu(this.izabraniTip.id).subscribe({
          next: pregledi=>{
            this.preglediZaLekre=pregledi;
          
    
        for(let pregled of this.preglediZaLekre){
         this.lekarPregleda=new Lekar();
         this.lekarServices.findLekar(pregled.idLekara).subscribe({
            next:lekar=> {this.lekarPregleda=lekar
            this.lekari.push(this.lekarPregleda);
            }
         });
         
        }

    }
  });
  console.log(this.lekari);
}
else{ 
   
  //this.lekarPretrage=new Lekar();
  this.lekariPretrage=[];
   this.klinikaService.vratiKliniku(this.izabranaKlinika).subscribe({
     next: klinika => {
        this.lekarServices.getLekare(this.izabranaKlinika.id).subscribe({
          next: lekari => {
            this.lekari = lekari;
          }
        });
        this.tipService.getTipovi(this.izabranaKlinika.id).subscribe({
          next: tipovi=>{
            this.tipoviIzabraneKlinike=tipovi;
          }
        })
      }
    });


}
       
}
pretraziLekare(){
  this.dugmeZaPretragu=true;
  //this.lekarPretrage=new Lekar();
  if(this.tipIzabran){
    for(let lekar of this.lekari){
       if(lekar.ime==this.imeLekara && lekar.prezime==this.prezimeLekara)
          this.lekariPretrage.push(lekar);
         this.lekari=this.lekariPretrage;
         console.log(this.lekari);
    }
    //this.dugmeZaPretragu=false;
    this.imeLekara="";
    this.prezimeLekara="";
  }else{
    for(let lekar of this.lekari){
      if(lekar.ime==this.imeLekara && lekar.prezime==this.prezimeLekara && lekar.idKlinike==this.izabraniTip2.idKlinike)
         this.lekariPretrage.push(lekar);
        this.lekari=this.lekariPretrage;
        console.log(this.lekari);
   }
   //this.dugmeZaPretragu=false;
   this.imeLekara="";
   this.prezimeLekara="";

  }
   
    
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

    idiNaPreglede(klinika:Klinika){
        this.dugmeZaPrikazPregleda=true;
        this.pregledService.getPregledeKlinike(klinika.id).subscribe({
          next: pregledi=>{
            this.preglediKlinike=pregledi;
          }
        });

    }


}