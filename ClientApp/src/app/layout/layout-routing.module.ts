import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "home",
        loadChildren: () => import('../home/home.module').then(h => h.HomeModule)
      },
      {
        path: "process-log-files/:sessionId",
        loadChildren: () => import('../logs/process-log-files/process-log-files.module').then(p => p.ProcessLogFilesModule)
      },
      {
        path: "show-log-objects",
        loadChildren: () => import('../logs/show-log-objects/show-log-objects.module').then(s => s.ShowLogObjectsModule)
      },
      {
        path: "analysis-errors",
        loadChildren: () => import('../logs/analysis-errors/analysis-errors.module').then(a => a.AnalysisErrorsModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
    ]    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
