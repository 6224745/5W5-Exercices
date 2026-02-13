using labo.signalr.api.Data;
using labo.signalr.api.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace labo.signalr.api.Hubs
{
    public class TaskHub : Hub
    {
        private readonly ApplicationDbContext _context;
        public TaskHub(ApplicationDbContext context)
        {
            _context = context;
        }

        public override async Task OnConnectedAsync()
        {
            base.OnConnectedAsync();
            // TODO: Ajouter votre logique
            await Clients.Caller.SendAsync("GetAll", await _context.UselessTasks.ToListAsync());
        }
        public async Task Add(string text)
        {

            UselessTask uselessTask = new UselessTask()
            {
                Completed = false,
                Text = text
            };
            _context.UselessTasks.Add(uselessTask);
            await _context.SaveChangesAsync();
            await Clients.All.SendAsync("GetAll", await _context.UselessTasks.ToListAsync());
        }
        public async Task Complete(int id)
        {
            UselessTask? task = await _context.FindAsync<UselessTask>(id);
            if (task != null)
            {
                task.Completed = true;
                await _context.SaveChangesAsync();
            }
            await Clients.All.SendAsync("GetAll", await _context.UselessTasks.ToListAsync());
        }
    }
}
