export const environment = {
  production: true,
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

  methodGetTreeData: 'GetTreeData',
  methodGetAllLogsData: 'GetAllLogsData',

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
