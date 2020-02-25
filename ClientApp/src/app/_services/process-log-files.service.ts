import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'; 
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FileInfo } from '@progress/kendo-angular-upload';


@Injectable({
  providedIn: 'root'
})
export class ProcessLogFilesService {

  public uploadedFile: Array<FileInfo>;
  private _hubConnection: HubConnection; 
  private connectionIsEstablished = false;  

  processNotification = new EventEmitter<string>(); 
  connectionEstablished = new EventEmitter<Boolean>();  

  constructor(
    private http: HttpClient
  ) { 
    this.createConnection();
    this.registerOnServerEvents(); 
    this.startConnection(); 
  }

  public CreateProcessLogSession() : Observable<string>  {

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

  startProcessLogFiles(sessionId: string) {  
    this._hubConnection.invoke('StartProcessLogFiles', sessionId);  
  }  
  
  private createConnection() {  
    this._hubConnection = new HubConnectionBuilder()  
      .withUrl(environment.localhostApp + 'ProcessLogFileHub')  
      .build();  
  }  
  
  private registerOnServerEvents(): void {  
    this._hubConnection.on('ProcessNotification', (data: any) => {  
      this.processNotification.emit(data);  
    });  
  } 

  private startConnection(): void {  
    this._hubConnection  
      .start()  
      .then(() => {  
        this.connectionIsEstablished = true;  
        console.log('Hub connection started');  
        this.connectionEstablished.emit(true);  
      })  
      .catch(err => {  
        console.log('Error while establishing connection, retrying...');  
        setTimeout(function () { this.startConnection(); }, 5000);  
      });  
  }  
  
  


  // createConnection(scanServUrl: string): signalR.HubConnection {

  //   const connection = new HubConnectionBuilder()
  //     .withUrl(scanServUrl)
  //     .build();

  //   connection.on('Progress', (message: string) => {
  //     console.log(message);
  //   });

  //   // connection.on('Error', (jobId: string, message: string) => {
  //   //   this.initScanError(jobId, message);
  //   //   this.successScaned = false;
  //   // });

  //   // connection.on('Complete', (jobId: string) => {
  //   //   connection.stop();
  //   //   if (this.successScaned) {
  //   //     this.getScannedResultbyJobId(jobId)
  //   //       .subscribe((result: ScannedResult) => {
  //   //         this.setScanResult(result);
  //   //         this.router.navigate(['/oshb','ea', 'scanns', 'scanning', 'sessions', result.SessionId]);
  //   //       });
  //   //   }     
  //   // });

  //   return connection;
  // }











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
