"use client"
import { useEffect, useState } from 'react'
import cards from '../../utils/deckofcards.json'
import bots from '../../utils/bots.json'
import type { Card, CardValue, Action } from '../../utils/interface'
import { Deck } from '@/utils/Deck';
import { Player, Bot } from '../../utils/interface';
import PlayerHand from '@/components/PlayerHand/PlayerHand';
import BotHand from '@/components/BotHand/BotHand';
import DrawingDeck from '@/components/DrawingDeck/DrawingDeck';
import DiscardPile from '@/components/DiscardedPile/DiscardPile';
import Scoreboard from '@/components/Scoreboard/Leaderboard'
import next from 'next'

export default function Game() {
    const jsonCards = cards as Card[];
    const [deck, setDeck] = useState(() => new Deck(jsonCards));
    const [players, setPlayers] = useState<Player[]>([]);
    const [discardPile, setDiscardPile] = useState<Card[]>([]);
    const [turnIndex, setTurnIndex] = useState(0);
    const [suit, setSuit] = useState<Card['suit'] | null>(null);
    const [leaderboard, setLeaderboard] = useState<Player[]>([]);
    let [cardsDealt, setCardsDealt] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const player: Player = {
            id: "1",
            name: localStorage.getItem("playerName") || "Joker" as string,
            avatar: localStorage.getItem("playerImg") || "/images/Persona-5-icons/Joker.jpg" as string,
            cards: [],
            isBot: false
        }

        const randomBot = bots[Math.floor(Math.random() * bots.length)];

        const bot: Bot = {
            id: "6",
            name: randomBot.name || "Futaba",
            avatar: randomBot.avatar || "/images/Persona-5-icons/Futaba.jpg",
            cards: [],
            isBot: true
        }

        setPlayers([player, bot]);
        console.log("Player ID:", players.map(p => ({ name: p.name, id: p.id })))
    }, [])

    useEffect(() => {
        if (cardsDealt && players.length > 0 && players[turnIndex]?.isBot == true) {
            const botTimeout = setTimeout(() => {
                compPlay()
            }, 1000);

            return () => clearTimeout(botTimeout);
        }
    }, [turnIndex, cardsDealt, players]);

    useEffect(() => {
        if (deck.cards.length == 0) {
            deck.reset(jsonCards);
            deck.shuffle()
            setDeck(deck)
        }
    },[deck])

    useEffect(() => {
        if (!cardsDealt) return;

        const finishedPlayer = players[turnIndex];

        if (finishedPlayer && finishedPlayer.cards.length === 0) {
            setLeaderboard(prev => [...prev, finishedPlayer]);

            const updatedPlayers = players.filter(player => player.id !== finishedPlayer.id);

            setPlayers(updatedPlayers);

            setTurnIndex(turnIndex % updatedPlayers.length);

            if (updatedPlayers.length === 1) {
                setLeaderboard(prev => [...prev, updatedPlayers[0]]);
                setGameOver(true);
            }
        }
    }, [players, turnIndex, cardsDealt]);


    function deal() {
        deck.shuffle();

        const updatedPlayers = players.map(player => ({
            ...player,
            cards: deck.takeCards(5)
        }))

        const topCard = deck.takeCard();

        if (topCard) {
            setDiscardPile([topCard])
            setSuit(topCard.suit);
        } 

        setPlayers(updatedPlayers);

        setTurnIndex(0);
        setCardsDealt(true);
    }

    function advanceTurn() {
        setTurnIndex((turnIndex + 1) % players.length);
    }

    function playCard(selected: Card) {
        const topCard = discardPile[discardPile.length - 1];

        if (players[turnIndex].isBot == false) {
            if (
                selected.suit === suit ||
                selected.value === topCard.value ||
                selected.value === "8"
            ) {
                let cardRemoved = false;

                const currentPlayer = players[0]; 

                const newHand = currentPlayer.cards.filter((card) => {
                    
                        if (!cardRemoved && card.suit === selected.suit && card.value === selected.value) {
                            cardRemoved = true;
                            return false; // Exclude this card
                        }
                        return true; // Keep all other cards
                });

            const updatedPlayers = players.map((player, index) => 
                index === turnIndex
                    ? { ...player, cards: newHand }
                    : player
            )

            setPlayers(updatedPlayers);
            setDiscardPile((discardPile) => [...discardPile, selected]);

            if (selected.value === topCard.value) {
                setSuit(selected.suit)
            }

            if (selected.value === "JACK" || selected.value === "2") {
                handleCardEffect(selected)
            } else if (selected.value === "8") {
                handleCardEffect(selected)
                advanceTurn()
            } else {
                advanceTurn()
            }

            }
            
        } else {
            draw()
        }
    }
    

    function compPlay() {
        const topCard = discardPile[discardPile.length - 1];
        const currentPlayer = players[turnIndex]
        let selected;

        for (let card of currentPlayer.cards) {
            if (
                card.suit === suit ||
                card.value === topCard.value ||
                card.value === "8"
            ) {
                selected = card;
                break;
            }
        }

        if (selected) {
            const updatedHand = currentPlayer.cards.filter((card) => !(card.suit === selected.suit && card.value === selected.value))

            const updatedPlayers = players.map((player, index) => 
                index === turnIndex
                    ? { ...player, cards: updatedHand }
                    : player
            )

            setPlayers(updatedPlayers);
            setDiscardPile([...discardPile, selected]);

            if (selected.value === topCard.value) {
                setSuit(selected.suit)
            }

            if (selected.value === "JACK" || selected.value === "2") {
                handleCardEffect(selected)
            } else if (selected.value === "8") {
                handleCardEffect(selected)
                advanceTurn()
            } else {
                advanceTurn()
            }

        } else {
            draw()
        }
    }

    function draw() {
            const drawnCard = deck.takeCard();
            if (drawnCard) {
                const updatedPlayers = players.map((player, index) => 
                    index === turnIndex 
                        ? { ...player, cards: [...player.cards, drawnCard] }
                        : player
                );
                setPlayers(updatedPlayers)
            }
            advanceTurn()
    }

    function handleCardEffect(selected: Card) {
        switch (selected.value) {
            case "2":
                draw2();
                break;
            case "JACK":
                jumpPlayer()
                break;
            case "8":
                const suitCount: Record<string, number> = {};

                for (let card of players[turnIndex].cards) {
                    suitCount[card.suit] = (suitCount[card.suit] || 0) + 1;
                }

                let maxCount = 0;
                let chosenSuit: Card['suit'] | null = null;

                for (let [cardSuit, count] of Object.entries(suitCount)) {
                    if (count > maxCount) {
                        maxCount = count;
                        chosenSuit = cardSuit as Card['suit'];
                    }
                }
                setSuit(chosenSuit || selected.suit);
                break;
            default:
                break;
        }
    }

    function jumpPlayer() {
        setTurnIndex((turnIndex + 2) % players.length)
    }


    function draw2() {
        setPlayers(prevPlayers => {
            const drawnCards: Card[] = deck.takeCards(2);
            const nextPlayerIndex = (turnIndex + 1) % prevPlayers.length;
            return prevPlayers.map((player, index) => 
                index === nextPlayerIndex
                    ? { ...player, cards: [...player.cards, ...drawnCards] }
                    : player
            );
        });
        setTurnIndex((turnIndex + 2) % players.length)
    }

    function GameOver() {
        return (
                <>
                    <Scoreboard leaderboard={leaderboard} playerId={players[0].id}/>
                </>
        )
    }
        
    return (
        <>
            {gameOver ? (
                <Scoreboard leaderboard={leaderboard} playerId={leaderboard[0].id} />
            ) : cardsDealt ? (
                    <div className='flex flex-col items-center min-h-screen justify-center bg-[#0f1f3d]'>
                        <div>
                            <BotHand cards={players[1]?.cards || []} />
                        </div>
                        <div className='flex mt-3'>
                            {suit}
                        </div>
                        <div className='flex flex-row gap-4 mt-5 justify-center'>
                            <DrawingDeck onCardClick={draw} deck={deck.cards} />
                            <DiscardPile cards={discardPile} />
                        </div>
                        <div>
                            <PlayerHand onCardClick={playCard} cards={players[0]?.cards || []} />
                        </div>
                    </div>
            ) : (
                    // Show before dealing
                    <div className='flex justify-center items-center min-h-screen bg-[#0f1f3d] text-white'>
                        <button
                            className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 text-xl'
                            onClick={deal}
                        >
                            Deal Cards
                        </button>
                    </div>
            )}
        </>
            );
    }