using Backend;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var redisConnectionString = builder.Configuration.GetSection("Redis:ConnectionString").Value;
var multiplexer = ConnectionMultiplexer.Connect(redisConnectionString);
builder.Services.AddSingleton<IConnectionMultiplexer>(multiplexer);

builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:80", "http://frontend:80") 
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); 
    });
});

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigins");

app.MapHub<ChatHub>("/chat");

app.MapGet("/chat/history", async (IConnectionMultiplexer redis) =>
{
    var redisDb = redis.GetDatabase();
    var chatHistory = new List<object>();

    try
    {
        var messages = await redisDb.ListRangeAsync("chat:messages");
        foreach (var message in messages)
        {
            try
            {
                var deserialized = JsonSerializer.Deserialize<object>(message);
                if (deserialized != null)
                {
                    chatHistory.Add(deserialized);
                }
            }
            catch { } 
        }
        return Results.Ok(chatHistory);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error fetching chat history: {ex.Message}");
        return Results.Problem("An error occurred while fetching chat history.");
    }
});



app.UseAuthorization();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    context.Database.Migrate();
    if(!context.Products.Any())
    {
        context.Products.AddRange(
            new Product { Name = "Jabłka", Price = 7, Description="Charakteryzują się słodko-kwaśnym smakiem" },
            new Product { Name = "Pomidory", Price = 8, Description="Dobrze nadają się do sałatek" },
            new Product { Name = "Marchewki", Price = 6, Description=" Charakteryzują się intensywnie pomarańczowym kolorem" }
        );
        context.SaveChanges();
    }
}

app.MapControllers();

app.Run();
