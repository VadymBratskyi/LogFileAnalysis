import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnknownErrorRoutingModule } from './unknown-error-routing.module';
import { UnknownErrorComponent } from './unknown-error.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UnknownErrorTableComponent } from './unknown-error-table/unknown-error-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UnknownErrorSettingsComponent } from './unknown-error-settings/unknown-error-settings.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { StatusDialogComponent } from './unknown-error-settings/status-dialog/status-dialog.component';
import { ErrorStatusFormComponent } from './unknown-error-settings/status-dialog/error-status-form/error-status-form.component';
import { ErrorStatusesTreeComponent } from './unknown-error-settings/status-dialog/error-statuses-tree/error-statuses-tree.component';
import { SelectedStatusComponent } from './unknown-error-settings/status-dialog/selected-status/selected-status.component';
import { MatTreeModule } from '@angular/material/tree';


@NgModule({
  declarations: [
    UnknownErrorComponent, 
    UnknownErrorTableComponent, 
    UnknownErrorSettingsComponent,
    StatusDialogComponent,
    ErrorStatusFormComponent,
    ErrorStatusesTreeComponent,
    SelectedStatusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UnknownErrorRoutingModule,
    
    /**material */
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTreeModule
  ]
})
export class UnknownErrorModule { }
