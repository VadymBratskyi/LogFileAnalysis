import { Component, OnInit, Input } from '@angular/core';
import { ErrorStatusesModel } from 'app/_models/component/error-stauses-tree';

@Component({
  selector: 'app-error-status-form',
  templateUrl: './error-status-form.component.html',
  styleUrls: ['./error-status-form.component.scss']
})
export class ErrorStatusFormComponent implements OnInit {

  @Input() errorStatusesModel: ErrorStatusesModel;

  constructor() { }

  ngOnInit(): void {
  }

}
