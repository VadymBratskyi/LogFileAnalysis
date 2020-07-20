import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { LogTableState, FilterParameters } from '@log_models';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogObjectsService {

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
}
