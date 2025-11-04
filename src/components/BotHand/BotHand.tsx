import Card from "../Card/Card"
import type { Card as CardType } from "@/utils/interface"

type BotHandProps = {
    cards: CardType[];
}

export default function BotHand({ cards }: BotHandProps) {

    return (
        <>
            <div className="flex justify-center gap-1 mt-4">
                {cards.map((card, i) => (
                    <div 
                        key={card.code}
                        className="sm:ml-0 -ml-15 first:ml-0"
                        style={{zIndex: i}}
                    >
                        <Card 
                            code={card.code} 
                            value={card.value} 
                            showBack={true}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}