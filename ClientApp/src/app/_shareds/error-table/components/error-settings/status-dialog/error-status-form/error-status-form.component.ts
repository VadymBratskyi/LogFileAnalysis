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
 
  public keyWords: string;

  public get getSubstatusTitle() {
    return this.model.subStatusTitle ? this.model.subStatusTitle : ''; 
  }

  private processKeyWords() {
    if(this.keyWords && this.keyWords.length > 0) {
      let words = this.keyWords.split(' ');
      this.model.keyWords = words;
    }    
  }

  onSaveNewModel() {
    this.processKeyWords();
    this.addNewModel.emit(this.model);
  }

  onCancelNewModel() {
    this.addNewModel.emit();
  }

}
