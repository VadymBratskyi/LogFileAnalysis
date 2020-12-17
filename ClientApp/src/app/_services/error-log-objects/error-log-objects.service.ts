import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { LogTableState, FilterParameters, KnownErrorConfig, ErrorPageType } from '@log_models';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UnknownErrorDataGrid } from 'app/_models/errors/unknown-error-data-grid';
import { KnownErrorDataGrid } from 'app/_models/errors/known-error-data-grid';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogObjectsService {
	private _errorPageType: ErrorPageType;
	public get errorPageType(): ErrorPageType {
		return this._errorPageType;
	}
	public set errorPageType(value: ErrorPageType) {
		this._errorPageType = value;
	}

	constructor(private http: HttpClient) { }

	public getAllUnKnownErrorData(logTableModel: LogTableState): Observable<UnknownErrorDataGrid> {
		const url = environment.localhostApp + environment.urlErrorLogApi + environment.methodGetAllUnKnownErrorData;
		const body = new FilterParameters(logTableModel.skip, logTableModel.take);
		return this.http.post(url, body)
		.pipe(
			map((response: UnknownErrorDataGrid) => {
				return response;
			}),
			catchError((error: HttpErrorResponse) => {
			console.error('getAllUnKnownErrorData: ', error);
			return Observable.throw(error);
			})
		);
	}

	public getAllKnownErrorData(logTableModel: LogTableState): Observable<KnownErrorDataGrid> {
		const url = environment.localhostApp + environment.urlErrorLogApi + environment.methodGetAllKnownErrorData;
		const body = new FilterParameters(logTableModel.skip, logTableModel.take);
		return this.http.post(url, body)
		.pipe(
			map((response: KnownErrorDataGrid) => {
				return response;
			}),
			catchError((error: HttpErrorResponse) => {
			console.error('getAllKnownErrorData: ', error);
			return Observable.throw(error);
			})
		);
	}

	public setKnownError(knownErrorConfig: KnownErrorConfig): Observable<string> {
		const url = environment.localhostApp + environment.urlErrorLogApi + environment.methodSetKnownErrorData;
		return this.http.post(url, knownErrorConfig)
		.pipe(
			map((responseId: string) => {
				return responseId;
			}),
			catchError((error: HttpErrorResponse) => {
			console.error('setKnownError: ', error);
			return Observable.throw(error);
			})
		);
	}
}
