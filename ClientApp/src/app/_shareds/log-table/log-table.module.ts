import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogTableComponent } from './log-table.component';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { TreetableModule } from 'ng-material-treetable';


@NgModule({
  declarations: [LogTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    TreetableModule
  ],
  exports: [LogTableComponent]
})
export class LogTableModule { }
