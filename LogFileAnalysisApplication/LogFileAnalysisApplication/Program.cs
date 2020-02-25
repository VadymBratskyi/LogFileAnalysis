using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System.Diagnostics;

namespace LogFileAnalysisApplication {
	public class Program {

		public static void Process() {
			ProcessStartInfo st = new ProcessStartInfo(@"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe");
			st.WindowStyle = ProcessWindowStyle.Hidden;
			st.Arguments = @"--dbpath C:\data --port 27017";
			System.Diagnostics.Process.Start(st);
		}
		public static void Main(string[] args) {
			Process();
			CreateHostBuilder(args).Build().Run();
		}

		public static IHostBuilder CreateHostBuilder(string[] args) =>
			Host.CreateDefaultBuilder(args)
				.ConfigureWebHostDefaults(webBuilder => {
					webBuilder.UseStartup<Startup>();
				});
	}
}
