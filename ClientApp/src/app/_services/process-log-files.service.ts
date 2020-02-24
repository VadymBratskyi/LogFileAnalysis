import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FileInfo } from '@progress/kendo-angular-upload';


@Injectable({
  providedIn: 'root'
})
export class ProcessLogFilesService {

  public uploadedFile: Array<FileInfo>;

  constructor(
    private http: HttpClient
  ) { }

  public CreateProcessLogSession() : Observable<any>  {

    const url = environment.localhostApp + environment.urlProcessLogApi + environment.methodCreateProcessLogSession;

    var user = {
      UserName: 'Vados'
    };

    return this.http.post(url, user)
      .pipe(
        map((sessionId: string) => sessionId),
        catchError((error: HttpErrorResponse) => {
          console.error('CreateProcessLogSession: ', error);       
          return throwError(error);
        })
      );

  }



  public postTestObjects(): Observable<any> {
    
    const url = environment.localhostApp + environment.urlProcessLogApi + environment.methodPostTestValue;

    var body = {
      value: "Angular "
    };
         
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

  public getTestObjects(): Observable<any> {
    
    const url = environment.localhostApp + environment.urlProcessLogApi + environment.methodGetTestValue;         

    return this.http.get(url)
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
