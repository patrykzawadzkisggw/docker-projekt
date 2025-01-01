using Microsoft.AspNetCore.SignalR;
using StackExchange.Redis;
using System.Text.Json;
namespace Backend
{


    public class ChatMessage
    {
        public string User { get; set; }
        public string Message { get; set; }
        public DateTime Timestamp { get; set; }
    }

    public class ChatHub : Hub
    {
        private readonly IConnectionMultiplexer _redis;

        public ChatHub(IConnectionMultiplexer redis)
        {
            _redis = redis;
        }

        public async Task SendMessage(string user, string message)
        {
            var redisDb = _redis.GetDatabase();
            var chatMessage = new ChatMessage
            {
                User = user,
                Message = message,
                Timestamp = DateTime.UtcNow
            };
            await redisDb.ListRightPushAsync("chat:messages", JsonSerializer.Serialize(chatMessage));
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task<IEnumerable<ChatMessage>> GetChatHistory()
        {
            try
            {
                var redisDb = _redis.GetDatabase();
                var messages = await redisDb.ListRangeAsync("chat:messages");
                return messages
                    .Select(m => JsonSerializer.Deserialize<ChatMessage>(m))
                    .Where(m => m != null)
                    .ToList();
            }
            catch
            {
                
                return new List<ChatMessage>();
            }
        }
    }
}



