using BonhommePendu.Models;

namespace BonhommePendu.Events
{
    public class WrongGuessEvent : GameEvent
    {
        public override string EventType { get { return "WrongGuess"; } }

        public WrongGuessEvent(GameData gameData) {
            gameData.NbWrongGuesses++;
            if(gameData.NbWrongGuesses >= GameData.NB_WRONG_TRIES_FOR_LOSING)
            {
                Events = new List<GameEvent>
                {
                    new LoseEvent(gameData)
                };
            }
        }
    }
}
