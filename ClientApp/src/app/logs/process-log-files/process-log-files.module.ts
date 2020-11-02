import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProcessLogFilesRoutingModule } from './process-log-files-routing.module';
import { ProcessLogFilesComponent } from './process-log-files.component';
import { UploaderFilesComponent } from './uploader-files/uploader-files.component';
import { UploadModule } from '@progress/kendo-angular-upload';
import { ProcessingLogComponent } from './processing/processing-log.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OffersComponent } from './offers/offers.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    ProcessLogFilesComponent, 
    UploaderFilesComponent, 
    ProcessingLogComponent, OffersComponent
  ],
  imports: [
    CommonModule,
    ProcessLogFilesRoutingModule,
    FormsModule,
    
    /**material */
    MatCardModule,
    MatButtonModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,

    /**progress */
    UploadModule
  ]
})
export class ProcessLogFilesModule { }
