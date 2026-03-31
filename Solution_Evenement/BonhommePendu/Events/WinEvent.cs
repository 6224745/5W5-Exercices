using BonhommePendu.Models;

namespace BonhommePendu.Events
{
    public class WinEvent : GameEvent
    {
        public override string EventType { get { return "Win"; } }

        public WinEvent(GameData gameData) {
            gameData.Won = true;
        }
    }
}
