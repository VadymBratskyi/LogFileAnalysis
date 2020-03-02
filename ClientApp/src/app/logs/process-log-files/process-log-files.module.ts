import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProcessLogFilesRoutingModule } from './process-log-files-routing.module';
import { ProcessLogFilesComponent } from './process-log-files.component';
import { UploaderFilesComponent } from './uploader-files/uploader-files.component';
import { UploadModule } from '@progress/kendo-angular-upload';
import { ProcessingLogComponent } from './processing/processing-log.component';
import {
  MatCardModule,
  MatButtonModule,
  MatBadgeModule,
  MatProgressSpinnerModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  declarations: [
    ProcessLogFilesComponent, 
    UploaderFilesComponent, 
    ProcessingLogComponent
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

    /**progress */
    UploadModule
  ]
})
export class ProcessLogFilesModule { }
