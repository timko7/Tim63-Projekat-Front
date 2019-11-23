import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { IAdminKlinike } from './admin-klinike';
import { AdminKlinikeService } from './profil-amina-klinike.services';

@Component({
  templateUrl: './profil-admina-klinike.component.html',
  styleUrls: ['./profil-admina-klinike.component.css']
})
export class ProfilAdminaKlinikeComponent implements OnInit {

  //nazivAdmina: string = "Pera Peric(hardcore)";

  adminiKlinike: IAdminKlinike[] = [];
  admin : IAdminKlinike ;

  constructor(private _router: Router,private adminService:AdminKlinikeService) { }

  ngOnInit() {
      this.adminService.getAdminKlinike().subscribe({
        next: admin=>{
            this.admin=admin;
        }
      });
      //this.admin = this.adminiKlinike[0];
      console.log('Admin', this.admin);
  }

}
