import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogTableComponent } from './components/log-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
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
