import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { map, catchError, share } from 'rxjs/operators';
import { LogTableState, LogsDataGrid, QueryConfig, QueryBuilderConfig, LogQueryRuleSet, LogFilterParameters } from '@log_models';
import { RuleSet } from 'angular2-query-builder';

@Injectable({
  providedIn: 'root'
})
export class ShowLogObjectsService {
	public loadDataWithFilter = new EventEmitter<LogQueryRuleSet>();
	public showLogQueryRules = {
		condition: 'and',
		rules: [
		]
	};
	constructor(private http: HttpClient) { }
	public getAccesQueryForConfig(): Observable<QueryBuilderConfig> {
		const url = environment.localhostApp + environment.urlShowLogApi + environment.methodGetAccessFieldsForQuery;
		return this.http.get(url)
		.pipe(
			map((response: QueryBuilderConfig) => {
				return response;
			}),
			catchError((error: HttpErrorResponse) => {
			console.error('getQueryDataConfig: ', error);
			return Observable.throw(error);
			})
		);
	}

	public getQueryDataConfig(): Observable<QueryConfig[]> {
		const url = environment.localhostApp + environment.urlShowLogApi + environment.methodGetQueryBuilderConfig;
		return this.http.get(url)
		.pipe(
			map((response: QueryConfig[]) => {
				return response;
			}),
			catchError((error: HttpErrorResponse) => {
			console.error('getQueryDataConfig: ', error);
			return Observable.throw(error);
			})
		);
	}

	public addNewQueryDataConfig(queries: QueryConfig[]): Observable<any> {
		const url = environment.localhostApp + environment.urlShowLogApi + environment.methodAddNewItemToQueryBuilder;
		return this.http.post(url, queries)
		.pipe(
			map((response: QueryConfig[]) => {
				return response;
		}),
		catchError((error: HttpErrorResponse) => {
			console.error('getQueryDataConfig: ', error);
			return Observable.throw(error);
		})
		);
	}

	public getAllLogs(logTableModel: LogTableState, rulesSet: LogQueryRuleSet): Observable<LogsDataGrid> {
		const url = environment.localhostApp + environment.urlShowLogApi + environment.methodGetAllLogsData;
		const body = new LogFilterParameters(logTableModel.skip, logTableModel.take);
		body.rulesset = rulesSet;
		return this.http.post(url, body)
		.pipe(
			map((response: LogsDataGrid) => {
				return response;
		}),
		share(),
		catchError((error: HttpErrorResponse) => {
			console.error('getAllLogs: ', error);
			return Observable.throw(error);
		})
		);
	}

	public runLogsFilter(queryRules: RuleSet): Observable<LogsDataGrid> {
		const url = environment.localhostApp + environment.urlShowLogApi + 'GetLogsDataByFilter';
		return this.http.post(url, queryRules)
		.pipe(
			map((response: LogsDataGrid) => {
				return response;
		}),
		catchError((error: HttpErrorResponse) => {
			console.error('getAllLogs: ', error);
			return Observable.throw(error);
		})
		);
	}

}
