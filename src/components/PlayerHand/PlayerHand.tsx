import Card from "../Card/Card"
import type { Card as CardType } from "@/utils/interface"

type PlayerHandProps = {
    cards: CardType[];
    onCardClick: (card: CardType) => void
}

export default function PlayerHand({ cards, onCardClick }: PlayerHandProps) {

    return (
        <>
            <div className="flex justify-center gap-1 mt-4">
                {cards.map((card, i) => (
                    <div
                        key={card.code}
                        className="sm:ml-0 -ml-15 first:ml-0 md:ml:0 -ml-15 first:ml-0"
                        style={{zIndex: i}}
                    >
                        <Card  
                            code={card.code} 
                            value={card.value} 
                            showBack={false} 
                            onClick={() => onCardClick(card)}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}