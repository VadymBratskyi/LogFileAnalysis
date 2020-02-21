import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CardHomeComponent } from './card/card-home.component';
import {
  MatCardModule,
  MatButtonModule,
  MatIconModule
} from "@angular/material";


@NgModule({
  declarations: [
    HomeComponent, 
    CardHomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,

    /**material */
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class HomeModule { }
