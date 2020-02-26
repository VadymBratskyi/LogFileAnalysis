﻿using System;
using System.Collections.Generic;
using System.Text;

namespace ProcessLogFilesDLL.Process {
	public class TemplateAnalysis {

        public string RegBinData => @"""binary_data"":""[^""]+""";
        public string RegInput => @"(^(Input)( = .*))";
        public string RegOutput => @"(^(Output)( = .*))";
        public string RegStart => @"(=>.*)";
        public string RegEnd => @"(<=.*)";
        public string RegError => @"""error""";
        public string RegDate => @"([0-3]?[0-9]/[0-3]?[0-9]/(?:[0-9]{2})?[0-9]{2})\s(1[0-2]|[0-9]):(00|0[1-9]{1}|[1-5]{1}[0-9]):(00|0[1-9]{1}|[1-5]{1}[0-9])\s(PM|AM)";

    }
}