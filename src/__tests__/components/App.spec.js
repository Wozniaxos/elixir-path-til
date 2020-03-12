import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import App from "../../App";

describe("render", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<App />);

    expect(getByTestId("app-main")).toBeTruthy();
  });
});
