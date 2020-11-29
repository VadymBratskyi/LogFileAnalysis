import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Answer, ErrorStatusesModel, KnownErrorConfig, UnKnownError } from '@log_models';
import { AnswerObjectsService } from '@log_services';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';

@Component({
  selector: 'app-unknown-error-settings',
  templateUrl: './unknown-error-settings.component.html',
  styleUrls: ['./unknown-error-settings.component.scss']
})
export class UnknownErrorSettingsComponent implements OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();

  @Input() unKnownError: UnKnownError;

  @Output() setSettings = new EventEmitter();

  public answer = new Answer();

  public get geStatusCodeTitle() {
    return this.answer.statusCode >= 0 && this.answer.statusTitle ? `${this.answer.statusCode} - ${this.answer.statusTitle}` : '';
  }

  constructor(
    public dialog: MatDialog,
    private answerObjectsService: AnswerObjectsService
  ) { }
  
  private _setAnswer(result: ErrorStatusesModel) {
    this.answer.statusCode = result.code;
    this.answer.statusTitle = result.title;
    this.answer.statusId = result.objetcId;
  }
  
  private _generateKnownConfig(answerId: string) {
    return {
      unKnownErrorId: this.unKnownError.objectId,
      statusErrorId: this.answer.statusId,
      answerId: answerId
    } as KnownErrorConfig;
  }

  public onOpenStatusDialog() {
    this.dialog.open(StatusDialogComponent, {
        data: {}
    }).afterClosed().subscribe((result: ErrorStatusesModel) => {
        if(result) {
          this._setAnswer(result);
        }      
    });
  }

  public onSaveAnswer() {
    if(!this.answer || !this.answer.text) {
      return;
    }
      this.answer.unKnownErrorId = this.unKnownError.objectId;
      this.answerObjectsService.saveNewAnswerData(this.answer)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(result => {
          let config = this._generateKnownConfig(result);
          this.setSettings.emit(config);
        });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
