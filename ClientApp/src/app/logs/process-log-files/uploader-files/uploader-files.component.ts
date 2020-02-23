import { Component, OnInit } from '@angular/core';
import { ProcessLogFilesService } from '@log_services/process-log-files.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-uploader-files',
  templateUrl: './uploader-files.component.html',
  styleUrls: ['./uploader-files.component.scss']
})
export class UploaderFilesComponent implements OnInit {

  uploadSaveUrl = environment.localhostApp + environment.urlProcessLogApi + environment.methodUploadLogFiles; // should represent an actual API endpoint
  uploadRemoveUrl = environment.localhostApp + environment.urlProcessLogApi + 'PostRemoveFiles'; // should represent an actual API endpoint
  
  constructor(
    public servProcessLogFiles: ProcessLogFilesService
  ) { }

  ngOnInit() {
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
