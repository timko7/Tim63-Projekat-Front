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
import { SalaServices } from '../profil-admina-klinike/sale/sala.services';
import { zakazaniPregled } from './zakazaniPregled';
import { LoginServces } from '../login/login.services';
import { ZakazaniPregledService } from './zakazaniPregled.services';
import { Korisnik } from '../login/Korisnik';
import { Zahtev } from '../lekar/zahtev';
import { Time } from '@angular/common';


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
  preglediZaLekre:Pregled[]=[];
  lekarPregleda:Lekar;
  zahtev:Zahtev;

  prikaziLekare:boolean=false;
  tipIzabran:boolean=false;
  datumIzabran:boolean=false;

  filtriraneKlinike:Klinika[];
  izabranaKlinika:Klinika;
  _imeKlinike:string;
  _adresaKlinike:string;
  _imeLekara:string;
  _prezimeLekara:string;
  _izabraniDatum:Date;
  _izabraniDatum2:Date;
  dugmeZaPretragu:boolean=false;
  dugmeZaPretraguKlinike:boolean=false;
  dugmeZaPrikazPregleda:boolean=false;
  pom:Klinika[]=[];
  preglediKlinike:Pregled[]=[];

  izabraniLekari: Lekar[] = [];
  izabraneSale: Sala[] = [];
  izabraniTipovi: ITipPregleda[] = [];
  index: number = 0;

  zakazaniPregled:zakazaniPregled;
  korisnik:Korisnik;
  pregledRezervisan:boolean=false;

  pomLekari:Lekar[]=[];
  terminiLekara:Array<number[]>=[];
  izabraniTermin:number;

  constructor(private _router: Router,private klinikaService:KlinikaServices,private lekarServices:LekarServces,
    private pregledService:PreglediService,private tipService:TipoviService,private salaService:SalaServices,private loginService:LoginServces,
    private zakazniPregledService:ZakazaniPregledService) {

    this.izabranaKlinika=new Klinika();
    this.izabraniTip=new ITipPregleda();
    this.izabraniTip2=new ITipPregleda();
    this.izabraniLekari.splice(0,this.izabraniLekari.length);
    this.izabraneSale.splice(0,this.izabraneSale.length);
    this.izabraniTipovi.splice(0,this.izabraniTipovi.length);
      this.zakazaniPregled=new zakazaniPregled();
      this.korisnik=new Korisnik();
      this.zahtev=new Zahtev();
      
  
    
  }

  
  get imeKlinike():string{
    return this._imeKlinike;
  }

  get izabraniDatum():Date{
    return this._izabraniDatum;
  }
  get izabraniDatum2():Date{
    return this._izabraniDatum2;
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
  set izabraniDatum(value:Date){
    this._izabraniDatum=value;
    this.datumIzabran=true;
  }
  set izabraniDatum2(value:Date){
    this._izabraniDatum2=value;
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
    
    this.loginService.getKorisnika().subscribe({next: korisnik=>{
      this.korisnik=korisnik;}
    })
    
  }
  onBack(): void {
    this._router.navigate(['/homePagePacijent']);
  }
  preuzmiZaPretragu(){
    this.dugmeZaPretraguKlinike=true;
    this.tipIzabran=true;
    console.log(this.izabraniTip);
   
      this.zahtev.adresa=this.adresaKlinike;
      this.zahtev.termin=this.izabraniDatum;
      this.zahtev.idTipa=this.izabraniTip.id;
      this.zahtev.idKlinike=this.izabraniTip.idKlinike;
      console.log(this.zahtev);
      this.lekarServices.pretraziLekare(this.zahtev).subscribe({
        next:lekari=>{this.pomLekari=lekari;
       console.log(this.pomLekari);
       for(let lekar of lekari){
         this.klinikaService.getKlinika(lekar.idKlinike).subscribe({
           next:klinika=>{this.pom.push(klinika);
          this.filtriraneKlinike=this.pom;
        console.log(this.filtriraneKlinike);}
         });
         
       }
        }
      });
      
    }
  
  idiNaListuLekara(klinika:Klinika):void{
    this.prikaziLekare=true;
    this.izabranaKlinika=klinika;
    this.terminiLekara=[];
  
        if(this.tipIzabran==true && this.datumIzabran==true){
         /* this.lekarServices.getLekarePoTipu(this.izabraniTip.id).subscribe({
            next:lekari=>{this.lekari=lekari;}
          })
       */this.lekari=this.pomLekari;
      for(let lekar of this.lekari){
        this.lekarServices.vratiTermine(lekar.id,this.izabraniDatum).subscribe({
          next:termini=>{this.terminiLekara.push(termini);
            console.log(this.terminiLekara);
            console.log(this.terminiLekara[0]);
          }
        });
      }
  console.log(this.lekari);
  this.index=this.terminiLekara.length;

}
else{ 
   
  //this.lekarPretrage=new Lekar();
  this.lekariPretrage=[];
  this.terminiLekara=[];
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
    this.index=this.terminiLekara.length;

}
       
}
pretraziLekare(){
  this.dugmeZaPretragu=true;
  this.terminiLekara=[];
  //this.lekarPretrage=new Lekar();
  if(this.tipIzabran && this.datumIzabran){
    for(let lekar of this.lekari){
       if(lekar.ime==this.imeLekara && lekar.prezime==this.prezimeLekara)
          this.lekariPretrage.push(lekar);
         this.lekari=this.lekariPretrage;
         
         console.log(this.lekari);
    }
    for(let lekar of this.lekari){
      this.lekarServices.vratiTermine(lekar.id,this.izabraniDatum).subscribe({
        next:termini=>{this.terminiLekara.push(termini);
          console.log(this.terminiLekara);
          console.log(this.terminiLekara[0]);
          this.index=this.terminiLekara.length;
        }
      });
    }
    //this.dugmeZaPretragu=false;
    this.imeLekara="";
    this.prezimeLekara="";
   
  }else{
    this.terminiLekara=[];
    this.zahtev.ime=this.imeLekara;
    this.zahtev.prezime=this.prezimeLekara;
    this.zahtev.termin=this.izabraniDatum2;
    this.zahtev.idTipa=this.izabraniTip2.id;
    this.zahtev.idKlinike=this.izabraniTip2.idKlinike;
    this.lekarServices.pretraziLekarePonovo(this.zahtev).subscribe({
      next:lekari=>{this.pomLekari=lekari;
      this.lekari=this.pomLekari;
      for(let lekar of this.lekari){
        this.lekarServices.vratiTermine(lekar.id,this.izabraniDatum2).subscribe({
          next:termini=>{this.terminiLekara.push(termini);
            console.log(this.terminiLekara);
            console.log(this.terminiLekara[0]);
            this.index=this.terminiLekara.length;
          }
        });
      }
    }
    })
     console.log(this.lekari);
      
   }
   //this.dugmeZaPretragu=false;
   this.imeLekara="";
   this.prezimeLekara="";
  

  }
   
    
    

    nazad(){
      this.lekariPretrage=[];
      this.terminiLekara=[];
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
           
    
       // this.izabraniLekari.splice(0, this.izabraniLekari.length);
        for(let pregled of this.preglediKlinike){
        this.lekarServices.findLekar(pregled.idLekara).subscribe({
          next: lekarr=>{this.izabraniLekari.push(lekarr)
          }
        });
        this.salaService.getSala(pregled.idSale).subscribe({
          next: sala=>{
            this.izabraneSale.push(sala);
          }
        });
        this.tipService.getTip(pregled.idTipa).subscribe({
          next: tip=>{
            this.izabraniTipovi.push(tip);
          }
        });
      }
      }
    });
    this.index=this.preglediKlinike.length;
 
    }


rezervisiPregled(pregled:Pregled){
  
  pregled.idPacijenta=this.korisnik.id;
  this.pregledService.zakaziPregled(pregled).subscribe(result=>alert("rezervisan pregled "),
  err=>this.pregledRezervisan=true);
  
}

rezervisiPregledPekoLekara(lekar:Lekar){
  if(this.dugmeZaPretraguKlinike){
  this.zakazaniPregled.idKlinike=lekar.idKlinike;
  this.zakazaniPregled.idLekara=lekar.id;
  this.zakazaniPregled.idTipa=lekar.idTipa;
  this.zakazaniPregled.datumVreme=this.napraviDatum();
  this.zakazaniPregled.cena=this.izabraniTip.cena;
  this.zakazaniPregled.idPacijenta=this.korisnik.id;
  this.zakazniPregledService.save(this.zakazaniPregled).subscribe();
}else{
  this.zakazaniPregled.idKlinike=lekar.idKlinike;
  this.zakazaniPregled.idLekara=lekar.id;
  this.zakazaniPregled.idTipa=lekar.idTipa;
  this.zakazaniPregled.datumVreme=this.napraviDatum2();
  this.zakazaniPregled.cena=this.izabraniTip2.cena;
  this.zakazaniPregled.idPacijenta=this.korisnik.id;
  this.zakazniPregledService.save(this.zakazaniPregled).subscribe();
}
  alert("rezervisan pregled ");
}


napraviDatum():Date{
  
  let pom=this.izabraniTermin;
  if(pom>=10){
    let vreme=this.izabraniDatum.toString()+'T'+pom.toString()+":00:00.000Z"
    let datum=new Date(vreme);
    return datum;
  }
  let vreme=this.izabraniDatum.toString()+'T0'+pom.toString()+":00:00.000Z"
  let datum=new Date(vreme);
  return datum;
 
}
napraviDatum2():Date{
  
  let pom=this.izabraniTermin;
  if(pom>=10){
    let vreme=this.izabraniDatum2.toString()+'T'+pom.toString()+":00:00.000Z"
    let datum=new Date(vreme);
    return datum;
  }
  let vreme=this.izabraniDatum2.toString()+'T0'+pom.toString()+":00:00.000Z"
  let datum=new Date(vreme);
  return datum;
 
}
      
}