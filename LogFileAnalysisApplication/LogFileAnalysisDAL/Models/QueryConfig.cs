namespace LogFileAnalysisDAL.Models {

	#region Class: QueryConfig

	public class QueryConfig : Entity {

		#region Properties: Public

		public string Key { get; set; }
		public string Name { get; set; }
		public LogObjectType ObjectType { get; set; }
		public LogPropertyType PropertyType { get; set; }

		#endregion

	}

	#endregion

}
