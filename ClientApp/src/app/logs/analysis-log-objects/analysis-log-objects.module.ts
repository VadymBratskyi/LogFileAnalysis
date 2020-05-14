import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisLogObjectsRoutingModule } from './analysis-log-objects-routing.module';
import { AnalysisLogObjectsComponent } from './analysis-log-objects.component';
import { AnalysisMenuComponent } from './analysis-menu/analysis-menu.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [AnalysisLogObjectsComponent, AnalysisMenuComponent],
  imports: [
    CommonModule,
    AnalysisLogObjectsRoutingModule,
    /**material */
    MatCardModule,
    MatTabsModule
  ]
})
export class AnalysisLogObjectsModule { }
