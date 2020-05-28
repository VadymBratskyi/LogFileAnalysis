import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnknownErrorRoutingModule } from './unknown-error-routing.module';
import { UnknownErrorComponent } from './unknown-error.component';
import { ErrorTableComponent } from './error-table/error-table.component';
import { ErrorSettingsComponent } from './error-settings/error-settings.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LogTableModule } from '@log_shareds';


@NgModule({
  declarations: [UnknownErrorComponent, ErrorTableComponent, ErrorSettingsComponent],
  imports: [
    CommonModule,
    UnknownErrorRoutingModule,
    LogTableModule,
    /**material */
    MatCardModule,
    MatButtonModule
  ]
})
export class UnknownErrorModule { }
