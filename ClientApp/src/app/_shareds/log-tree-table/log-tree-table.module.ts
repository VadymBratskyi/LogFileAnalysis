import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogTreeTableComponent } from './components/log-tree-table/log-tree-table.component';
import { InnerTableComponent } from './components/inner-table/inner-table.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [LogTreeTableComponent, InnerTableComponent],
  imports: [
    CommonModule,
    /**material */
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule
  ],
  exports: [LogTreeTableComponent]
})
export class LogTreeTableModule { }
