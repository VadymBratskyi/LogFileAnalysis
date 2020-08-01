import { Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';
import { ErrorStatusesModel, Answer, UnKnownError, KnownErrorConfig } from '@log_models';
import { AnswerObjectsService } from '@log_services';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-error-settings',
  templateUrl: './error-settings.component.html',
  styleUrls: ['./error-settings.component.scss']
})
export class ErrorSettingsComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();

  @Input() unKnownError: UnKnownError;

  @Output() setSettings = new EventEmitter();

  constructor(public dialog: MatDialog,
    private answerObjectsService: AnswerObjectsService) { }
  
  answer = new Answer();

  public get geStatusCodeTitle() {
    return this.answer.statusCode >= 0 && this.answer.statusTitle ? `${this.answer.statusCode} - ${this.answer.statusTitle}` : '';
  }

  private setAnswer(result: ErrorStatusesModel) {
    this.answer.statusCode = result.code;
    this.answer.statusTitle = result.title;
    this.answer.statusId = result.objetcId;
  }
  
  private generateKnownConfig(answerId: string) {
    return {
      unKnownErrorId: this.unKnownError.objectId,
      statusErrorId: this.answer.statusId,
      answerId: answerId
    } as KnownErrorConfig;
  }

  ngOnInit(): void {
  }

  onOpenStatusDialog() {
    this.dialog.open(StatusDialogComponent, {
        data: {}
    }).afterClosed().subscribe((result: ErrorStatusesModel) => {
        if(result) {
          this.setAnswer(result);
        }      
    });
  }

  onSaveAnswer() {
    if(!this.answer || !this.answer.text) {
      return;
    }
      this.answer.unKnownErrorId = this.unKnownError.objectId;
      this.answerObjectsService.saveNewAnswerData(this.answer)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(result => {
          let config = this.generateKnownConfig(result);
          this.setSettings.emit(config);
        });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
