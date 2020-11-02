import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorLogObjectsService } from '@log_services';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-known-error',
  templateUrl: './known-error.component.html',
  styleUrls: ['./known-error.component.scss']
})
export class KnownErrorComponent implements OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private errorLogObjectsService: ErrorLogObjectsService
  ) {     
    this.activatedRoute.data
      .pipe(takeUntil(this.destroyed$))
      .subscribe(p => {
        this.errorLogObjectsService.errorPageType = p.pageType;
      });
  }

  ngOnDestroy() {
   this.destroyed$.next(true);
   this.destroyed$.complete();
  }

}
