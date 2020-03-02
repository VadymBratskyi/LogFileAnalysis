import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProcessLogFilesService } from '@log_services/process-log-files.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();

  constructor(
    private router: Router,
    private servProcessLogFiole: ProcessLogFilesService
  ) { }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public onProcessLogFile() {
    this.servProcessLogFiole.CreateProcessLogSession()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(sessionId => {
        this.router.navigate(["/process-log-files", sessionId]);
    });
  }

}
