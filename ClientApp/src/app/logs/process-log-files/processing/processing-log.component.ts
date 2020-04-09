import { Component, OnInit, Input } from '@angular/core';
import { ProcessLogFilesService } from '@log_services/process-log-files.service';

@Component({
  selector: 'app-processing-log',
  templateUrl: './processing-log.component.html',
  styleUrls: ['./processing-log.component.scss']
})
export class ProcessingLogComponent implements OnInit {

  isProcessCardExpanded: boolean;

  constructor(
    public servProcessLogFiles: ProcessLogFilesService
  ) { }

  ngOnInit() {
  
  }

}
