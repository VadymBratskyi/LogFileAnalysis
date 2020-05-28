import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnknownErrorComponent } from './unknown-error.component';


const routes: Routes = [
  {
    path: "",
    component: UnknownErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnknownErrorRoutingModule { }
