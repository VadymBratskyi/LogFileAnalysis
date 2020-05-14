import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogQueryBuilderComponent } from './components/log-query-builder/log-query-builder.component';
import { QueryBuilderModule } from "angular2-query-builder";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';


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
