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
        path: "process-log-files",
        loadChildren: () => import('../logs/process-log-files/process-log-files.module').then(p => p.ProcessLogFilesModule)
      },
      {
        path: "show-log-objects",
        loadChildren: () => import('../logs/show-log-objects/show-log-objects.module').then(s => s.ShowLogObjectsModule)
      },
      {
        path: "analysis-log-objects",
        loadChildren: () => import('../logs/analysis-log-objects/analysis-log-objects.module').then(a => a.AnalysisLogObjectsModule)
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
