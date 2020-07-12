import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnalysisLogObjectsService } from '@log_services';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { ErrorStatusesTreeModel, ErrorStatusesModel } from '@log_models';

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

  public selectedItem: ErrorStatusesModel;

  get getTreeColumnClass(): string {
    if (!this.showAddNewStatus) {
      return `col-md-12`;
    }
    return `col-md-6`;
  }

  constructor(
    private analysisLogObjectsService: AnalysisLogObjectsService,
    public dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
  
   private _initSubStatus(model: ErrorStatusesModel) {
      if(model) {
        this.newErrorStatusesModel.subStatusId = this.selectedItem.id;
        this.newErrorStatusesModel.subStatusTitle = this.selectedItem.title;
      }  
   }

   private _createNewStatus() {
      this.newErrorStatusesModel = new ErrorStatusesModel();
      this.newErrorStatusesModel.title = '';
      this.newErrorStatusesModel.code = 0;
      this.newErrorStatusesModel.keyWords = [];
      this._initSubStatus(this.selectedItem);
  }

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
    this._createNewStatus();
    this.showAddNewStatus = !this.showAddNewStatus;
  }

  onTreeSelectedItem(statusModel: ErrorStatusesModel) {
      this.selectedItem = statusModel;
      this._initSubStatus(this.newErrorStatusesModel); 
  }

  onSaveNewStatus(newModel: ErrorStatusesModel) {
    if(newModel) {
      console.log(newModel);
    }
    this.showAddNewStatus = false;    
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}