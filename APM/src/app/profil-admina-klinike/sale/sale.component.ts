import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sala } from './sala';
import { SalaServices } from './sala.services';

@Component({
  selector: 'pm-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  sala: Sala;
  sale: Sala[] = [];

  constructor(private _router: Router, private salaServices: SalaServices) { 
    this.sala = new Sala();
  }

  ngOnInit() {
    this.salaServices.getSale().subscribe({
      next: sale => {
        this.sale = sale;
      }
    })
  }

  onBack(): void {
    this._router.navigate(['/adminKlinike']);
  }

  onSubmit() {
    this.salaServices.save(this.sala).subscribe();
    this.sala.naziv = "";
    this.refresh();
  }

  refresh(): void {
    window.location.reload();
}

obrisiSalu(sala: Sala): void {
  this.salaServices.obrisi(sala).subscribe();
  this.refresh();
}



}
