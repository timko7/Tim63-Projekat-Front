import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-profil-klinike',
  templateUrl: './profil-klinike.component.html',
  styleUrls: ['./profil-klinike.component.css']
})
export class ProfilKlinikeComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  onBack(): void {
    this._router.navigate(['/adminKlinike']);
  }

}
