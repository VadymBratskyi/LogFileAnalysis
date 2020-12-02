import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProcessLogFilesService } from '@log_services';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();

  @ViewChild('snav', { static: true }) sidenav: MatSidenav;

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

  public closeSnav() {
	this.sidenav.close();
  }

}
