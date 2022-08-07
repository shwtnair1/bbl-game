import { render } from "@testing-library/react";
import App from "./App";
import React from "react";

describe("App", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<App />);
    const gameTitle = getByTestId("game-title");
    const gameId = getByTestId("game-id");

    expect(gameTitle).toBeDefined();
    expect(gameId).toBeDefined();
  });
});
