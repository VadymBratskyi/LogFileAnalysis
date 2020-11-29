import { Injectable } from '@angular/core';
import { LogNotify, OfferNotify } from '@log_models';

@Injectable()
export class NotificationsService {

  private _processNotifications: LogNotify[] = [];
  private _offerNotification: OfferNotify;
  
  public get processedFileNotification(): LogNotify[] {
    return this._processNotifications;
  }

  public get offerNotification(): OfferNotify {
    return this._offerNotification;
  }

  public set offerNotification(value: OfferNotify) {
    this._offerNotification = value;
  }

  public addProcessLogNotify(logNotify: LogNotify) {
    this._processNotifications.push(logNotify);
  }

  public deleProcessLogNotify(fileName: string) {
    let notifyIndex = this._processNotifications.findIndex(nt => nt.fileName == fileName);
    if(notifyIndex >= 0) {
      this._processNotifications.splice(notifyIndex, 1);
    }
  }

}
