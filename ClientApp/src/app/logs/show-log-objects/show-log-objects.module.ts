import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowLogObjectsRoutingModule } from './show-log-objects-routing.module';
import { ShowLogObjectsComponent } from './show-log-objects.component';
import { FiltersPanelComponent } from './filters-panel/filters-panel.component';
import { QueryBuilderComponent } from './query-builder/query-builder.component';
import { ResultPanelComponent } from './result-panel/result-panel.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { LogTableModule, LogQueryBuilderModule } from '@log_shareds';

@NgModule({
  declarations: [
    ShowLogObjectsComponent, 
    FiltersPanelComponent, 
    QueryBuilderComponent, 
    ResultPanelComponent
  ],
  imports: [
    CommonModule,
    ShowLogObjectsRoutingModule,
    LogTableModule,
    LogQueryBuilderModule,
    /**material*/
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatTreeModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ShowLogObjectsModule { }
