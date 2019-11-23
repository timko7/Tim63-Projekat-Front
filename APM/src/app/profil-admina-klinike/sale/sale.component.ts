import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  onBack(): void {
    this._router.navigate(['/adminKlinike']);
  }


}
