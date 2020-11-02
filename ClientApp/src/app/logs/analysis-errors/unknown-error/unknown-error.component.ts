import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorLogObjectsService } from '@log_services';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-unknown-error',
  templateUrl: './unknown-error.component.html',
  styleUrls: ['./unknown-error.component.scss']
})
export class UnknownErrorComponent {

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

}
