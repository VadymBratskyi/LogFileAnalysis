import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowLogObjectsRoutingModule } from './show-log-objects-routing.module';
import { ShowLogObjectsComponent } from './show-log-objects.component';
import { FiltersPanelComponent } from './filters-panel/filters-panel.component';
import { QueryBuilderComponent } from './query-builder/query-builder.component';
import { ResultPanelComponent } from './result-panel/result-panel.component';
import { MatButtonModule, MatButtonToggleModule, MatIconModule, MatCardModule, MatTooltipModule, MatTreeModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
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
