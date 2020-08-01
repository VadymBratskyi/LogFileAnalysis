import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Answer, ResponseItem } from '@log_models';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnswerObjectsService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllAnswersData(): Observable<any> {
    
    const url = environment.localhostApp + environment.urlAnsweLogApi + environment.methodGetAllAnswers;
      
    return this.http.post(url, null)
    .pipe(
        map((response: any) => {        
          return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('getAllAnswersData: ', error);       
        return Observable.throw(error);
      })
    );
  }

  public saveNewAnswerData(model: Answer): Observable<string> {
    
    const url = environment.localhostApp + environment.urlAnsweLogApi + environment.methodSetNewAnswer;

    return this.http.post(url, model)
    .pipe(
        map((response: ResponseItem) => {        
          return response.id;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('saveNewAnswerData: ', error);       
        return Observable.throw(error);
      })
    );
  }

}
