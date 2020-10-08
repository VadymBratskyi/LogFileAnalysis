import { Component } from '@angular/core';
import { NotificationsService, ProcessLogFilesService } from '@log_services';

@Component({
  selector: 'app-processing-log',
  templateUrl: './processing-log.component.html',
  styleUrls: ['./processing-log.component.scss']
})
export class ProcessingLogComponent {

  isProcessCardExpanded: boolean;

  public get notifications() {
    return this.servNotifications.processedFileNotification;
  }

  constructor(
    public servNotifications: NotificationsService,
    public servProcessLogFiles: ProcessLogFilesService
  ) { }

}
