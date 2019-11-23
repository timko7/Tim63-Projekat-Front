import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacijentComponent } from './pacijent-component';
import { HomeComponent } from './home-component';
 
const routes: Routes = [
  { path: 'signup', component: PacijentComponent },
  //{ path: 'pacijenti', component: HomeComponent }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }//za sad ga ne koristimo
