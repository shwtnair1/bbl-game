import { fireEvent, render } from "@testing-library/react";
import PlayerCard from "./PlayerCard";
import React from "react";

const mockdata1 = {
  name: "Player 1",
  id: "3wnl8ggnkm",
  imageUrl: "http://localhost:8000/1.png",
  handleRoll: jest.fn(),
  score: 1,
  disabled: false,
};

const mockdata2 = {
  name: "Player 1",
  id: "3wnl8ggnkm",
  imageUrl: "http://localhost:8000/1.png",
  handleRoll: jest.fn(),
  score: 1,
  disabled: true,
};

describe("PlayerCard", () => {
  it("renders player name correctly", () => {
    const { getByTestId } = render(<PlayerCard {...mockdata1} />);
    const playerNameElm = getByTestId("player-name");

    expect(playerNameElm.textContent).toBe(mockdata1.name);
  });

  it("renders player image correctly", () => {
    const { getByRole } = render(<PlayerCard {...mockdata1} />);
    const playerImage = getByRole("img");

    expect(playerImage.src).toBe(mockdata1.imageUrl);
    expect(playerImage.alt).toBe(mockdata1.name);
  });

  it("renders player score correctly", () => {
    const { getByTestId } = render(<PlayerCard {...mockdata1} />);
    const playerScore = getByTestId("player-score");

    expect(playerScore.textContent).toBe("Score: " + mockdata1.score);
  });

  it("renders roll button correctly", () => {
    const { getByRole } = render(<PlayerCard {...mockdata1} />);
    const rollButton = getByRole("button");

    expect(rollButton).toBeDefined();
  });

  it("renders without crashing when no props passed", () => {
    const { getByTestId } = render(<PlayerCard />);
    const playerName = getByTestId("player-name");

    expect(playerName.textContent).toBe("");
  });

  it("renders disabled button", () => {
    const { getByRole } = render(<PlayerCard {...mockdata2} />);
    const rollButton = getByRole("button");

    expect(rollButton.disabled).toBe(true);
  });

  it("renders enabled button", () => {
    const { getByRole } = render(<PlayerCard {...mockdata1} />);
    const rollButton = getByRole("button");

    expect(rollButton.disabled).toBe(false);
  });

  it("triggers event handler on button click", () => {
    const { getByRole } = render(<PlayerCard {...mockdata1} />);
    const button = getByRole("button");
    fireEvent.click(button);

    expect(mockdata1.handleRoll).toHaveBeenCalledTimes(1);
  });

  it("displays Winner when a player wins", () => {
    const { getByTestId } = render(<PlayerCard {...mockdata1} winner={true} />);
    const winnerElem = getByTestId("winner");

    expect(winnerElem.textContent).toBe("Winner!");
  });

  it("should not display roll button after winner is found", () => {
    const { queryByText } = render(<PlayerCard {...mockdata1} winner={true} />);
    const rollButton = queryByText("Roll");

    expect(rollButton).toBeNull();
  });
});
