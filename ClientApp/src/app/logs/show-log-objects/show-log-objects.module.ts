import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowLogObjectsRoutingModule } from './show-log-objects-routing.module';
import { ShowLogObjectsComponent } from './show-log-objects.component';
import { FiltersPanelComponent } from './filters-panel/filters-panel.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { LogQueryBuilderModule, LogTreeTableModule } from '@log_shareds';
import { LogObjectsTableComponent } from './log-objects-table/log-objects-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    ShowLogObjectsComponent, 
    FiltersPanelComponent,     
    LogObjectsTableComponent
  ],
  imports: [
    CommonModule,
    ShowLogObjectsRoutingModule,    
    LogQueryBuilderModule,
    LogTreeTableModule,

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
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ]
})
export class ShowLogObjectsModule { }
