import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalysisLogObjectsComponent } from './analysis-log-objects.component';


const routes: Routes = [
  {
    path: "",
    component: AnalysisLogObjectsComponent,
    children: [
      {
        path: "unknown-error",
        loadChildren: () => import('./../unknown-error/unknown-error.module').then(o => o.UnknownErrorModule)        
      },
      {
        path: "known-error",
        loadChildren: () => import('./../known-error/known-error.module').then(o => o.KnownErrorModule)        
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'unknown-error'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisLogObjectsRoutingModule { }
