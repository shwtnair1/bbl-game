import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.scss";
import GameCard from "./modules/GameCard/GameCard";

const App = () => {
  const [gameDetails, setGameDetails] = useState({});

  useEffect(() => {
    getGameDetails();

    async function getGameDetails() {
      await axios
        .get("http://localhost:8000/api/game")
        .then((res) => setGameDetails(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="app-container">
      <p className="app-container__match-id" data-testid="game-id">
        Match ID: {gameDetails.matchId}
      </p>
      <h1 className="app-container__game-title" data-testid="game-title">
        SUPER SCORE ROLL
      </h1>
      <GameCard
        players={gameDetails.players || []}
        scoreToWin={gameDetails.scoreToWin}
        gameId={gameDetails.matchId}
      />
    </div>
  );
};

export default App;
