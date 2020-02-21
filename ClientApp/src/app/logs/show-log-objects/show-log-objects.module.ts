import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowLogObjectsRoutingModule } from './show-log-objects-routing.module';
import { ShowLogObjectsComponent } from './show-log-objects.component';


@NgModule({
  declarations: [ShowLogObjectsComponent],
  imports: [
    CommonModule,
    ShowLogObjectsRoutingModule
  ]
})
export class ShowLogObjectsModule { }
