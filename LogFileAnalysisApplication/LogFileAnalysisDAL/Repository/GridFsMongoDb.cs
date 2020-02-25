using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace LogFileAnalysisDAL.Repository {

	#region Class: GridFsMongoDb

	public class GridFsMongoDb {

		#region Fields: Private

		protected IGridFSBucket _gridFS;

		#endregion

		#region Methods: Public

		public async Task<byte[]> GetLogFile(ObjectId id) {
			return await _gridFS.DownloadAsBytesAsync(id);
		}
		
		public async Task<IEnumerable<GridFSFileInfo>> GetLogFilesInfoByName(string fileName) {
			var filter = Builders<GridFSFileInfo>.Filter.Eq<string>(info => info.Filename, fileName);
			var fileInfos = await _gridFS.FindAsync(filter);
			return await fileInfos.ToListAsync();
		}

		public async Task<ObjectId> StoreLogFile(Stream logFileStream, string logFileName) {
			return await _gridFS.UploadFromStreamAsync(logFileName, logFileStream);
		}

		public async Task RemoveLogFile(ObjectId id) {
			await _gridFS.DeleteAsync(id);
		}

		public async Task RemoveLogFile(string fileName) {
			var builder = new FilterDefinitionBuilder<GridFSFileInfo>();
			var filter = Builders<GridFSFileInfo>.Filter.Eq<string>(info => info.Filename, fileName);
			var fileInfos = await _gridFS.FindAsync(filter);
			foreach (var item in await fileInfos.ToListAsync()) {
				await _gridFS.DeleteAsync(item.Id);
			}
		}

		#endregion


	}

	#endregion

}