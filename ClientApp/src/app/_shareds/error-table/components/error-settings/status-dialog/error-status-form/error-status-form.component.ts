import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ErrorStatusesModel } from '@log_models';


@Component({
  selector: 'app-error-status-form',
  templateUrl: './error-status-form.component.html',
  styleUrls: ['./error-status-form.component.scss']
})
export class ErrorStatusFormComponent {

  @Input() model: ErrorStatusesModel;

  @Output() addNewModel = new EventEmitter();
 
  onSaveNewModel() {
    this.addNewModel.emit(this.model);
  }

  onCancelNewModel() {
    this.addNewModel.emit();
  }

}
