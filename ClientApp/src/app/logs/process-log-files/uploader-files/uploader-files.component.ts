import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { ProcessLogFilesService } from '@log_services/process-log-files.service';
import { environment } from 'environments/environment';
import { SuccessEvent, ErrorEvent, FileRestrictions, ChunkSettings, FileInfo } from '@progress/kendo-angular-upload';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-uploader-files',
  templateUrl: './uploader-files.component.html',
  styleUrls: ['./uploader-files.component.scss']
})
export class UploaderFilesComponent implements OnInit, OnChanges, OnDestroy {
    
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();

  @Input() inSessionId: string;

  isUploadCardExpanded: boolean;
  uploadSaveUrl = "";
  uploadRemoveUrl = "";
  myRestrictions: FileRestrictions = {
    allowedExtensions: ['.log']
  };
 
  constructor(
    public servProcessLogFiles: ProcessLogFilesService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.uploadSaveUrl = environment.localhostApp + environment.urlProcessLogApi + environment.methodUploadLogFiles + "?sessionId=" + this.inSessionId;
    this.uploadRemoveUrl = environment.localhostApp + environment.urlProcessLogApi + environment.methodRemoveLogFiles;
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
   
  onSuccessEventHandler(e: SuccessEvent) {  
    console.log("onSuccessEventHandler",e);
  }

  onErrorEventHandler(e: ErrorEvent) {
    console.error("onErrorEventHandler",e);
  }

  onRunProccesFiles() {
    this.servProcessLogFiles.startProcessLogFiles(this.inSessionId);  
  }

  onRunProccesSingFile(file: FileInfo) {
    this.servProcessLogFiles.startProcessSinglLogFile(file.name);     
  }

}
