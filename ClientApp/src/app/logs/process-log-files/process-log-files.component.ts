import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { NotificationsService, ProcessLogFilesService } from '@log_services';
import { LogNotify, ProcessState, FileProcess, OfferNotify, Offer } from '@log_models';

@Component({
  selector: 'app-process-log-files',
  templateUrl: './process-log-files.component.html',
  styleUrls: ['./process-log-files.component.scss'],
  providers: [NotificationsService]
})
export class ProcessLogFilesComponent implements OnInit, OnDestroy {
  
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();
  
  successUploaded: boolean;

  sessionId: string;

  constructor(    
    public servProcessLogFiles: ProcessLogFilesService,
    public servNotifications: NotificationsService,
    private activatedRoute: ActivatedRoute
  ) { 
     
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.destroyed$))
      .subscribe(p => {
        this.sessionId = p.get("sessionId");
        this.servProcessLogFiles.startHubConnection();
      });
  }

  ngOnInit() {
    this._progressAnalisysFiles();
    this._processOfferIssues();
  }

  private _progressAnalisysFiles() {
    this.servProcessLogFiles.onProcessNotification
    .pipe(takeUntil(this.destroyed$))
    .subscribe((logNotify: LogNotify) => {
        this._complateProcesFile(logNotify.fileName);
        this.servNotifications.addProcessLogNotify(logNotify);
    });
  }

  private _processOfferIssues() {
    this.servProcessLogFiles.onOfferNotification
    .pipe(takeUntil(this.destroyed$))
    .subscribe((offerNotify: OfferNotify) => {
        this.servNotifications.offerNotification = offerNotify; 
    }); 
  }

  private _complateProcesFile(fileName: string) {
    let file = this.servProcessLogFiles.processingFiles.find(pr => pr.uploadedFile.name == fileName) as FileProcess;
    file.processState = ProcessState.complate;
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.servProcessLogFiles.stopHubConnection();
  }

}
