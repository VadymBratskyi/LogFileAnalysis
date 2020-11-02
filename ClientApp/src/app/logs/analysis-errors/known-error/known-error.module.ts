import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KnownErrorRoutingModule } from './known-error-routing.module';
import { KnownErrorComponent } from './known-error.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { KnownErrorTableComponent } from './known-error-table/known-error-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LogTreeTableModule } from '@log_shareds';


@NgModule({
  declarations: [KnownErrorComponent, KnownErrorTableComponent],
  imports: [
    CommonModule,
    LogTreeTableModule,
    KnownErrorRoutingModule,   
    
    /**material */
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ]
})
export class KnownErrorModule { }
