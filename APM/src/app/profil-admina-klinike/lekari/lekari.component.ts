import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-lekari',
  templateUrl: './lekari.component.html',
  styleUrls: ['./lekari.component.css']
})
export class LekariComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  onBack(): void {
    this._router.navigate(['/adminKlinike']);
  }


}
