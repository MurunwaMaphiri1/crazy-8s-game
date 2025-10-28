import PlayerHand from "@/components/PlayerHand/PlayerHand";
import BotHand from "@/components/BotHand/BotHand";
import cards from '../../utils/deckofcards.json'
import type { Card, CardValue, Action } from '../../utils/interface'
import DrawingDeck from "@/components/DrawingDeck/DrawingDeck";
import DiscardPile from "@/components/DiscardedPile/DiscardPile";

export default function Example() {
    const jsonCards = cards as Omit<Card, 'action'>[];
  // Example player hand data
  const playerCards = [
    { code: "KD", value: "KING" },             // King of Diamonds
    { code: "2S", value: "2" },             // 2 of Spades
    { code: "6D", value: "6" },             // 6 of Diamonds
    { code: "2S", value: "2" }, // hidden card (shows back)
    { code: "KD", value: "KING" },             // another King of Diamonds
  ];

  const botCards = [
    { code: "7H", value: "7"}
  ]

  const disPile = [
    { code: "8H", value: "8" },
    { code: "9H", value: "9" },
  ]

  return (
    <>
        <div className="flex flex-col items-center min-h-screen justify-center bg-gray-900 ">
            <h1 className="text-white text-lg mb-4">Player Hand Example</h1>
            <PlayerHand cards={playerCards} />
        </div>
        <div className="flex flex-col items-center min-h-screen justify-center bg-gray-900 ">
            <h1 className="text-white text-lg mb-4">Bot Hand Example</h1>
            <BotHand cards={botCards} />
        </div>
        <div className="flex flex-col items-center min-h-screen justify-center bg-gray-900 ">
            <h1 className="text-white text-lg mb-4">Player Hand Example</h1>
            <DrawingDeck deck={jsonCards} />
        </div>
        <div className="flex flex-col items-center min-h-screen justify-center bg-gray-900 ">
            <h1 className="text-white text-lg mb-4">Player Hand Example</h1>
            <DiscardPile cards={disPile} />
        </div>
    </>
  );
}
