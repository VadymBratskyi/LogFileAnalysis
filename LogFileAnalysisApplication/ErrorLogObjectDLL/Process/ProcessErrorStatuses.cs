using ErrorLogObjectDLL.Models;
using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ErrorLogObjectDLL.Process {

	#region Class: ProcessErrorStatuses

	public class ProcessErrorStatuses {

		#region Fields: Private

		private readonly DbContextService _dbService;

		private IEnumerable<StatusError> _statusErrors;

		#endregion

		#region Constructor: Public

		public ProcessErrorStatuses(DbContextService service) {
			_dbService = service;
		}

		#endregion

		#region Methods: Private

		private IEnumerable<StatusError> CreateDefaultErrorStatuses() {
			var serveError = new StatusError() { 
				Id = MongoDB.Bson.ObjectId.GenerateNewId(), 
				Code = 500, 
				Title = "Server Error" 
			}; 
			
			var subServerError = new StatusError() {
				Id = MongoDB.Bson.ObjectId.GenerateNewId(),
				Code = 501,
				Title = "Not found Item",
				KeyWords = new MongoDB.Bson.BsonArray(new[] { "item", "item1", "item2", "item3", "item4" }),
				SubStatusId = serveError.Id
			};

			var subServerError2 = new StatusError() {
				Id = MongoDB.Bson.ObjectId.GenerateNewId(),
				Code = 502,
				Title = "Not found Item 2",
				KeyWords = new MongoDB.Bson.BsonArray(new[] { "item2" }),
				SubStatusId = subServerError.Id
			};

			var subServerError3 = new StatusError() {
				Id = MongoDB.Bson.ObjectId.GenerateNewId(),
				Code = 503,
				Title = "Not found Item 3",
				KeyWords = new MongoDB.Bson.BsonArray(new[] { "item3" }),
				SubStatusId = subServerError2.Id
			};

			var requestError = new StatusError() {
				Id = MongoDB.Bson.ObjectId.GenerateNewId(),
				Code = 400,
				Title = "Bad Request",
				KeyWords = new MongoDB.Bson.BsonArray(new[] { "request" })
			};

			var requestError2 = new StatusError() {
				Id = MongoDB.Bson.ObjectId.GenerateNewId(),
				Code = 402,
				Title = "Not corect request ",
				KeyWords = new MongoDB.Bson.BsonArray(new[] { "request" }),
				SubStatusId = requestError.Id
			};

			return new List<StatusError>()
				{serveError,subServerError,requestError,subServerError2, subServerError3, requestError2};
		}

		private async Task InitDefaultErrorStatus() {
			try {

			} catch (System.Exception ex) {
				throw new System.Exception(ex.Message);
			}
			var defStatuses = CreateDefaultErrorStatuses();
			await _dbService.StatusError.Create(defStatuses);
		}

		private StatusTreeNode GetParentNode(IEnumerable<StatusTreeNode> statusTree, string parentNodeId) {
			var arr = statusTree.ToArray();
			for (int i = 0; i < arr.Length; i++) {
				if (arr[i].Value.ObjetcId.Equals(parentNodeId)) {
					return arr[i];
				}
				if (arr[i].Children != null) {
					var child = GetParentNode(arr[i].Children, parentNodeId);
					if (child != null) {
						return child;
					}
				}
			}
			return null;
		}

		private StatusTreeNode CreateStatusTreeNode(StatusError status) {
			return new StatusTreeNode() {
				Value = CreateStatusDTO(status)
			};
		}

		private StatusErrorDTO CreateStatusDTO(StatusError status) { 
			return new StatusErrorDTO() {
				ObjetcId = status.Id.ToString(),
				SubStatusId = status.SubStatusId.ToString(),
				Title = status.Title,
				Code = status.Code,
				KeyWords = status.KeyWords != null ? status.KeyWords.Select(o => o.ToString()).ToList() : null
			};
		}

		private List<StatusTreeNode> BuildStatusTree(IEnumerable<StatusError> statuses) {
			var statusTree = new List<StatusTreeNode>();
			foreach (var status in statuses) {
				var parent = GetParentNode(statusTree, status.SubStatusId.ToString());
				var treeNode = CreateStatusTreeNode(status);
				if (parent is null) {
					statusTree.Add(treeNode);
				} else {
					parent.Children.Add(treeNode);
				}
			}
			return statusTree;
		}

		#endregion

		#region Methods: Public

		public async Task<IEnumerable<StatusError>> GetErrorStatuses() {
			_statusErrors = await _dbService.StatusError.Get();
			if (!_statusErrors.Any()) {
				await InitDefaultErrorStatus();
				_statusErrors = await _dbService.StatusError.Get();
			}
			return _statusErrors;
		}

		public async Task<IEnumerable<StatusTreeNode>> GetErrorStatusesAsTree() {
			var statuses = await GetErrorStatuses();
			var statusTree = BuildStatusTree(statuses);
			return statusTree;
		}

		public async Task AddNewErrorStatuses(StatusErrorDTO newStatus) {
			if (newStatus == null) {
				throw new ArgumentNullException();
			}
			try {
				var newErrorStatus = new StatusError() {
					Id = MongoDB.Bson.ObjectId.GenerateNewId(),
					Code = newStatus.Code,
					Title = newStatus.Title,
					KeyWords = new MongoDB.Bson.BsonArray(newStatus.KeyWords),
					SubStatusId = newStatus.SubStatusId != null ? new ObjectId(newStatus.SubStatusId.ToString()) : ObjectId.Empty
				};
				await _dbService.StatusError.Create(newErrorStatus);
			} catch (System.Exception ex) {
				throw new System.Exception(ex.Message);
			}
		}

		#endregion

	}

	#endregion

}
