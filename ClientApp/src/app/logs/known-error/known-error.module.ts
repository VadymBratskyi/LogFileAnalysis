import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KnownErrorRoutingModule } from './known-error-routing.module';
import { KnownErrorComponent } from './known-error.component';
import { LogTableModule } from '@log_shareds';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [KnownErrorComponent],
  imports: [
    CommonModule,
    KnownErrorRoutingModule,    
    LogTableModule,
    /**material */
    MatCardModule,
    MatButtonModule
  ]
})
export class KnownErrorModule { }
