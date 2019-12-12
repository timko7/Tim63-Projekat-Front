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

  constructor(private _router: Router,private adminService:AdminKlinikeService, private loginService: LoginServces) {
      this.admin = new IAdminKlinike();
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

}
