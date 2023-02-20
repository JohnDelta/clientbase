using clientbaseAPI.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddDbContext<DBContext>(options => {
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    });
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Clientbase API", Version = "v1" });
    });
    var webappCors = "webappCors";
    var webappHost = builder.Configuration.GetConnectionString("WebappHost");
    builder.Services.AddCors(p => p.AddPolicy(webappCors, builder =>
    {
        builder.WithOrigins(webappHost).AllowAnyMethod().AllowAnyHeader();
    }));
}


var app = builder.Build();
{
    var webappCors = "webappCors";
    app.UseCors(webappCors);
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
    app.UseHttpsRedirection();
    app.MapControllers();
    app.Run();
}

