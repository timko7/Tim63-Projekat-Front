import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pacijent } from '../pacijent/pacijent';
import { PacijentServces } from '../pacijent/pacijent.services';

@Component({
    templateUrl: './profil-pacijenta-component.html',
})
  export class ProfilPacijentaComponent implements OnInit {

    data: any;
    idPacijenta: number;
    pacijent: Pacijent;

    constructor(private _route: ActivatedRoute, private _router: Router, private pacijentService:PacijentServces) {
        this._route.queryParams.subscribe(params => {
            if (params && params.special) {
                this.data = JSON.parse(params.special);
            }
        });

    }


    ngOnInit(): void {
        this.idPacijenta = this.data;
        this.pacijentService.vratiKorisnika(this.idPacijenta).subscribe({
            next: pac => {
                this.pacijent = pac;
                console.log("Pacijent: ", this.pacijent.id);
            }
        });
    }


    onBack(): void {
        this._router.navigate(['/lekar']);
    }

    

}