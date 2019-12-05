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

  constructor(private _router: Router,private adminService:AdminKlinikeService, private loginService: LoginServces) {
      this.admin = new IAdminKlinike();
   }

  ngOnInit() {
      this.adminService.getAdminKlinike().subscribe({
        next: admin=>{
            this.admin=admin;
            console.log('Admin', this.admin);
        }
      });
      //this.admin = this.adminiKlinike[0];
      
  }

  odjaviSe() {
      this.loginService.IzlogujSe(this.request).subscribe(result=>this.kraj());
  }

  kraj() {
      this._router.navigate(["/login"]);
  }

}
