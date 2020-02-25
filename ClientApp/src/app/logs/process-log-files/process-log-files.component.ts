import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { ProcessLogFilesService } from '@log_services/process-log-files.service';

@Component({
  selector: 'app-process-log-files',
  templateUrl: './process-log-files.component.html',
  styleUrls: ['./process-log-files.component.scss']
})
export class ProcessLogFilesComponent implements OnInit, OnDestroy {
  
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();
  
  successUploaded: boolean;

  sessionId: string;

  arrMess: string [] = [];

  startProcess: boolean;

  constructor(
    private zone: NgZone,  
    public servProcessLogFiles: ProcessLogFilesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.destroyed$))
      .subscribe(p => {
        this.sessionId = p.get("sessionId");        
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onStartProccesLogFiles() {
    this.startProcess = true;
    this.servProcessLogFiles.startProcessLogFiles(this.sessionId);
    this.servProcessLogFiles.processNotification.subscribe((message: string) => {  
      this.zone.run(() => {
          this.arrMess.push(message);  
      });  
    }); 
  }

}
