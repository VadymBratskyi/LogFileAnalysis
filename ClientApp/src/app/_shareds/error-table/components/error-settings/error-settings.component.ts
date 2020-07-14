import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';
import { ErrorStatusesModel, Answer } from '@log_models';

@Component({
  selector: 'app-error-settings',
  templateUrl: './error-settings.component.html',
  styleUrls: ['./error-settings.component.scss']
})
export class ErrorSettingsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  answer = new Answer();

  public get geStatusCodeTitle() {
    return this.answer.statusCode >= 0 && this.answer.statusTitle ? `${this.answer.statusCode} - ${this.answer.statusTitle}` : '';
  }

  ngOnInit(): void {
  }

  onOpenStatusDialog() {
    this.dialog.open(StatusDialogComponent, {
        data: {}
    }).afterClosed().subscribe((result: ErrorStatusesModel) => {
        if(result) {
          this.answer.statusCode = result.code;
          this.answer.statusTitle = result.title;
          this.answer.statusId = result.objetcId;
        }      
    });
  }

  onSaveAnswer() {
    console.log(this.answer);

  }

}
