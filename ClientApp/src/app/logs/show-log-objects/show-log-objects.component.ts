import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogsDtoModel } from '@log_models';
import { ShowLogObjectsService } from '@log_services/show-log-objects.service';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-show-log-objects',
  templateUrl: './show-log-objects.component.html',
  styleUrls: ['./show-log-objects.component.scss']
})
export class ShowLogObjectsComponent implements OnInit, OnDestroy {
  
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();

  constructor(
  ) { }
  
  ngOnInit() {

  }

  ngOnDestroy() {
      this.destroyed$.next(true);
      this.destroyed$.complete();
  }


}
