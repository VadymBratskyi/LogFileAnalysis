import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KnownErrorComponent } from './known-error.component';


const routes: Routes = [
  {
    path: "",
    component: KnownErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnownErrorRoutingModule { }
