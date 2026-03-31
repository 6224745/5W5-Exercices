using BonhommePendu.Models;

namespace BonhommePendu.Events
{
    public class GuessedLetterEvent : GameEvent
    {
        public override string EventType { get { return "GuessedLetter"; } }
        public char Letter { get; set; }

        public GuessedLetterEvent(GameData gameData, char letter)
        {
            Letter = letter;
            gameData.GuessedLetters.Add(Letter);
        }
    }
}
