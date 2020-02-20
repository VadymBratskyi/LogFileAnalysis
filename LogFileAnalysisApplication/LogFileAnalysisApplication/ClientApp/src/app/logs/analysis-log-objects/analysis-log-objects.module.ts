import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisLogObjectsRoutingModule } from './analysis-log-objects-routing.module';
import { AnalysisLogObjectsComponent } from './analysis-log-objects.component';


@NgModule({
  declarations: [AnalysisLogObjectsComponent],
  imports: [
    CommonModule,
    AnalysisLogObjectsRoutingModule
  ]
})
export class AnalysisLogObjectsModule { }
