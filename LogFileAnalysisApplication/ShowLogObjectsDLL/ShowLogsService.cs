using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using MongoDB.Driver;
using ShowLogObjectsDLL.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ViewModelsDLL.Models;
using ViewModelsDLL.Process;

namespace ShowLogObjectsDLL {

	#region Class: ShowLogsService

	public class ShowLogsService {

		#region Fields: Private

		private readonly DbContextService _dbService;
		private readonly ProcessLogTree _processLogTree;

		#endregion

		#region Constructor: Public

		public ShowLogsService(DbContextService service) {
			_dbService = service;
			_processLogTree = new ProcessLogTree();
		}

		#endregion

		#region Fields: Public

		public async Task<DataSourceGrid<LogDTO>> GetGridLogs(int skip, int take) {
			var logs = await _dbService.Logs.GetAsync(skip, take);
			var dataSource = new DataSourceGrid<LogDTO>();
			dataSource.Data = logs.Select(o => new LogDTO() {
				MessageId = o.MessageId,
				RequestDate = o.RequestDate,
				Request = _processLogTree.GetTree(o.Request),
				ResponseDate = o.ResponseDate,
				Response = _processLogTree.GetTree(o.Response)
			});
			dataSource.CountLogs = await _dbService.Logs.Count();
			return dataSource;
		}

		public async Task<DataSourceGrid<LogDTO>> GetGridLogsByFilter() {

			// метод Or
			//var filter1 = Builders<Log>.Filter.Eq("MessageId", "BARS-MESS-6717790");
			//var filter2 = Builders<Log>.Filter.Eq("MessageId", "BARS-MESS-6725560");
			//var filterOr = Builders<Log>.Filter.Or(new List<FilterDefinition<Log>> { filter1, filter2 });

			//var resOr = await _dbService.Logs.GetAsync(filterOr);

			// метод And
			//var filter3 = Builders<Log>.Filter.Eq("MessageId", "BARS-MESS-6725560");
			//var filter4 = Builders<Log>.Filter.Eq("Request.user_fio", "Admin"); 
			//var filter5 = Builders<Log>.Filter.Eq("Response.RESULT.sessionId", "fdtawngwmry3mdh4v5buhtf0");
			// var filterAnd = Builders<Log>.Filter.And(new List<FilterDefinition<Log>> { filter3, filter4, filter5 });

			//var resAnd = await _dbService.Logs.GetAsync(filterAnd);

			////метод ArrObj
			//var filter6 = Builders<Log>.Filter.Eq("Response.RESULT.RNK", "24138");
			//var filter7 = Builders<Log>.Filter.Eq("Request.params.fio", "СЛАВІНСЬКА СВІТЛАНА ОЛЕКСАНДРІВНА"); 
			//var filter8 = Builders<Log>.Filter.Eq("Request.params.fio", "ТОРОХТІЙ МАРІЯ ОЛЕКСІЇВНА");
			//var filterAarr = Builders<Log>.Filter.Or(new List<FilterDefinition<Log>> { filter6, filter7,  filter8 });

			//var resArrObj = await _dbService.Logs.GetAsync(filterAarr);

			//метод Arr
			var filter9 = Builders<Log>.Filter.All("Request.params.mergedRNK", new List<int>() { 50950 });
			//var filter7 = Builders<Log>.Filter.Eq("Request.params.fio", "СЛАВІНСЬКА СВІТЛАНА ОЛЕКСАНДРІВНА");
			//var filter8 = Builders<Log>.Filter.Eq("Request.params.fio", "ТОРОХТІЙ МАРІЯ ОЛЕКСІЇВНА");
			var filterAarr = Builders<Log>.Filter.Or(new List<FilterDefinition<Log>> { filter9 });

			var resArr = await _dbService.Logs.GetAsync(filterAarr);

			var dataSource = new DataSourceGrid<LogDTO>();
			dataSource.CountLogs = resArr.Count();
			dataSource.Data = resArr.Select(o => new LogDTO() {
				MessageId = o.MessageId,
				RequestDate = o.RequestDate,
				Request = _processLogTree.GetTree(o.Request),
				ResponseDate = o.ResponseDate,
				Response = _processLogTree.GetTree(o.Response)
			});

			return dataSource;
		}

		#endregion

	}

	#endregion

}
