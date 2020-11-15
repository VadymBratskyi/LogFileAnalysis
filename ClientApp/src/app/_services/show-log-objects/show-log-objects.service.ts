import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { map, catchError } from 'rxjs/operators';
import { FilterParameters, LogTableState, LogsDataGrid, QueryConfig } from '@log_models';

@Injectable({
  providedIn: 'root'
})
export class ShowLogObjectsService {

  constructor(
    private http: HttpClient
  ) { }

  public getQueryDataConfig(): Observable<QueryConfig[]> {
    
    const url = environment.localhostApp + environment.urlShowLogApi + environment.methodGetQueryBuilderConfig;         

    return this.http.get(url)
    .pipe(
        map((response: QueryConfig[]) => {
          return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('getQueryDataConfig: ', error);       
        return Observable.throw(error);
      })
    );
  }

  public getAllLogs(logTableModel: LogTableState): Observable<LogsDataGrid> {
    
    const url = environment.localhostApp + environment.urlShowLogApi + environment.methodGetAllLogsData;

    var body = new FilterParameters(logTableModel.skip, logTableModel.take);
         
    return this.http.post(url, body)
    .pipe(
        map((response: LogsDataGrid) => {        
          return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('getAllLogs: ', error);       
        return Observable.throw(error);
      })
    );
  }

}
