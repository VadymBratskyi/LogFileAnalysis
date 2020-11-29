import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalysisErrorRoutingModule } from './analysis-errors-routing.module';
import { AnalysisErrorsComponent } from './analysis-errors.component';
import { AnalysisMenuComponent } from './analysis-menu/analysis-menu.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [AnalysisErrorsComponent, AnalysisMenuComponent],
  imports: [
    CommonModule,
    AnalysisErrorRoutingModule,
    
    /**material */
    MatCardModule,
    MatTabsModule
  ]
})
export class AnalysisErrorsModule { }
