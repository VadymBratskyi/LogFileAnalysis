import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProcessLogFilesRoutingModule } from './process-log-files-routing.module';
import { ProcessLogFilesComponent } from './process-log-files.component';
import { UploaderFilesComponent } from './uploader-files/uploader-files.component';
import { UploadModule } from '@progress/kendo-angular-upload';
import { ProcessingLogComponent } from './processing/processing-log.component';
import {
  MatCardModule,
  MatButtonModule
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
    HttpClientModule,
    
    /**material */
    MatCardModule,
    MatButtonModule,

    /**progress */
    UploadModule
  ]
})
export class ProcessLogFilesModule { }
