import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { NotificationsService, ProcessLogFilesService } from '@log_services';
import { environment } from 'environments/environment';
import { SuccessEvent, SelectEvent, RemoveEvent, FileRestrictions } from '@progress/kendo-angular-upload';
import { ReplaySubject } from 'rxjs';
import { FileProcess, ProcessState } from '@log_models';

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
    public servNotifications: NotificationsService,
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

  onErrorEventHandler(e: any) {
    let fl = e.files[0];
    let file = this.servProcessLogFiles.processingFiles.find(pr => pr.uploadedFile.uid == fl.uid) as FileProcess;
    file.processState = ProcessState.failed;
    file.errorMessage = e.response.error;      
  }

  onSelectEventHandler(e: SelectEvent) {
    e.files.forEach(file => {
      let proccFile = new FileProcess({uploadedFile:file, sessionId: this.inSessionId});
      this.servProcessLogFiles.processingFiles.push(proccFile);
    });
  }

  onRemoveEventHandler(e: RemoveEvent): void {
    e.files.forEach(file => {
      let flIndex = this.servProcessLogFiles.processingFiles.findIndex(pr => pr.uploadedFile.uid == file.uid);
      if(flIndex >= 0) {
        this.servProcessLogFiles.processingFiles.splice(flIndex, 1);
      }
      this.servNotifications.deleProcessLogNotify(file.name);
    });
  }

  onShowDetailsError(procFile: FileProcess) {
    alert(procFile.errorMessage);
  }

  onRunProcessFiles() {
    this.servProcessLogFiles.startProcessLogFiles(this.inSessionId);  
    this.servProcessLogFiles.processingFiles.forEach(pr => {
      if(pr.processState == ProcessState.default) {
        pr.processState = ProcessState.processing;
      }      
    });
  }

  onRunProcessSinglFile(procFile: FileProcess) {    
    this.servProcessLogFiles.startProcessSinglLogFile(procFile.uploadedFile.name);    
    procFile.processState = ProcessState.processing;   
  }

}
