import Card from "../Card/Card"
import type { Card as CardType } from "@/utils/interface"

type BotHandProps = {
    cards: CardType[];
}

export default function BotHand({ cards }: BotHandProps) {

    return (
        <>
            <div className="flex justify-center mt-4 items-center">
                {cards.map((card, i) => (
                    <div 
                        key={card.code}
                        className="first:ml-0 -ml-[60px] sm:-ml-8 md:-ml-6"
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