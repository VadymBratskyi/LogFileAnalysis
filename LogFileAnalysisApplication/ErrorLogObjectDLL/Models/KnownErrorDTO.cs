using System.Collections.Generic;
using ViewModelsDLL.Models;

namespace ErrorLogObjectDLL.Models
{

	#region Class: KnownErrorDTO

	public class KnownErrorDTO
	{

		#region Properties: Public

		public int CountFounded { get; set; }

		public string Message { get; set; }

		public IEnumerable<TreeNode> Status { get; set; }

		public IEnumerable<TreeNode> Answer { get; set; }

		#endregion

	}

	#endregion

}
