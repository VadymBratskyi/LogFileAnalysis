import { Component, OnInit, Input, OnChanges, NgZone } from '@angular/core';
import { ProcessLogFilesService } from '@log_services/process-log-files.service';
import { environment } from 'environments/environment';
import { SuccessEvent, ErrorEvent, FileRestrictions, ChunkSettings, FileInfo } from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-uploader-files',
  templateUrl: './uploader-files.component.html',
  styleUrls: ['./uploader-files.component.scss']
})
export class UploaderFilesComponent implements OnInit, OnChanges {
  
  @Input() inSessionId: string;

  isUploadCardExpanded: boolean;
  uploadSaveUrl = "";
  uploadRemoveUrl = "";
  myRestrictions: FileRestrictions = {
    allowedExtensions: ['.log']
  };
 
  constructor(
    private zone: NgZone,
    public servProcessLogFiles: ProcessLogFilesService
  ) { }

  ngOnInit() {
    this.servProcessLogFiles.uploadedFile = [];
  }

  ngOnChanges() {
    this.uploadSaveUrl = environment.localhostApp + environment.urlProcessLogApi + environment.methodUploadLogFiles + "?sessionId=" + this.inSessionId;
    this.uploadRemoveUrl = environment.localhostApp + environment.urlProcessLogApi + environment.methodRemoveLogFiles;
  }
   
  onSuccessEventHandler(e: SuccessEvent) {  
    console.log("onSuccessEventHandler",e);
  }

  onErrorEventHandler(e: ErrorEvent) {
    console.error("onErrorEventHandler",e);
  }

  onRunProccesFiles() {
    this.servProcessLogFiles.startProcessLogFiles(this.inSessionId);
    this.servProcessLogFiles.onProcessNotification.subscribe((message: string) => {  
      this.zone.run(() => {
        this.servProcessLogFiles.processNotifications.push(message);  
      });  
    }); 
  }

  onRunProccesSingFile(file: FileInfo) {
    this.servProcessLogFiles.startProcessSinglLogFile(file.name);
    this.servProcessLogFiles.onProcessNotification.subscribe((message: string) => {  
      this.zone.run(() => {
        this.servProcessLogFiles.processNotifications.push(message);  
      });  
    }); 
  }

}
