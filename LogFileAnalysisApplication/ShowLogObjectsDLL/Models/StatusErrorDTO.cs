using MongoDB.Bson;
using System.Collections.Generic;

namespace ShowLogObjectsDLL.Models {

    #region: StatusErrorDTO

    public class StatusErrorDTO {

        #region Properties: Public

        public ObjectId Id { get; set; }
        public int Code { get; set; }
        public string Title { get; set; }
        public ObjectId SubStatusId { get; set; }
        public List<string> KeyWords { get; set; }

        #endregion

    }

    #endregion

}
