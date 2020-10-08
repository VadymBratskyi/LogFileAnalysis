import { Component } from '@angular/core';
import { LogTableOptions, LogTableState } from '@log_models';
import { NotificationsService, ProcessLogFilesService } from '@log_services';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent {

  isProcessCardExpanded: boolean;

  logTableOptions = {
    displayTableColumns: ['statusCode', 'errorMessage', 'answerMessage' ],    
    expandableColumns: [],
    pageSizeOptions: [10, 25, 50, 100],
    logTableState: {
      count: 0,
      skip: 0,
      take: 10
    }
  } as LogTableOptions;

  public get offerMessages() {
    return this.servNotifications?.offerNotification?.offerMessages;
  }

  constructor(
    public servNotifications: NotificationsService,
    public servProcessLogFiles: ProcessLogFilesService
  ) { }

  public dataGridChanges(state: LogTableState) {
    
  }
}
