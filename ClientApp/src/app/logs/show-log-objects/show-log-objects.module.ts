import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowLogObjectsRoutingModule } from './show-log-objects-routing.module';
import { ShowLogObjectsComponent } from './show-log-objects.component';
import { FiltersPanelComponent } from './filters-panel/filters-panel.component';
import { QueryBuilderComponent } from './query-builder/query-builder.component';
import { ResultPanelComponent } from './result-panel/result-panel.component';
import { MatButtonModule, MatButtonToggleModule, MatIconModule, MatCardModule, MatTooltipModule, MatTreeModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatTableModule } from '@angular/material';
import { TreeChecklistComponent } from './query-builder/tree-checklist/tree-checklist.component';


@NgModule({
  declarations: [
    ShowLogObjectsComponent, 
    FiltersPanelComponent, 
    QueryBuilderComponent, 
    ResultPanelComponent, TreeChecklistComponent
  ],
  imports: [
    CommonModule,
    ShowLogObjectsRoutingModule,
    /**material*/
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatTreeModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule

  ]
})
export class ShowLogObjectsModule { }
