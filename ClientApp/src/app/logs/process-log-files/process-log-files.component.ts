import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-process-log-files',
  templateUrl: './process-log-files.component.html',
  styleUrls: ['./process-log-files.component.scss']
})
export class ProcessLogFilesComponent implements OnInit, OnDestroy {
  
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();
  
  sessionId: string;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

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

}
