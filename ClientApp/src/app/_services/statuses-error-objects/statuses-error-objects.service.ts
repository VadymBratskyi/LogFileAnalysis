import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ErrorStatusesModel } from '@log_models';

@Injectable({
  providedIn: 'root'
})
export class StatusesErrorObjectsService {

  constructor(
    private http: HttpClient
  ) { }

  
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
