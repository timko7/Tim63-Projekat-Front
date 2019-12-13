import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { IAdminKlinike } from './admin-klinike';
import { AdminKlinikeService } from './profil-amina-klinike.services';
import { LoginServces } from '../login/login.services';

@Component({
  templateUrl: './profil-admina-klinike.component.html',
  styleUrls: ['./profil-admina-klinike.component.css']
})
export class ProfilAdminaKlinikeComponent implements OnInit {

  //nazivAdmina: string = "Pera Peric(hardcore)";

  adminiKlinike: IAdminKlinike[] = [];
  admin : IAdminKlinike ;
  request: Request;

  mozesDaMenjasPass: boolean = false;
  stariPassword: string;
  noviPassword: string;

  promenioPass: boolean = false;

  mozesDaMenjasPodatke: boolean = false;
  adminSaNovimPodacima: IAdminKlinike;
  menjaniPodaci: boolean = false;

  constructor(private _router: Router,private adminService:AdminKlinikeService, private loginService: LoginServces) {
      this.admin = new IAdminKlinike();
      this.adminSaNovimPodacima = new IAdminKlinike();
      this.adminSaNovimPodacima.ime = "";
      this.adminSaNovimPodacima.prezime = "";
      this.adminSaNovimPodacima.grad = "";
      this.adminSaNovimPodacima.drzava = "";
      this.adminSaNovimPodacima.adresa = "";
      this.adminSaNovimPodacima.telefon = "";
   }

  ngOnInit() {
      this.adminService.getAdminKlinike().subscribe({
        next: admin=>{
            this.admin=admin;
            console.log('Admin', this.admin);
            if(this.admin.prviPutLogovan == true) {
              alert("Prvi put ste ulogovani!\nMolimo promenite lozinku!");
            }
        }
      });
      //this.admin = this.adminiKlinike[0];
      
  }

  odjaviSe() {
      if(this.admin.prviPutLogovan == true && this.promenioPass == false) {
        alert("Prvi put ste ulogovani i niste promenili lozinku!\nMolimo promenite lozinku!");
      } else {
        this.loginService.IzlogujSe(this.request).subscribe(result=>this.kraj());
      }
  }

  kraj() {
      this._router.navigate(["/login"]);
  }

  izmeniPassword() {
      this.mozesDaMenjasPass = true;
      this.mozesDaMenjasPodatke = false;
  }

  onSubmitIzmeniPass() {
      if(this.stariPassword == this.admin.password) {
          this.adminService.promeniLozinku(this.admin.id, this.noviPassword).subscribe(()=>this.krajIzmene());
          this.mozesDaMenjasPass = false;
      } else {
          alert("Neuspesna izmena lozinke. Nije uneta stara lozinka!");
      }
  }

  krajIzmene(): void {
      this.promenioPass = true;
      this.odjaviSe();
  }

  izmeniPodatke() {
      this.mozesDaMenjasPodatke = true;
      this.mozesDaMenjasPass = false;
  }

  onSubmitIzmeniPodatke() {
      if(this.adminSaNovimPodacima.ime.replace(/\s/g, '').length) {
        this.admin.ime = this.adminSaNovimPodacima.ime;
        this.menjaniPodaci = true;
      }

      if(this.adminSaNovimPodacima.prezime.replace(/\s/g, '').length) {
        this.admin.prezime = this.adminSaNovimPodacima.prezime;
        this.menjaniPodaci = true;
      }

      if(this.adminSaNovimPodacima.grad.replace(/\s/g, '').length) {
        this.admin.grad = this.adminSaNovimPodacima.grad;
        this.menjaniPodaci = true;
      }

      if(this.adminSaNovimPodacima.drzava.replace(/\s/g, '').length) {
        this.admin.drzava = this.adminSaNovimPodacima.drzava;
        this.menjaniPodaci = true;
      }

      if(this.adminSaNovimPodacima.adresa.replace(/\s/g, '').length) {
        this.admin.adresa = this.adminSaNovimPodacima.adresa;
        this.menjaniPodaci = true;
      }

      if(this.adminSaNovimPodacima.telefon.replace(/\s/g, '').length) {
        this.admin.telefon = this.adminSaNovimPodacima.telefon;
        this.menjaniPodaci = true;
      }

      if(this.menjaniPodaci == true) {
        this.adminService.izmeniPodatke(this.admin).subscribe(()=> {
          this.mozesDaMenjasPodatke = false; 
          this.mozesDaMenjasPass = false;
          this.menjaniPodaci = false;
          this.odjaviSe();
        });
      }
      
      

  }

}
