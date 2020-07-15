using System;
using System.Collections.Generic;

namespace ErrorLogObjectDLL.Models {

    #region: StatusErrorDTO

    public class StatusErrorDTO {

        #region Properties: Public

        public string ObjetcId { get; set; }
        public int Code { get; set; }
        public string Title { get; set; }
        public string SubStatusId { get; set; }
        public List<string> KeyWords { get; set; }

        #endregion

    }

    #endregion

}
