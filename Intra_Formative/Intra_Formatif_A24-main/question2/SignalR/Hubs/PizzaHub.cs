using Microsoft.AspNetCore.SignalR;
using SignalR.Services;

namespace SignalR.Hubs
{
    public class PizzaHub : Hub
    {
        private readonly PizzaManager _pizzaManager;

        public PizzaHub(PizzaManager pizzaManager) {
            _pizzaManager = pizzaManager;
        }

        public override async Task OnConnectedAsync()
        {
            _pizzaManager.AddUser();
            await base.OnConnectedAsync();
            await Clients.All.SendAsync("UserConnect", _pizzaManager.NbConnectedUsers);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _pizzaManager.RemoveUser();
            await base.OnConnectedAsync();
            await Clients.All.SendAsync("UserConnect", _pizzaManager.NbConnectedUsers);
        }

        public async Task SelectChoice(PizzaChoice choice)
        {
            string groupeName = _pizzaManager.GetGroupName(choice);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupeName);
            int price = _pizzaManager.PIZZA_PRICES[((int)choice)];
            await Clients.Group(groupeName).SendAsync("PizzaPrice", price);
        }

        public async Task UnselectChoice(PizzaChoice choice)
        {
            string groupeName = _pizzaManager.GetGroupName(choice);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupeName);
        }

        public async Task AddMoney(PizzaChoice choice)
        {
            int money = _pizzaManager.IncreaseMoney(choice);
        }

        public async Task BuyPizza(PizzaChoice choice)
        {
        }
    }
}
