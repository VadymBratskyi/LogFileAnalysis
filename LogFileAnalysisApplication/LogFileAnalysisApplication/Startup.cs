using AnswerLogObjectDLL;
using ErrorLogObjectDLL;
using LogFileAnalysisDAL;
using LogQueryBuilderDLL;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ProcessLogFilesDLL;
using ShowLogObjectsDLL;
using StatusErrorDLL;

namespace LogFileAnalysisApplication {
	public class Startup {
		public Startup(IConfiguration configuration) {
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services) {

			var connectionstring = Configuration.GetConnectionString("DefaultConnection");

			services.AddSingleton(new DbContextService(connectionstring));
			services.AddTransient<LogFileService>();
			services.AddTransient<ShowLogsService>();
			services.AddTransient<ErrorService>();
			services.AddTransient<StatusService>();
			services.AddTransient<AnswerServices>();
			services.AddTransient<QueryBuildingService>();

			services.AddSignalR();
			services.AddCors(options =>
			  options.AddPolicy("AllowOrigin",
					  builder =>
					  builder.WithOrigins("http://localhost:4200")
					  .AllowAnyHeader()
					  .AllowAnyMethod()
					  .AllowCredentials()));

			services.AddMvc()
			.AddMvcOptions(o => o.EnableEndpointRouting = false)
			.SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
		}

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {

			app.UseCors("AllowOrigin");

			if (env.IsDevelopment()) {
					app.UseDeveloperExceptionPage();
			} else {
				app.UseHsts();
			}

			app.UseDefaultFiles();
			app.UseStaticFiles();

			app.UseSignalR(options =>	{
				options.MapHub<ProcessLogFileHub>("/ProcessLogFileHub");
			});
			app.UseMvc();
		}
	}
}
