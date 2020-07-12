import { Component, OnInit, Input } from '@angular/core';
import { ErrorStatusesModel } from '@log_models';

@Component({
  selector: 'app-selected-status',
  templateUrl: './selected-status.component.html',
  styleUrls: ['./selected-status.component.scss']
})
export class SelectedStatusComponent implements OnInit {

  @Input() model: ErrorStatusesModel;

  constructor() { }

  ngOnInit(): void {
  }

}
