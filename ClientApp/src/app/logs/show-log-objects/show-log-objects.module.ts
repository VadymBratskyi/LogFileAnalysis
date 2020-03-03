import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowLogObjectsRoutingModule } from './show-log-objects-routing.module';
import { ShowLogObjectsComponent } from './show-log-objects.component';
import { FiltersPanelComponent } from './filters-panel/filters-panel.component';
import { ResultPanelComponent } from './result-panel/result-panel.component';
import { MatButtonToggleModule, MatCardModule, MatIconModule, MatButtonModule } from '@angular/material';
import { QueryBuilderComponent } from './query-builder/query-builder.component';


@NgModule({
  declarations: [ShowLogObjectsComponent, FiltersPanelComponent, ResultPanelComponent, QueryBuilderComponent],
  imports: [
    CommonModule,
    ShowLogObjectsRoutingModule,

    /**material */
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule
  ]
})
export class ShowLogObjectsModule { }
