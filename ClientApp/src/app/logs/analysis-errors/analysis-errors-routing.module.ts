import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageType } from '@log_models';
import { AnalysisErrorsComponent } from './analysis-errors.component';


const routes: Routes = [
  {
    path: "",
    component: AnalysisErrorsComponent,
    children: [
      {
        path: "unknown-error",
        loadChildren: () => import('./unknown-error/unknown-error.module').then(o => o.UnknownErrorModule),
        data: { pageType: ErrorPageType.unknown }        
      },
      {
        path: "known-error",
        loadChildren: () => import('./known-error/known-error.module').then(o => o.KnownErrorModule),
        data: { pageType: ErrorPageType.known }        
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
export class AnalysisErrorRoutingModule { }
