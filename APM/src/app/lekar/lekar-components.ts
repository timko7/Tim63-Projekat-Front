import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lekar } from './lekar';
import { LekarServces } from './lekar.services';
import { AdminKlinikeService } from '../profil-admina-klinike/profil-amina-klinike.services';
import { IAdminKlinike } from '../profil-admina-klinike/admin-klinike';

@Component({

    selector: 'lekar-component',
    templateUrl : './dodavanjeLekara.html',
    styleUrls: ['./dodavanjeLekara.css']

})

export class LekarComponent implements OnInit {
    
    
    lekar: Lekar;
    lekari: Lekar[] = [];
    adminKlinike: IAdminKlinike;
    _imeLekara:string;
    _prezimeLekara:string;
    lekariPretrage:Lekar[]=[];
    dugmeZaPretragu=false;

    
    constructor(private route:ActivatedRoute,private router:Router,private lekarService:LekarServces, private adminKlinikeService: AdminKlinikeService){
        this.lekar=new Lekar();
    }

    ngOnInit(): void {
        this.adminKlinikeService.getAdminKlinike().subscribe({
            next: admin => {
              this.adminKlinike = admin;
    
              this.lekarService.getLekare(this.adminKlinike.idKlinike).subscribe({
                next: lekari => {
                  this.lekari = lekari;
                }
              });
    
            }
          });
    }

    onSubmit() {
        this.lekar.idKlinike = this.adminKlinike.idKlinike;
        this.lekarService.save(this.lekar).subscribe();
        alert("sacuvan korisnik "+this.lekar.ime+" "+this.lekar.prezime)
        this.lekar.ime="";
        this.lekar.prezime="";
        this.lekar.email="";
        this.lekar.password="";
        this.lekar.grad="";
        this.lekar.drzava="";
        this.lekar.adresa="";
        this.lekar.telefon="";
        this.lekar.broj_osiguranika=null;
        this.refresh();
      }

    refresh(): void {
        window.location.reload();
    }
     
    gotoUserList() {
       
    }

    onBack(): void {
        this.router.navigate(['/adminKlinike']);
      }
    
    obrisiLekara(lekar: Lekar): void {
        this.lekarService.obrisi(lekar).subscribe();
        this.refresh();
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
          this.dugmeZaPretragu=false;
          this.adminKlinikeService.getAdminKlinike().subscribe({
            next: admin => {
              this.adminKlinike = admin;
    
              this.lekarService.getLekare(this.adminKlinike.idKlinike).subscribe({
                next: lekari => {
                  this.lekari = lekari;
                }
              });
    
            }
          });
        }
    

}