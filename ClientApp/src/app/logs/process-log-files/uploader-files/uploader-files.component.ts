import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ProcessLogFilesService } from '@log_services/process-log-files.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-uploader-files',
  templateUrl: './uploader-files.component.html',
  styleUrls: ['./uploader-files.component.scss']
})
export class UploaderFilesComponent implements OnInit, OnChanges {
  
  @Input() inSessionId: string;

  uploadSaveUrl = "";
  uploadRemoveUrl = "";
  
  constructor(
    public servProcessLogFiles: ProcessLogFilesService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.uploadSaveUrl = environment.localhostApp + environment.urlProcessLogApi + environment.methodUploadLogFiles + "?sessionId=" + this.inSessionId;
    this.uploadRemoveUrl = environment.localhostApp + environment.urlProcessLogApi + environment.methodRemoveLogFiles + "?sessionId=" + this.inSessionId;
  }

  onGetMessage() {
    this.servProcessLogFiles.getTestObjects()
      .subscribe(rez => {
        alert(rez.value);
      });
  }

  onPostMessage() {
    this.servProcessLogFiles.postTestObjects()
    .subscribe(rez => {
      alert(rez.value);
    });
  }

}
