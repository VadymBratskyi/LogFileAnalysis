import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorTableComponent } from './components/error-table/error-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { ErrorSettingsComponent } from './components/error-settings/error-settings.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StatusDialogComponent } from './components/error-settings/status-dialog/status-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [ErrorTableComponent, ErrorSettingsComponent, StatusDialogComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule
  ],
  exports: [ErrorTableComponent]
})
export class ErrorTableModule { }
