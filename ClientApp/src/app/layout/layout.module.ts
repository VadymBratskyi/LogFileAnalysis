import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { FooterLayoutComponent } from './footer/footer-layout.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    LayoutComponent,
    FooterLayoutComponent        
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
