import { Component, OnInit } from '@angular/core';
import { ProcessLogFilesService } from '@log_services';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  isProcessCardExpanded: boolean;

  public get countOffers() {
    return this.servProcessLogFiles.offerNotification.offerMessages;
  }

  constructor(
    public servProcessLogFiles: ProcessLogFilesService
  ) { }

  ngOnInit() {
  
  }

}
