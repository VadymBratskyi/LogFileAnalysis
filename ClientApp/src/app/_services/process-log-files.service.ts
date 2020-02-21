import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProcessLogFilesService {

  constructor(
    private http: HttpClient
  ) { }

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
