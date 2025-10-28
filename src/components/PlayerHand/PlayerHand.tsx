import Card from "../Card/Card"

type PlayerHandProps = {
    // playerName: string,
    cards: { code: string; value: string;}[];
}

export default function PlayerHand({ cards }: PlayerHandProps) {

    return (
        <>
            <div className="flex flex-wrap justify-center gap-1 mt-4 overflow-hidden">
                {cards.map((card) => (
                    <Card key={card.code} code={card.code} value={card.value} showBack={false} />
                ))}
            </div>
        </>
    )
}