import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShowLogObjectsService } from '@log_services';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent implements OnInit, OnDestroy {

  public destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>(); 

  constructor(
    private showLogObjectsService: ShowLogObjectsService
  ) { }

  ngOnInit() {
   
  }

  onLoadData() {
    this.showLogObjectsService.getTreeData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe(dataTree => {
      console.log(dataTree);
      alert("success");
    });
  }

  ngOnDestroy()  {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
