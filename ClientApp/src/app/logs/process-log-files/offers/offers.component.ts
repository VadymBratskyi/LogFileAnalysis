import { Component } from '@angular/core';
import { LogTableState } from '@log_models';
import { NotificationsService, ProcessLogFilesService } from '@log_services';

@Component({
	selector: 'app-offers',
	templateUrl: './offers.component.html',
	styleUrls: ['./offers.component.scss']
})
export class OffersComponent {
	public displayTableColumns = ['statusCode', 'errorMessage', 'answerMessage' ];
	public pageSizeOptions = [10, 25, 50, 100];
	public resultsLength = 0;
	public logTableState = {
		skip: 0,
		take: 10
	} as LogTableState;

	public isProcessCardExpanded: boolean;

	public get offerMessages() {
		return this.servNotifications?.offerNotification?.offerMessages;
	}
	constructor(
		public servNotifications: NotificationsService,
		public servProcessLogFiles: ProcessLogFilesService
	) { }

	public pageChanges(state: LogTableState) {}

}
