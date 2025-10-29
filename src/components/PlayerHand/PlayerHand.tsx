import Card from "../Card/Card"
import type { Card as CardType } from "@/utils/interface"

type PlayerHandProps = {
    cards: CardType[];
    onCardClick: (card: CardType) => void
}

export default function PlayerHand({ cards, onCardClick }: PlayerHandProps) {

    return (
        <>
            <div className="flex flex-wrap justify-center gap-1 mt-4">
                {cards.map((card) => (
                    <Card 
                        key={card.code} 
                        code={card.code} 
                        value={card.value} 
                        showBack={false} 
                        onClick={() => onCardClick(card)}
                    />
                ))}
            </div>
        </>
    )
}