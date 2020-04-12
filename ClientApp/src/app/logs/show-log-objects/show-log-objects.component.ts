import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

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
