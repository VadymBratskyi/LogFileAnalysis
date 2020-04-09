import { Component, OnInit, Input } from '@angular/core';
import { LogsDtoModel } from '@log_models';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ShowLogObjectsService } from '@log_services/show-log-objects.service';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-result-panel',
  templateUrl: './result-panel.component.html',
  styleUrls: ['./result-panel.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ResultPanelComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();

  dataSource: LogsDtoModel[];
  columnsToDisplay = ['messageId', 'requestDate', 'responseDate'];
  expandedElement: LogsDtoModel;

  constructor(
    private showLogObjectsService: ShowLogObjectsService
  ) { }

  ngOnInit() {
    this.onLoadData();
  }

  onLoadData() {
    this.showLogObjectsService.getAllLogs(0, 10)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((logsDto:LogsDtoModel[]) => {
          this.dataSource = logsDto;
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


}
