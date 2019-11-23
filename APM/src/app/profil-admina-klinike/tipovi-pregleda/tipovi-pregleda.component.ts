import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITipPregleda } from './tip-pregleda';
import { TipoviService } from './tipovi-pregleda.service';

@Component({
  selector: 'pm-tipovi-pregleda',
  templateUrl: './tipovi-pregleda.component.html',
  styleUrls: ['./tipovi-pregleda.component.css']
})
export class TipoviPregledaComponent implements OnInit {

  
  tipovi: ITipPregleda[] = [];


  constructor(private _router: Router, private tipoviService: TipoviService) { }

  ngOnInit() {
    this.tipoviService.getTipovi().subscribe({
      next: tipovi => {
        this.tipovi = tipovi;
      }
    })
  }

  onBack(): void {
    this._router.navigate(['/adminKlinike']);
  }

}
