import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogTableComponent } from './components/log-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TreeTableComponent } from './components/tree-table/tree-table.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { InnerTableComponent } from './components/tree-table/inner-table/inner-table.component';

@NgModule({
  declarations: [LogTableComponent, TreeTableComponent, InnerTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule
  ],
  exports: [LogTableComponent]
})
export class LogTableModule { }
