import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { LogTableState, LogsDataGrid, FilterParameters, ErrorStatusesModel } from '@log_models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnalysisLogObjectsService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllUnKnownErrorData(logTableModel: LogTableState): Observable<any> {
    
    const url = environment.localhostApp + environment.urlErrorLogApi + environment.methodGetAllUnKnownErrorData;

    var body = new FilterParameters(logTableModel.skip, logTableModel.take);
         
    return this.http.post(url, body)
    .pipe(
        map((response: any) => {        
          return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('getAllUnKnownErrorData: ', error);       
        return Observable.throw(error);
      })
    );
  }

  public getAllErrorStatusesData(): Observable<any> {
    
    const url = environment.localhostApp + environment.urlStatusesApi + environment.methodGetAllErrorStatuses;
      
    return this.http.post(url, null)
    .pipe(
        map((response: any) => {        
          return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('getAllErrorStatusesData: ', error);       
        return Observable.throw(error);
      })
    );
  }

  public saveNewErrorStatusData(model: ErrorStatusesModel): Observable<boolean> {
    
    const url = environment.localhostApp + environment.urlStatusesApi + environment.methodSetNewErrorStatus;
      
    const body = {
      code: +model.code,
      title: model.title,
      keyWords: model.keyWords,
      subStatusId: model.subStatusId
    } as ErrorStatusesModel;
  
    return this.http.post(url, body)
    .pipe(
        map((response: any) => {        
          return true;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('getAllErrorStatusesData: ', error);       
        return Observable.throw(error);
      })
    );
  }

}
