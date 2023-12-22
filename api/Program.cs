using api.DAO;
using api.Data;
using api.Entities.Identity;
using api.Exceptions;
using api.Middleware;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext> (option => option.UseSqlServer(builder.Configuration.GetConnectionString("AnyConnectionName")));
builder.Services.AddControllers();

builder.Services
    .AddIdentityCore<AppUser>(option => {
        option.Password.RequireNonAlphanumeric = false;
        option.Password.RequireDigit = false;
        option.Password.RequireLowercase = false;
        option.Password.RequireUppercase = false;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddSignInManager<SignInManager<AppUser>>();

builder.Services.AddAuthentication();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(p => p.AddPolicy("MyCors", build => {
    build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));
builder.Services.AddSingleton<IConnectionMultiplexer>(_ => {
    var redisUrl = ConfigurationOptions.Parse(builder.Configuration.GetConnectionString("Redis"), true);
    return ConnectionMultiplexer.Connect(redisUrl);
});

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
builder.Services.AddScoped<IBasketRepository, BasketRepository>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

app.UseCors("MyCors");

app.UseMiddleware<ServerErrorExceptionMiddle>();

app.UseStatusCodePagesWithReExecute("/errors/{0}");

app.UseStaticFiles();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

//await AppDbInitializer.Seed(app);

app.Run();