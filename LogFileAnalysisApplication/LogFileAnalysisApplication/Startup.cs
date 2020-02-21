using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace LogFileAnalysisApplication {
	public class Startup {
		public Startup(IConfiguration configuration) {
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services) {
			services.AddControllersWithViews();

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

			app.UseStaticFiles();

			app.UseMvc();
		}
	}
}
