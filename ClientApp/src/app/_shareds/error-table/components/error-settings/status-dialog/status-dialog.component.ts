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
  
   private _createNewStatus() {
      this.newErrorStatusesModel = new ErrorStatusesModel();
      this.newErrorStatusesModel.statusTitle = '';
      this.newErrorStatusesModel.statusCode = 0;
      this.newErrorStatusesModel.keyWords = [''];
      if(this.selectedItem) {
        this.newErrorStatusesModel.subStatusId = this.selectedItem.id;
        this.newErrorStatusesModel.subStatusTitle = this.selectedItem.statusTitle;
      }      
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
      if(this.newErrorStatusesModel) {
        this.newErrorStatusesModel.subStatusId = this.selectedItem.id;
        this.newErrorStatusesModel.subStatusTitle = this.selectedItem.subStatusTitle;
      }    
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
