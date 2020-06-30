import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnknownErrorRoutingModule } from './unknown-error-routing.module';
import { UnknownErrorComponent } from './unknown-error.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ErrorTableModule } from '@log_shareds';


@NgModule({
  declarations: [UnknownErrorComponent],
  imports: [
    CommonModule,
    UnknownErrorRoutingModule,
    ErrorTableModule,
    /**material */
    MatCardModule,
    MatButtonModule
  ]
})
export class UnknownErrorModule { }
