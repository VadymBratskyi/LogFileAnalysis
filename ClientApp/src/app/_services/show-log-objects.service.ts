import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { map, catchError } from 'rxjs/operators';
import { FilterParameters, LogsDtoModel } from '@log_models';

@Injectable({
  providedIn: 'root'
})
export class ShowLogObjectsService {

  constructor(
    private http: HttpClient
  ) { }

  public getTreeData(): Observable<any> {
    
    const url = environment.localhostApp + environment.urlShowLogApi + environment.methodGetTreeData;         

    return this.http.get(url)
    .pipe(
        map((response: any) => {
          return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('getTreeData: ', error);       
        return Observable.throw(error);
      })
    );
  }

  public getAllLogs(skip: number, take: number): Observable<LogsDtoModel[]> {
    
    const url = environment.localhostApp + environment.urlShowLogApi + environment.methodGetAllLogsData;

    var body = new FilterParameters(skip, take);
         
    return this.http.post(url, body)
    .pipe(
        map((response: LogsDtoModel[]) => {        
          return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('getTestObjects: ', error);       
        return Observable.throw(error);
      })
    );
  }

}
