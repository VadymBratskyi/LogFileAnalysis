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
import { ErrorStatusesTreeComponent } from './components/error-settings/status-dialog/error-statuses-tree/error-statuses-tree.component';
import { ErrorStatusFormComponent } from './components/error-settings/status-dialog/error-status-form/error-status-form.component';
import { SelectedStatusComponent } from './components/error-settings/status-dialog/selected-status/selected-status.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ErrorTableComponent, ErrorSettingsComponent, StatusDialogComponent, ErrorStatusesTreeComponent, ErrorStatusFormComponent, SelectedStatusComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
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
