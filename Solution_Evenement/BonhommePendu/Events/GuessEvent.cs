using BonhommePendu.Models;

namespace BonhommePendu.Events
{
    public class GuessEvent : GameEvent
    {
        public override string EventType { get { return "Guess"; } }

        public GuessEvent(GameData gameData, char letter) {
            Events = new List<GameEvent>();

            Events.Add(new GuessedLetterEvent(gameData, letter));

            bool foundAtLeastOneLetter = false;
            
            for (int i = 0; i < gameData.RevealedWord.Length; i++)
            {
                if(gameData.HasSameLetterAtIndex(letter, i))
                {
                    foundAtLeastOneLetter = true;
                    Events.Add(new RevealLetterEvent(gameData, letter, i));
                }
            }

            if(!foundAtLeastOneLetter)
            {
                Events.Add(new WrongGuessEvent(gameData));
            }
        }
    }
}
