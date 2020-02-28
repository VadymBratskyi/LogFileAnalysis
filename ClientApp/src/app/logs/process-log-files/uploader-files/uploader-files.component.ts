import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ProcessLogFilesService } from '@log_services/process-log-files.service';
import { environment } from 'environments/environment';
import { SuccessEvent, ErrorEvent, FileRestrictions, ChunkSettings } from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-uploader-files',
  templateUrl: './uploader-files.component.html',
  styleUrls: ['./uploader-files.component.scss']
})
export class UploaderFilesComponent implements OnInit, OnChanges {
  
  @Input() inSessionId: string;
  @Output() onUploaded = new EventEmitter<boolean>();

  uploadSaveUrl = "";
  uploadRemoveUrl = "";
  myRestrictions: FileRestrictions = {
    allowedExtensions: ['.log']
  };
  chunkSettings: ChunkSettings = {
    size: 502400
  };
 
  constructor(
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
    console.error("onSuccessEventHandler",e);  
    this.onUploaded.emit(true);
  }

  onErrorEventHandler(e: ErrorEvent) {
    console.error("onErrorEventHandler",e);
    this.onUploaded.emit(false);
  }

}
