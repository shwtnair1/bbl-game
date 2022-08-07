import { fireEvent, render } from "@testing-library/react";
import GameCard from "./GameCard";
import React from "react";

const mockdata1 = {
  players: [
    {
      name: "Player 1",
      id: "02ir9rj4id",
      imageUrl: "http://localhost:8000/1.png",
    },
    {
      name: "Player 2",
      id: "uikylod61e",
      imageUrl: "http://localhost:8000/2.png",
    },
  ],
  scoreToWin: 10,
  gameId: "te6i4c6hbw",
};

const mockdata2 = {
  players: [],
};

const mockdata3 = {
  players: [
    {
      name: "Player 1",
      id: "02ir9rj4id",
      imageUrl: "http://localhost:8000/1.png",
    },
    {
      name: "Player 2",
      id: "uikylod61e",
      imageUrl: "http://localhost:8000/2.png",
    },
  ],
  scoreToWin: 1,
  gameId: "te6i4c6hbw",
};

describe("GameCard", () => {
  it("renders score to win correctly", () => {
    const { getByTestId } = render(<GameCard {...mockdata1} />);
    const scoreToWin = getByTestId("max-score");

    expect(scoreToWin.textContent).toBe(
      "Score to win: " + mockdata1.scoreToWin
    );
  });

  it("renders list of players correctly", () => {
    const { queryAllByTestId } = render(<GameCard {...mockdata1} />);
    const playerNameElm = queryAllByTestId("player-name");

    expect(playerNameElm).toHaveLength(2);
  });

  it("renders without crashing when no players or score passed", () => {
    const { queryAllByTestId } = render(<GameCard {...mockdata2} />);
    const playerNameElm = queryAllByTestId("player-name");

    expect(playerNameElm).toHaveLength(0);
  });

  it("updates score of Player 1 on roll button clicked", () => {
    const { queryAllByRole, queryAllByTestId } = render(
      <GameCard {...mockdata1} />
    );
    const playerOneButton = queryAllByRole("button");
    fireEvent.click(playerOneButton[0]);

    const playerOneScore = queryAllByTestId("player-score");

    expect(playerOneScore[0].textContent).not.toBe("Score: 0");
  });

  it("points to player 2 after player 1 roll is completed", () => {
    const { queryAllByRole, queryAllByTestId } = render(
      <GameCard {...mockdata1} />
    );
    const playerTwoButton = queryAllByRole("button")[1];
    const playerTwoButtonStatusBeforeClick = playerTwoButton.disabled; // this will be disabled before player 1 roll dice
    const playerOneButton = queryAllByRole("button");
    fireEvent.click(playerOneButton[0]);

    const playerTwoButtonStatusAfterClick = playerTwoButton.disabled; // this is expected to be enabled after player 1 roll dice

    expect(playerTwoButtonStatusAfterClick).not.toBe(
      playerTwoButtonStatusBeforeClick
    );
  });

  it("points to player 2 after player 1 roll is completed", () => {
    const { queryAllByRole } = render(<GameCard {...mockdata1} />);
    const playerTwoButton = queryAllByRole("button")[1];
    const playerTwoButtonStatusBeforeClick = playerTwoButton.disabled; // this will be disabled before player 1 roll dice
    const playerOneButton = queryAllByRole("button")[0];
    fireEvent.click(playerOneButton);

    const playerTwoButtonStatusAfterClick = playerTwoButton.disabled; // this is expected to be enabled after player 1 roll dice

    expect(playerTwoButtonStatusAfterClick).not.toBe(
      playerTwoButtonStatusBeforeClick
    );
  });

  it("points to player 1 again after player 2 roll is completed", () => {
    const { queryAllByRole } = render(<GameCard {...mockdata1} />);
    const playerTwoButton = queryAllByRole("button")[1];
    const playerOneButton = queryAllByRole("button")[0];
    fireEvent.click(playerOneButton); // this will trigger the roll dice handler and the chance is now given to player 2

    const playerOneButtonStatusBeforeClick = playerOneButton.disabled; // this will be disabled after player 1 roll dice

    fireEvent.click(playerTwoButton); // this will trigger the roll dice handler and the chance should now be given to player 1

    const playerOneButtonStatusAfterClick = playerOneButton.disabled; // this is expected to be enabled after player 2 roll dice

    expect(playerOneButtonStatusAfterClick).not.toBe(
      playerOneButtonStatusBeforeClick
    );
  });

  it("displays correct Winning message and correct winner name, when winner is found", () => {
    const { getByTestId, queryAllByRole } = render(<GameCard {...mockdata3} />);
    const playerOneButton = queryAllByRole("button")[0];
    fireEvent.click(playerOneButton);

    const winner = getByTestId("winner-msg");
    const winnerName = getByTestId("player-name");

    expect(winner.textContent).toBe("Congratulations!!");
    expect(winnerName.textContent).toBe(mockdata3.players[0].name);
  });
});
