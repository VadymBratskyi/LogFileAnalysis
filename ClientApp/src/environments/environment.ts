// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  localhostApp: 'https://localhost:44396/',

  urlProcessLogApi: 'api/ProcessLogFiles/',
  urlAnalysisLogApi: 'api/AnalysisLog/',
  urlShowLogApi: 'api/ShowLog/',
  urlErrorLogApi: 'api/ErrorLog/',
  urlStatusesApi: 'api/Statuses/',
  urlAnsweLogApi: 'api/AnsweLog/',
  
  methodCreateProcessLogSession: 'CreateProcessLogSession',
  methodUploadLogFiles: 'UploadLogFiles',
  methodRemoveLogFiles: 'RemoveLogFiles',
  methodStartProcessLogFile: 'StartProcessLogFile',

  methodGetAccessFieldsForQuery: 'GetAccessFieldsForQuery',
  methodGetQueryBuilderConfig: 'GetQueryBuilderConfig',
  methodGetAllLogsData: 'GetAllLogsData',
  methodAddNewItemToQueryBuilder: 'AddNewItemToQueryBuilder',

  /**Error */
  methodGetAllUnKnownErrorData: 'GetAllUnKnownErrorData',
  methodGetAllKnownErrorData: 'GetAllKnownErrorData',
  methodSetKnownErrorData: 'SetKnownErrorData',

  /**Status */
  methodGetAllErrorStatuses: 'GetAllErrorStatuses',
  methodSetNewErrorStatus: 'SetNewErrorStatus',

  /**Answer */
  methodGetAllAnswers: 'GetAllAnswers',
  methodSetNewAnswer: 'SetNewAnswer',

  methodPostTestValue: 'PostTestValue',
  methodGetTestValue: 'GetTestValue'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
