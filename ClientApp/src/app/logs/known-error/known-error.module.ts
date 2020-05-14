import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KnownErrorRoutingModule } from './known-error-routing.module';
import { KnownErrorComponent } from './known-error.component';


@NgModule({
  declarations: [KnownErrorComponent],
  imports: [
    CommonModule,
    KnownErrorRoutingModule
  ]
})
export class KnownErrorModule { }
