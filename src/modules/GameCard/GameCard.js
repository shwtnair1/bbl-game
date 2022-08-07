import React, { useState } from "react";
import PlayerCard from "../PlayerCard/PlayerCard";
import "./GameCard.scss";
import axios from "axios";

const GameCard = ({ players, scoreToWin, gameId }) => {
  const [score, setScore] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [winner, setWinner] = useState();

  const handleRoll = async (id) => {
    //Generate a dice roll and set score for the player
    let roll = Math.ceil(Math.random() * 6);
    let newScore = (score[id] || 0) + roll;
    setScore({ ...score, [id]: newScore });

    //Check if the player has won
    if (newScore >= scoreToWin) {
      setWinner(players.filter((player) => player.id === id)[0]);
      try {
        let response = await axios.post("http://localhost:8000/api/game", {
          gameId: gameId,
          winnerId: id,
        });

        if (!response.data.success) {
          throw new Error(response.data.error);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      //Get the previous players index to determine the player who will play next
      let getPlayerIndex = players.findIndex((player) => player.id === id);

      getPlayerIndex < players.length - 1
        ? setCurrentPlayer(getPlayerIndex + 1)
        : setCurrentPlayer(0);
    }
  };

  return (
    <>
      {winner ? (
        <h1 className="winner-msg" data-testid="winner-msg">
          Congratulations!!
        </h1>
      ) : (
        <p className="max-score" data-testid="max-score">
          Score to win: {scoreToWin}
        </p>
      )}

      <div className="game-card">
        {!winner ? (
          players.map((player, i) => {
            return (
              <PlayerCard
                key={player.id}
                {...player}
                score={score[player.id] || 0}
                handleRoll={handleRoll}
                disabled={!(i === currentPlayer)}
              />
            );
          })
        ) : (
          <PlayerCard {...winner} winner={true} score={score} />
        )}
      </div>
    </>
  );
};

export default GameCard;
