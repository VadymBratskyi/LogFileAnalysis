import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatBadgeModule,
  MatListModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  declarations: [
    LayoutComponent    
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,

    /**material */
    MatToolbarModule,
    MatSidenavModule,
    MatBadgeModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ]
})
export class LayoutModule { }
