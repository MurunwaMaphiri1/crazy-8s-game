import styled from "styled-components"
import { Player } from "@/utils/interface";

const Root = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 40px 70px;
    border-radius: 12px;
    font-size: 2rem;
    .row {
        &.me {
            color: yellow;

            animation: pulse 1s infinite;
        }

        display: flex;
        align-items: center;
        gap: 24px;

        .order {
            width: 50px;
            font-size: 1.5rem;
        }

        .img {
            width: 50px;
        }
    }

    @keyframes pulse {
        50% {
            transform: scale(1.05);
        }
    }
`;

type PlayerProps = {
    id: string;
    name: string;
    imgUrl: string;
}

type ScoreboardProps = {
    leaderboard: Player[];
    playerId: string;
}

export default function Scoreboard({ leaderboard, playerId }: ScoreboardProps) {
    if (!leaderboard || leaderboard.length == 0) {
        return null;
    }

    return (
        <>
            <Root>
                <h2>
                    🏆Final Scores
                </h2>
                {leaderboard.map((player, index) => (
                    <div
                        key={player.id}
                        className={`row ${player.id === playerId ? "me" : ""}`}
                    >
                        <div className="order">{index + 1}</div>
                        <img src={player.avatar} alt={player.name} className="img"/>
                        <div>{player.name}</div>
                    </div>
                ))}
            </Root>
        </>
    )
}