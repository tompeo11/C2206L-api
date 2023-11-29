using api.DAO;
using api.Data;
using api.Exceptions;
using api.Middleware;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext> (option => option.UseSqlServer(builder.Configuration.GetConnectionString("AnyConnectionName")));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(p => p.AddPolicy("MyCors", build => {
    build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.Configure<ApiBehaviorOptions>(option => {
    option.InvalidModelStateResponseFactory = ActionContext => 
    {
        var errors = ActionContext.ModelState
            .Where(e => e.Value.Errors.Count > 0)
            .SelectMany(x => x.Value.Errors)
            .Select(x => x.ErrorMessage);

        var errorResponse = new ValidateInputErrorResponse(400);
        errorResponse.Errors = errors;
        return new BadRequestObjectResult(errorResponse);
    };
});

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

app.UseCors("MyCors");

app.UseMiddleware<ServerErrorExceptionMiddle>();

app.UseStatusCodePagesWithReExecute("/errors/{0}");

app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

//AppDbInitializer.Seed(app);

app.Run();
