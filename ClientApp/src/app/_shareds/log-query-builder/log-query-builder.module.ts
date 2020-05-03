import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogQueryBuilderComponent } from './components/log-query-builder/log-query-builder.component';
import { QueryBuilderModule } from "angular2-query-builder";
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatRadioModule, 
  MatFormFieldModule, MatSelectModule, MatCheckboxModule, 
  MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';


@NgModule({
  declarations: [LogQueryBuilderComponent],
  imports: [
    CommonModule,
    FormsModule,
    QueryBuilderModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  exports: [LogQueryBuilderComponent]
})
export class LogQueryBuilderModule { }
