import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { LogTableState, LogsDataGrid, FilterParameters } from '@log_models';
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
    
    const url = environment.localhostApp + environment.urlAnalysisLogApi + environment.methodGetAllUnKnownErrorData;

    var body = new FilterParameters(logTableModel.skip, logTableModel.take);
         
    return this.http.post(url, body)
    .pipe(
        map((response: any) => {        
          return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('getTestObjects: ', error);       
        return Observable.throw(error);
      })
    );
  }

}
