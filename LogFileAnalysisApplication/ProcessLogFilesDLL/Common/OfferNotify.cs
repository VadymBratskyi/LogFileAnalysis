using System.Collections.Generic;

namespace ProcessLogFilesDLL.Common {

	#region Class: OfferNotify

	public class OfferNotify {

		#region Properties: Public

		public List<Offer> OfferMessages { get; set; }

		#endregion

		#region Constructor: Public

		public OfferNotify() {
			OfferMessages = new List<Offer>();
		}

		#endregion

	}

	#endregion

}
