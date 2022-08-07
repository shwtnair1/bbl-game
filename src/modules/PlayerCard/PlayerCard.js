import React from "react";
import Avatar from "../../components/Avatar/Avatar";
import Button from "../../components/Button/Button";
import "./PlayerCard.scss";

const PlayerCard = ({
  name,
  id,
  imageUrl,
  handleRoll,
  score,
  disabled,
  winner,
}) => {
  return (
    <div className="player-card">
      <p data-testid="player-name">{name}</p>
      <div className="player-card__avatar">
        <Avatar image={imageUrl} name={name} />
      </div>
      {!winner ? (
        <>
          <p className="player-card__score" data-testid="player-score">
            Score: {score}
          </p>
          <div className="player-card__button">
            <Button onClick={() => handleRoll(id)} disabled={disabled}>
              Roll
            </Button>
          </div>
        </>
      ) : (
        <h1 data-testid="winner">Winner!</h1>
      )}
    </div>
  );
};

export default PlayerCard;
