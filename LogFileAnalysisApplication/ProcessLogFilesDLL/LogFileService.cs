using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Driver;
using ProcessLogFilesDLL.ExtentionException;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProcessLogFilesDLL {

	#region Class : LogFileService

	public class LogFileService {

		#region Fields : Private

		private string ExistLogFile => "Файл \"{0}\" був оброблений і існує в системі";
		private readonly DbContextService _dbService;

		#endregion

		#region Constructor: Public

		public LogFileService(DbContextService service) {
			_dbService = service;
		}

		#endregion

		#region Method: Private

		private ProcessSessionFile GenerateProcessSessionFile(ObjectId sessionId, ObjectId fileId, string fileName) {
			return new ProcessSessionFile() {
				ProcessSessionId = sessionId,
				FileId = fileId,
				FileName = fileName,
				StatusFile = StatusSessionFile.newFile
			};
		}

		private ProcessLogSession GenerateProcessLogSession(string userName) {
			var randSessionIndex = new Random();
			return new ProcessLogSession() {
				UserName = userName,
				SessionTitle = string.Format("Session_{0}", randSessionIndex.Next(1, 100))
			};
		}

		private async Task<bool> CheckSessionFiles(IFormFile file, ObjectId sessionId) {
			var queryBuilder = Builders<ProcessSessionFile>.Filter.Eq("FileName", file.FileName);
			var existFile = await _dbService.ProcessSessionFiles.Get(queryBuilder);
			var sessionFile = existFile.FirstOrDefault();
			if (sessionFile != null && sessionFile.StatusFile == StatusSessionFile.processedFile) {
				throw new ExistFileException(string.Format(ExistLogFile, file.FileName));
			} else if (sessionFile != null && sessionFile.StatusFile == StatusSessionFile.newFile && sessionFile.ProcessSessionId != sessionId) {
				sessionFile.ProcessSessionId = sessionId;
				await _dbService.ProcessSessionFiles.Update(sessionFile, sessionFile.Id);
				return true;
			} else if (sessionFile != null && sessionFile.StatusFile == StatusSessionFile.newFile && 
				sessionFile.ProcessSessionId == sessionId) {
				return true;
			}
			return false;
		}

		#endregion

		#region Methos : Public

		public async Task<bool> UploadFile(IFormFileCollection files, ObjectId sessionId) {
			if (files.Any()) {
				foreach (var file in files) {
					if (await CheckSessionFiles(file, sessionId)) {
						continue;
					} else {
						var fileId = await _dbService.StoreLogFile(file.OpenReadStream(), file.FileName);
						var processSesionFile = GenerateProcessSessionFile(sessionId, fileId, file.FileName);
						await _dbService.ProcessSessionFiles.Create(processSesionFile);
					}
				}
				return true;
			}
			return false;
		}

		public async Task<bool> RemoveFiles(List<string> fileNames) {
			if (fileNames != null) {
				foreach (var item in fileNames) {
					var gridFsFiles = await _dbService.GetLogFilesInfoByName(item);
					foreach (var fsFiles in gridFsFiles) {
						var queryBuilder = Builders<ProcessSessionFile>.Filter.Eq("FileId", fsFiles.Id);
						var processSessionFiles = await _dbService.ProcessSessionFiles.Get(queryBuilder);
						foreach (var procSessFile in processSessionFiles) {
							await _dbService.RemoveLogFile(procSessFile.FileId);
							if (procSessFile.StatusFile == StatusSessionFile.newFile) {
								await _dbService.ProcessSessionFiles.Remove(procSessFile.Id);
							}
						}
					}
				}
				return true;
			}
			return false;
		}

		public async Task<string> CreateProcessLogSession(string userName) {
			var processLogSesion = GenerateProcessLogSession(userName);
			await _dbService.ProcessLogSessions.Create(processLogSesion);
			return processLogSesion.Id.ToString();
		}

		#endregion

	}

	#endregion

}