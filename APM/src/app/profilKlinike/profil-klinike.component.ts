import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAdminKlinike } from '../profil-admina-klinike/admin-klinike';
import { AdminKlinikeService } from '../profil-admina-klinike/profil-amina-klinike.services';
import { KlinikaServices } from '../klinika/klinika.services';
import { Klinika } from '../klinika/klinika';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'pm-profil-klinike',
  templateUrl: './profil-klinike.component.html',
  styleUrls: ['./profil-klinike.component.css']
})
export class ProfilKlinikeComponent implements OnInit {

  adminKlinike: IAdminKlinike;
  klinika: Klinika;

  mozesDaMenjasPodatke: boolean = false;
  novoImeKlinike: string = "";
  noviOpisKlinike: string = "";
  novaAdresaKlinike: string = "";
  menjaniPodaci: boolean = false;
  stariNazivKlinike: string = "";

  constructor(private _router: Router, private adminServis: AdminKlinikeService, private klinikaServis: KlinikaServices, private sanitiezer: DomSanitizer) {
    this.adminKlinike = new IAdminKlinike();
    this.klinika = new Klinika();
  }

  ngOnInit() {
    //this.sanitiezer.bypassSecurityTrustUrl("https://maps.google.com/maps?q=Vojvodjanska%205&t=&z=13&ie=UTF8&iwloc=&output=embed");
    //this.mapURL = "https://maps.google.com/maps?q=Vojvodjanska%205&t=&z=13&ie=UTF8&iwloc=&output=embed";
    this.adminServis.getAdminKlinike().subscribe({
      next: admin => {
        this.adminKlinike = admin;
        if(this.adminKlinike != null) {
          this.klinikaServis.getKlinika(this.adminKlinike.idKlinike).subscribe({
            next: klinika => {
              this.klinika = klinika;
              this.stariNazivKlinike = this.klinika.ime.slice(0, this.klinika.ime.length);
            }
          });
        }
      }
    });
  }

  onBack(): void {
    this._router.navigate(['/adminKlinike']);
  }

  mapURL(adresaKlinike: string) {
    return this.sanitiezer.bypassSecurityTrustResourceUrl("https://maps.google.com/maps?q=" + this.klinika.adresa + "&t=&z=13&ie=UTF8&iwloc=&output=embed");
  }


  izmeniPodatke() {
    this.mozesDaMenjasPodatke = true;
  }

  onSubmitIzmeniPodatke() {
    if(this.novoImeKlinike.replace(/\s/g, '').length) {
      this.klinika.ime = this.novoImeKlinike;
      this.menjaniPodaci = true;
    }

    if(this.noviOpisKlinike.replace(/\s/g, '').length) {
      this.klinika.opis = this.noviOpisKlinike;
      this.menjaniPodaci = true;
    }

    if(this.novaAdresaKlinike.replace(/\s/g, '').length) {
      this.klinika.adresa = this.novaAdresaKlinike;
      this.menjaniPodaci = true;
    }

    if(this.menjaniPodaci) {
      this.klinikaServis.azurirajKliniku(this.stariNazivKlinike, this.klinika).subscribe(
        result => {
          window.location.reload();
        },
        err => {
          //this.novoImeKlinike = "";
          alert("Neuspesna izmena klinike!");
          window.location.reload();
        }
      );
    }

    
}

ponisti() {
  this.mozesDaMenjasPodatke = false;
  this.novoImeKlinike = "";
  this.noviOpisKlinike = "";
  this.novaAdresaKlinike = "";
}
  

}
