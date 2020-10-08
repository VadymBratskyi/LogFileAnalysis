import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr'; 
import { environment } from 'environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FileProcess, LogNotify, OfferNotify } from '@log_models';

@Injectable({
  providedIn: 'root'
})
export class ProcessLogFilesService {

  public processingFiles: Array<FileProcess>;
  private _hubConnection: HubConnection; 

  onProcessNotification = new EventEmitter<LogNotify>();
  onOfferNotification = new EventEmitter<OfferNotify>();

  constructor(
    private http: HttpClient
  ) {  }

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

  startProcessSinglLogFile(fileName: string) {    
    this._hubConnection.invoke('StartProcessSinglLogFiles', fileName);  
  }  

  startProcessLogFiles(sessionId: string) {    
    this._hubConnection.invoke('StartProcessLogFiles', sessionId);  
  }  
  
  startHubConnection() {
    this.createConnection();
    this.registerOnLogServerEvents();
    this.registerOnOfferServerEvents(); 
    this.startConnection(); 
    this.processingFiles = [];
  }

  stopHubConnection() {
    this._hubConnection.stop();
    console.log("HUB Connection stoped");
  }

  private createConnection() {  
    this._hubConnection = new HubConnectionBuilder()  
      .withUrl(environment.localhostApp + 'ProcessLogFileHub')  
      .build();  
  }  
  
  private registerOnLogServerEvents(): void {  
    this._hubConnection.on('ProcessNotification', (data: any) => {  
      this.onProcessNotification.emit(data);  
    });  
  }

  private registerOnOfferServerEvents(): void {  
    this._hubConnection.on('OfferNotification', (data: any) => {  
      this.onOfferNotification.emit(data);  
    });  
  }  

  private startConnection(): void {  
    this._hubConnection  
      .start()  
      .then(() => {  
        console.log('Hub connection started');  
      })  
      .catch(err => {  
        console.log('Error while establishing connection, retrying...');  
        setTimeout(function () { this.startConnection(); }, 5000);  
      });  
  }  
  
}
