using LogFileAnalysisDAL;
using LogFileAnalysisDAL.Models;
using MongoDB.Bson;
using StatusErrorDLL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ErrorLogObjectDLL.Process {

	#region Class: ProcessErrorStatuses

	public class ProcessErrorStatuses {

		#region Fields: Private

		private readonly DbContextService _dbService;

		#endregion

		#region Constructor: Public

		public ProcessErrorStatuses(DbContextService service) {
			_dbService = service;
		}

		#endregion

		#region Methods: Private

		private IEnumerable<StatusError> CreateDefaultErrorStatuses() {
			var serveError = new StatusError() { 
				Id = ObjectId.GenerateNewId(), 
				Code = 500, 
				Title = "Server Error" 
			}; 
			
			var subServerError = new StatusError() {
				Id = ObjectId.GenerateNewId(),
				Code = 501,
				Title = "Not found Item",
				KeyWords = new BsonArray(new[] { "item", "item1", "item2", "item3", "item4" }),
				SubStatusId = serveError.Id
			};

			var subServerError2 = new StatusError() {
				Id = ObjectId.GenerateNewId(),
				Code = 502,
				Title = "Not found Item 2",
				KeyWords = new BsonArray(new[] { "item2" }),
				SubStatusId = subServerError.Id
			};

			var subServerError3 = new StatusError() {
				Id = ObjectId.GenerateNewId(),
				Code = 503,
				Title = "Not found Item 3",
				KeyWords = new BsonArray(new[] { "item3" }),
				SubStatusId = subServerError2.Id
			};

			var requestError = new StatusError() {
				Id = ObjectId.GenerateNewId(),
				Code = 400,
				Title = "Bad Request",
				KeyWords = new BsonArray(new[] { "request" })
			};

			var requestError2 = new StatusError() {
				Id = ObjectId.GenerateNewId(),
				Code = 402,
				Title = "Not corect request ",
				KeyWords = new BsonArray(new[] { "request" }),
				SubStatusId = requestError.Id
			};

			return new List<StatusError>()
				{serveError,subServerError,requestError,subServerError2, subServerError3, requestError2};
		}

		private async Task InitDefaultErrorStatus() {
			try {

			} catch (Exception ex) {
				throw new Exception(ex.Message);
			}
			var defStatuses = CreateDefaultErrorStatuses();
			await _dbService.StatusErrors.Create(defStatuses);
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

		private StatusError CreateStatusError(StatusErrorDTO newStatus) { 
			return new StatusError()
			{
				Id = ObjectId.GenerateNewId(),
				Code = newStatus.Code,
				Title = newStatus.Title,
				KeyWords = new BsonArray(newStatus.KeyWords),
				SubStatusId = newStatus.SubStatusId != null ? new ObjectId(newStatus.SubStatusId) : ObjectId.Empty
			};
		}

		#endregion

		#region Methods: Public

		public async Task<IEnumerable<StatusError>> GetErrorStatuses() {
			var statusErrors = await _dbService.StatusErrors.GetAsync();
			if (!statusErrors.Any()) {
				await InitDefaultErrorStatus();
				statusErrors = await _dbService.StatusErrors.GetAsync();
			}
			return statusErrors;
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
				var newErrorStatus = CreateStatusError(newStatus);
				await _dbService.StatusErrors.Create(newErrorStatus);
			} catch (Exception ex) {
				throw new Exception(ex.Message);
			}
		}

		#endregion

	}

	#endregion

}
