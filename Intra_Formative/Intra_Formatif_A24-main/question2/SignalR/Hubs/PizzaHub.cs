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
            await base.OnDisconnectedAsync(exception);
            await Clients.All.SendAsync("UserConnect", _pizzaManager.NbConnectedUsers);
        }

        public async Task SelectChoice(PizzaChoice choice)
        {
            string groupeName = _pizzaManager.GetGroupName(choice);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupeName);
            int price = _pizzaManager.PIZZA_PRICES[(int)choice];
            await Clients.Caller.SendAsync("UpdatePizzaPrice", price);
            int money = _pizzaManager.Money[(int)choice];
            int nbPizza = _pizzaManager.NbPizzas[((int)choice)];
            await Clients.Caller.SendAsync("UpdateNbPizzasAndMoney", nbPizza, money);
        }

        public async Task UnselectChoice(PizzaChoice choice)
        {
            string groupeName = _pizzaManager.GetGroupName(choice);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupeName);
        }

        public async Task AddMoney(PizzaChoice choice)
        {
            _pizzaManager.IncreaseMoney(choice);
            int money = _pizzaManager.Money[(int)choice];
            string groupeName = _pizzaManager.GetGroupName(choice);
            await Clients.Group(groupeName).SendAsync("UpdateMoney", money);
        }

        public async Task BuyPizza(PizzaChoice choice)
        {
            _pizzaManager.BuyPizza(choice);
            int money = _pizzaManager.Money[(int)choice];
            int nbPizzas = _pizzaManager.NbPizzas[(int)choice];
            string groupeName = _pizzaManager.GetGroupName(choice);
            await Clients.Group(groupeName).SendAsync("UpdateNbPizzasAndMoney", nbPizzas, money);
        }
    }
}
