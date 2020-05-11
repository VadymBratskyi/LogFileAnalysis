import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CardHomeComponent } from './card/card-home.component';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";


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
