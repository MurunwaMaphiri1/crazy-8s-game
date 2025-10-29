import Card from "../Card/Card"
import type { Card as CardType } from "@/utils/interface"

type BotHandProps = {
    cards: CardType[];
}

export default function BotHand({ cards }: BotHandProps) {

    return (
        <>
            <div className="flex flex-wrap justify-center gap-1 mt-4 overflow-hidden">
                {cards.map((card) => (
                    <Card key={card.code} code={card.code} value={card.value} showBack={true}/>
                ))}
            </div>
        </>
    )
}