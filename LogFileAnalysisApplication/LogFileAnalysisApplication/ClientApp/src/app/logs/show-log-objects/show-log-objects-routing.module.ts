import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowLogObjectsComponent } from './show-log-objects.component';


const routes: Routes = [
  {
    path: "",
    component: ShowLogObjectsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowLogObjectsRoutingModule { }
