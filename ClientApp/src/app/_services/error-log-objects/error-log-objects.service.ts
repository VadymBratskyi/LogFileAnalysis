import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { LogTableState, FilterParameters, LogsDataGrid, KnownErrorConfig } from '@log_models';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogObjectsService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllUnKnownErrorData(logTableModel: LogTableState): Observable<LogsDataGrid> {
    
    const url = environment.localhostApp + environment.urlErrorLogApi + environment.methodGetAllUnKnownErrorData;

    var body = new FilterParameters(logTableModel.skip, logTableModel.take);
         
    return this.http.post(url, body)
    .pipe(
        map((response: LogsDataGrid) => {        
          return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('getAllUnKnownErrorData: ', error);       
        return Observable.throw(error);
      })
    );
  }

  public getAllKnownErrorData(logTableModel: LogTableState): Observable<LogsDataGrid> {
    
    const url = environment.localhostApp + environment.urlErrorLogApi + environment.methodGetAllKnownErrorData;

    var body = new FilterParameters(logTableModel.skip, logTableModel.take);
         
    return this.http.post(url, body)
    .pipe(
        map((response: LogsDataGrid) => {        
          return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('getAllKnownErrorData: ', error);       
        return Observable.throw(error);
      })
    );
  }

  public setKnownError(knownErrorConfig: KnownErrorConfig): Observable<string> {
    
    const url = environment.localhostApp + environment.urlErrorLogApi + environment.methodSetKnownErrorData;
 
    return this.http.post(url, knownErrorConfig)
    .pipe(
        map((responseId: string) => {        
          return responseId;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('setKnownError: ', error);       
        return Observable.throw(error);
      })
    );
  }
}
