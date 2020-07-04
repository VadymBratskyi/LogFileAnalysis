using MongoDB.Bson;
using System.Collections.Generic;

namespace ShowLogObjectsDLL.Models {

    #region: StatusErrorDTO

    public class StatusErrorDTO {

        #region Properties: Public

        public ObjectId Id { get; set; }
        public int StatusCode { get; set; }
        public string StatusTitle { get; set; }
        public List<string> KeyWords { get; set; }

        #endregion

    }

    #endregion

}
