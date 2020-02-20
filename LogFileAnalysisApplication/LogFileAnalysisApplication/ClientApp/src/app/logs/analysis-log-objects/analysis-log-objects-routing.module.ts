import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalysisLogObjectsComponent } from './analysis-log-objects.component';


const routes: Routes = [
  {
    path: "",
    component: AnalysisLogObjectsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisLogObjectsRoutingModule { }
