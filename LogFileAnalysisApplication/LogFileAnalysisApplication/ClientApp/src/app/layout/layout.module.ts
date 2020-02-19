import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatListModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  declarations: [
    LayoutComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,

    /**material */
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ]
})
export class LayoutModule { }
