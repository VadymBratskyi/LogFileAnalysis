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

		private ProcessSessionFile GenerateProcessSessionFile(string sessionId, ObjectId fileId) {
			return new ProcessSessionFile() {
				ProcessSessionId = new ObjectId(sessionId),
				FileId = fileId
			};
		}

		#endregion

		#region Methos : Public

		public async Task<bool> UploadFile(IFormFileCollection files, string sessionId) {
			if (files.Any()) {
				foreach (var file in files) {
					var existFile = await _dbService.GetLogFilesInfoByName(file.FileName);
					if (existFile.Any()) {
						throw new ExistFileException(string.Format(ExistLogFile, file.FileName));
					} else {
						var fileId = await _dbService.StoreLogFile(file.OpenReadStream(), file.FileName);
						var processSesionFile = GenerateProcessSessionFile(sessionId, fileId);
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
							await _dbService.ProcessSessionFiles.Remove(procSessFile.Id);
						}
					}
				}
				return true;
			}
			return false;
		}

		public async Task<string> CreateProcessLogSession(string userName) {
			var randSessionIndex = new Random();
			var processLogSesion = new ProcessLogSession();
			processLogSesion.UserName = userName;
			processLogSesion.SessionTitle = string.Format("Session_{0}", randSessionIndex.Next(1, 100));
			await _dbService.ProcessLogSessions.Create(processLogSesion);
			return processLogSesion.Id.ToString();
		}

		#endregion

	}

	#endregion

}