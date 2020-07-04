import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnalysisLogObjectsService } from '@log_services';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { ErrorStatusesTreeModel, ErrorStatusesModel } from 'app/_models/component/error-stauses-tree';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.scss']
})
export class StatusDialogComponent implements OnInit{

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();

  public errorStstusesData: ErrorStatusesTreeModel[];

  public showAddNewStatus: boolean;

  public newErrorStatusesModel: ErrorStatusesModel;

  get getTooltipButton(): string {
    if (!this.showAddNewStatus) {
      return `Додати`;
    }
    return `Відмінити`;
  }

  get getTreeColumnClass(): string {
    if (!this.showAddNewStatus) {
      return `col-md-12`;
    }
    return `col-md-6`;
  }

  get getButtonIcon(): string {
    if (!this.showAddNewStatus) {
      return `add`;
    }
    return `block`;
  }

  constructor(
    private analysisLogObjectsService: AnalysisLogObjectsService,
    public dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  
  ngOnInit() {
    this.onLoadData();
  }

  onLoadData() {
    this.analysisLogObjectsService.getAllErrorStatusesData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe(res => {
      this.errorStstusesData = res;
    }); 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onShowAddForm() {
    this.showAddNewStatus = !this.showAddNewStatus;
    this.newErrorStatusesModel = new ErrorStatusesModel();
    this.newErrorStatusesModel.statusTitle = 'lalal';
    this.newErrorStatusesModel.statusCode = 0;
    this.newErrorStatusesModel.keyWords = [''];
  }

  onTreeSelctedItem(statusModel: ErrorStatusesModel) {
    console.log(statusModel);
    if(this.newErrorStatusesModel) {
      this.newErrorStatusesModel.selectedParent = statusModel.statusTitle;
    }   
  }

  onSaveNewStatus() {
    console.log(this.newErrorStatusesModel);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
