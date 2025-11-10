import { create } from "zustand"
import type { Card, Player, Suit, Bot } from "@/utils/interface"
import cards from "../utils/deckofcards.json"
import bots from "../utils/bots.json"
import { Deck } from "@/utils/Deck"

const jsonCards = cards as Card[];

type GameStore = {
  players: Player[];
  // deck: Deck;
  deck: Card[];
  discardPile: Card[];
  turnIndex: number;
  suit: Suit | null;
  leaderBoard: Player[];
  cardsDealt: boolean;
  gamesOver: boolean;
  showSuitPicker: boolean;

  setPlayers: (players: Player[]) => void;
  setDeck: (cards: Card[]) => void;
  setDiscardPile: (cards: Card[]) => void;
  setTurnIndex: (index: number) => void;
  setSuit: (suit: Suit | null) => void;
  setCardsDealt: (dealt: boolean) => void;
  setLeaderboard: (players: Player[]) => void;
  setGameOver: (isGameOver: boolean) => void;
  setSuitPicker: (suitPicker: boolean) => void;
  repopulateDeck: () => void;
  advanceTurn: () => void;
  playCard: (card: Card) => void;
  compPlay: () => void;
  handleCardEffect: (card: Card) => void;
  draw: () => void;
  draw2: () => void;
  jumpPlayer: () => void;
  changeSuit: (newSuit: Suit) => void;
  resetGame: () => void;
  initPlayers: () => void;
  dealCards: () => void;
}

const shuffleCards = (jsonCards: Card[]): Card[] => {
      const newCards = [...jsonCards];
      for (let i = newCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newCards[i], newCards[j]] = [newCards[j], newCards[i]]
      }
    return newCards;
}

export const useGameStore = create<GameStore>((set, get) => ({
  players: [],
  // deck: new Deck(jsonCards),
  deck: [...jsonCards],
  discardPile: [],
  turnIndex: 0,
  suit: null,
  leaderBoard: [],
  cardsDealt: false,
  gamesOver: false,
  showSuitPicker: false,

  setPlayers: (players) => set({ players }),
  // setDeck: (cards) => set({ deck: new Deck(cards) }),
  setDeck: (cards) => set({ deck: cards }),
  setDiscardPile: (cards) => set({ discardPile: cards }),
  setTurnIndex: (index) => set({ turnIndex: index }),
  setSuit: (suit) => set({ suit }),
  setCardsDealt: (dealt) => set({ cardsDealt: dealt }),
  setLeaderboard: (leaderBoard) => set({ leaderBoard }),
  setGameOver: (gamesOver) => set({ gamesOver }),
  setSuitPicker: (showSuitPicker) => set({ showSuitPicker }),

  //Craete players array
  initPlayers: () => {
    if (typeof window === "undefined") return;

    const player: Player = {
      id: "1",
      name: localStorage.getItem("playerName") || "Joker",
      avatar: localStorage.getItem("playerImg") || "/images/Persona-5-icons/Joker.jpg",
      cards: [],
      isBot: false,
    };

    const randomBot = bots[Math.floor(Math.random() * bots.length)];

    const bot: Bot = {
      id: "6",
      name: randomBot.name || "Ann",
      avatar: randomBot.avatar || "/images/Persona-5-icons/Ann.jpg",
      cards: [],
      isBot: true,
    };

    set({ players: [player, bot] });
  },

  //Deal cards to players
  dealCards: () => {
    const { deck, players } = get();
    // deck.shuffle();

    let currentDeck = shuffleCards(deck);

    // const shuffleCards = (jsonCards: Card[]): Card[] => {
    //   const newCards = [...jsonCards];
    //   for (let i = deck.length - 1; i > 0; i--) {
    //     const j = Math.floor(Math.random() * (i + 1));
    //     [deck[i], deck[j]] = [deck[j], deck[i]]
    //   }
    //   return newCards;
    // }

    // const updatedPlayers = players.map(player => ({
    //   ...player,
    //   cards: deck.takeCards(8),
    // }));

    const updatedPlayers = players.map(player => {
      const dealtCards = currentDeck.splice(0, 8)
      return {
        ...player,
        cards: dealtCards
      }
    })

    // const updatedPlayers = players.forEach(player => {
    //   player.cards = deck.splice(0,8);
    // })

    // const topCard = deck.takeCard();
    const topCard = currentDeck.shift();

    set({
      players: updatedPlayers,
      deck: currentDeck,
      discardPile: topCard ? [topCard] : [],
      suit: topCard ? topCard.suit : null,
      turnIndex: 0,
      cardsDealt: true,
    });
  },

  //Advance turn
  advanceTurn: () => {
    const { turnIndex, players, setTurnIndex } = get();
    setTurnIndex((turnIndex + 1) % players.length);
  },

  //Repopulate deck
  repopulateDeck: () => {
    const discardPile = get().discardPile;
    const setDeck = get().setDeck;
    const setDiscardPile = get().setDiscardPile;
    const setSuit = get().setSuit;


    const cardsToReshuffle = discardPile.slice(0, -1);
    const reshuffledCards = shuffleCards(cardsToReshuffle);
    const topCard = discardPile[discardPile.length - 1];

    // setDeck(reshuffledCards);
    // // const newDeck = get().deck;
    // // newDeck.shuffle();

    // setDiscardPile([topCard]);
    // setSuit(topCard.suit)
    set({
      deck: reshuffledCards,
      discardPile: [topCard],
      suit: topCard.suit,
    })
  },

  //handleCardEffect
  handleCardEffect: (selected: Card) => {
    const { players, turnIndex, setSuit, setSuitPicker, draw2, jumpPlayer } = get()
    switch (selected.value) {
        case "2":
            draw2();
            break;
        case "JACK":
            jumpPlayer();
            break;
        case "8":
            if (players[turnIndex].isBot == true) {
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

            } else {
                setSuitPicker(true);
            }
            break;
        default:
            break;
    }
  },

  //Draw 1
  draw: () => {
    const { players, turnIndex, deck, setPlayers, advanceTurn } = get();

    if (deck.length === 0) {
      get().repopulateDeck();
      const { deck: repopulateDeck } = get();
      if (repopulateDeck.length === 0) return;
    }

    const currentDeck = get().deck;

    // const drawCard = deck.takeCard();
    const drawCard = currentDeck[0];
    const newDeckCards = currentDeck.splice(1);
    
    if (!drawCard) return;

    const updatedPlayers = players.map((player, index) => 
        index === turnIndex
            ? { ...player, cards: [...player.cards, drawCard] }
            : player
    )

    set({
      players: updatedPlayers,
      deck: newDeckCards
    })

    // setPlayers(updatedPlayers);
    advanceTurn();
  },

  //Draw 2
  draw2: () => {
    const { players, turnIndex, deck, setPlayers, setTurnIndex } = get();

    if (deck.length < 2) {
      get().repopulateDeck();
      const { deck: repopulateDeck } = get();
      if (repopulateDeck.length < 2) return;
    }

    const currentDeck = get().deck;

    // const drawnCards: Card[] = deck.takeCards(2);
    const drawnCards: Card[] = currentDeck.slice(0,2);
    const newDeckCards = currentDeck.slice(2);

    const nextPlayerIndex = (turnIndex + 1) % players.length;

    const updatedPlayers = players.map((player, index) => 
        index === nextPlayerIndex
            ? { ...player, cards: [...player.cards, ...drawnCards] }
            : player
    )

    set({
      players: updatedPlayers,
      deck: newDeckCards
    })

    // setPlayers(updatedPlayers);
    setTurnIndex((turnIndex + 2) % players.length);
  },

  //Jump Player
  jumpPlayer: () => {
    const { setTurnIndex, turnIndex, players } = get();

    setTurnIndex((turnIndex + 2) % players.length)
  },

  //Change suit
  changeSuit: (newSuit: Suit) => {
    const { setSuit, setSuitPicker, advanceTurn } = get();

    setSuit(newSuit);
    setSuitPicker(false);
    advanceTurn();
  },

  //Play card
  playCard: (selected: Card) => {
    const { players, leaderBoard } = get();
    const currentSuit = get().suit;
    const discardPile = get().discardPile;
    const turnIndex = get().turnIndex;
    const setLeaderboard = get().setLeaderboard;
    const setPlayers = get().setPlayers;
    const setGameOver = get().setGameOver;
    const setDiscardPile = get().setDiscardPile;
    const setSuit = get().setSuit;
    const handleCardEffect = get().handleCardEffect;
    const advanceTurn = get().advanceTurn;

    const topCard = discardPile[discardPile.length - 1];

    if (players[turnIndex].isBot === false) {
        if (
            selected.suit === currentSuit ||
            selected.value === topCard.value ||
            selected.value === "8"
        ) {
            let cardRemoved = false;
            const currentPlayerIndex = turnIndex;
            const currentPlayer = players[currentPlayerIndex];

            const newHand = currentPlayer.cards.filter((card) => {
                if (!cardRemoved && card.suit === selected.suit && card.value === selected.value) {
                    cardRemoved = true;
                    return false;
                }
                return true;
            })

            if (newHand.length === 0) {
                const updatedLeaderboard = [...leaderBoard, currentPlayer]
                setLeaderboard(updatedLeaderboard);

                const playersRemaining = players.filter(player => player.id !== currentPlayer.id);

                setPlayers(playersRemaining);

                if (playersRemaining.length === 1) {
                    setLeaderboard([...updatedLeaderboard, playersRemaining[0]]);
                    setGameOver(true);
                    return;
                }
            } else {
                const updatedPlayers = players.map((player, index) => 
                    index === currentPlayerIndex
                        ? { ...player, cards: newHand }
                        : player
                )

                setPlayers(updatedPlayers);

                setDiscardPile([...discardPile, selected]);

                if (selected.value === topCard.value) {
                    setSuit(selected.suit);
                }

                if (selected.value === "JACK" || selected.value === "2") {
                    handleCardEffect(selected);
                } else if (selected.value === "8") {
                    handleCardEffect(selected)
                } else {
                    advanceTurn()
                }
            }
        }
    }
  },

  //Computer play
  compPlay: () => {
    const { players, leaderBoard, draw } = get();
    const currentSuit = get().suit;
    const discardPile = get().discardPile;
    const turnIndex = get().turnIndex;
    const setLeaderboard = get().setLeaderboard;
    const setPlayers = get().setPlayers;
    const setGameOver = get().setGameOver;
    const setDiscardPile = get().setDiscardPile;
    const setSuit = get().setSuit;
    const handleCardEffect = get().handleCardEffect;
    const advanceTurn = get().advanceTurn;

    const topCard = discardPile[discardPile.length - 1];
    const currentPlayer = players[turnIndex];
    let selected;

    for (let card of currentPlayer.cards) {
            if (
                card.suit === currentSuit ||
                card.value === topCard.value ||
                card.value === "8"
            ) {
                selected = card;
                break;
            }
    } 

    if (selected) {
        const updatedHand = currentPlayer.cards.filter((card) => 
            !(card.suit === selected.suit && card.value === selected.value)
        )

        if (updatedHand.length === 0) {
            const updatedLeaderboard = [...leaderBoard, currentPlayer]
            setLeaderboard(updatedLeaderboard);

            const playersWithoutWinner = players.filter(player => player.id !== currentPlayer.id);

            setPlayers(playersWithoutWinner); 
            setDiscardPile([...discardPile, selected]);
                
            if (playersWithoutWinner.length === 1) {
                setLeaderboard([...updatedLeaderboard, playersWithoutWinner[0]]);
                setGameOver(true);
                return;
            }

        } else {
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
                }
    } else {
        draw()
    }
  },

  //Reset Game
  resetGame: () => {
    const freshDeck = shuffleCards(jsonCards);
    set({
      deck: freshDeck,
      players: [],
      discardPile: [],
      turnIndex: 0,
      cardsDealt: false,
    });
  },
}));
