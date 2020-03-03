import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { ProcessLogFilesService } from '@log_services/process-log-files.service';
import { LogNotify, ProcessState, FileProcess } from '@log_models';

@Component({
  selector: 'app-process-log-files',
  templateUrl: './process-log-files.component.html',
  styleUrls: ['./process-log-files.component.scss']
})
export class ProcessLogFilesComponent implements OnInit, OnDestroy {
  
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();
  
  successUploaded: boolean;

  sessionId: string;

  constructor(    
    public servProcessLogFiles: ProcessLogFilesService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.servProcessLogFiles.onProcessNotification
    .pipe(takeUntil(this.destroyed$))
    .subscribe((logNotify: LogNotify) => {
        let file = this.servProcessLogFiles.processingFiles.find(pr => pr.uploadedFile.name == logNotify.fileName) as FileProcess;
        file.processState = ProcessState.complate;
        this.servProcessLogFiles.processNotifications.push(logNotify);  
    });    
  }

  ngOnInit() {
    this.servProcessLogFiles.processNotifications = [];
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.destroyed$))
      .subscribe(p => {
        this.sessionId = p.get("sessionId");
        this.servProcessLogFiles.startHubConnection();        
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.servProcessLogFiles.stopHubConnection();
  }

}
