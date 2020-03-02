import { Component, OnInit, Input } from '@angular/core';
import { ProcessLogFilesService } from '@log_services/process-log-files.service';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LogNotify, FileProcess, ProcessState } from '@log_models';

@Component({
  selector: 'app-processing-log',
  templateUrl: './processing-log.component.html',
  styleUrls: ['./processing-log.component.scss']
})
export class ProcessingLogComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();

  isProcessCardExpanded: boolean;

  constructor(
    public servProcessLogFiles: ProcessLogFilesService
  ) { }

  ngOnInit() {
    this.servProcessLogFiles.processNotifications = [];
    this.servProcessLogFiles.onProcessNotification
    .pipe(takeUntil(this.destroyed$))
    .subscribe((logNotify: LogNotify) => {
        let file = this.servProcessLogFiles.processingFiles.find(pr => pr.uploadedFile.name == logNotify.fileName) as FileProcess;
        file.processState = ProcessState.complate;
        this.servProcessLogFiles.processNotifications.push(logNotify);  
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
