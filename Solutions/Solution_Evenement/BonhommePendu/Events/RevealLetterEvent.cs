using BonhommePendu.Models;

namespace BonhommePendu.Events
{
    public class RevealLetterEvent : GameEvent
    {
        public override string EventType { get { return "RevealLetter"; } }

        public char Letter { get; set; }
        public int Index { get; set; }

        public RevealLetterEvent(GameData gameData, char letter, int index)
        {
            Index = index;
            Letter = gameData.RevealLetter(index);
            if(gameData.HasGuessedTheWord)
            {
                Events = new List<GameEvent>
                {
                    new WinEvent(gameData)
                };
            }

            // Conseil: Vous pouvez utiliser gameData.HasGuessedTheWord pour savoir si c'est une victoire

        }
    }
}
