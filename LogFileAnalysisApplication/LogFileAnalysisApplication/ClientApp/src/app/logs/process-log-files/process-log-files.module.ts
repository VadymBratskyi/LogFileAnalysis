import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessLogFilesRoutingModule } from './process-log-files-routing.module';
import { ProcessLogFilesComponent } from './process-log-files.component';


@NgModule({
  declarations: [ProcessLogFilesComponent],
  imports: [
    CommonModule,
    ProcessLogFilesRoutingModule
  ]
})
export class ProcessLogFilesModule { }
