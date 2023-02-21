using clientbaseAPI.Context;
using clientbaseAPI.DTOs.Requests;
using clientbaseAPI.Exceptions;
using clientbaseAPI.Services.UserServices;
using clientbaseAPI.Validators;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddDbContext<DBContext>(options => {
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    });
    builder.Services.AddScoped<IUserService, UserService>();
    builder.Services.AddTransient<GlobalExceptionHandler>();
    builder.Services.AddScoped<IValidator<UserCreateRequest>, UserCreateRequestValidator>();
    builder.Services.AddScoped<IValidator<UserUpdateRequest>, UserUpdateRequestValidator>();
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Clientbase API", Version = "v1" });
    });
    var webappCors = "webappCors";
    var webappHost = builder.Configuration["WebappHost"];
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
    app.UseMiddleware<GlobalExceptionHandler>();
    app.UseHttpsRedirection();
    app.MapControllers();
    app.Run();
}

