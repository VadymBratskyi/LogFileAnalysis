import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessLogFilesComponent } from './process-log-files.component';


const routes: Routes = [
  {
    path: "",
    component: ProcessLogFilesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessLogFilesRoutingModule { }
