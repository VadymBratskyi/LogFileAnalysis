import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploader-files',
  templateUrl: './uploader-files.component.html',
  styleUrls: ['./uploader-files.component.scss']
})
export class UploaderFilesComponent implements OnInit {

  uploadSaveUrl = "";//environment.localhostApp + environment.urlApi + 'PostAddFile'; // should represent an actual API endpoint
  uploadRemoveUrl = "";//environment.localhostApp + environment.urlApi + 'PostRemoveFiles'; // should represent an actual API endpoint

  constructor() { }

  ngOnInit() {
  }

}
