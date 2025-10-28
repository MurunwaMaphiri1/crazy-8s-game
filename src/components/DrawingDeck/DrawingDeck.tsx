import cards from "../../utils/deckofcards.json"
import Image from "next/image"
import Card from "../Card/Card"

type DrawingDeckProps = {
    deck: { code: string; value: string }[]
}

export default function DrawingDeck({ deck }: DrawingDeckProps) {

    if (!deck || deck.length === 0) {

        return (
            <div className="flex items-center justify-center h-[150px] w-[100px] border-2 border-gray-800 rounded-lg bg-gray-300">
                <span className="text-xs text-gray-700">Empty Deck</span>
            </div>
        )
    }

    return (
        <>
            <div className="">
                {deck.slice(-3).map((card, index) => (
                    <div
                        key={`${card.code}`}
                        className="absolute"
                        style={{
                            top: `${index * 3}px`,
                            left: `${index * 3}px`,
                            zIndex: index
                        }}
                    >
                        <Card code={card.code} value={card.value} showBack={true} />
                    </div>
                ))}
            </div>
        </>
    )
}