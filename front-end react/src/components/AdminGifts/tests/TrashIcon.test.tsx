import React from "react";
import { render, screen } from "@testing-library/react";
import TrashIcon from "../icons/TrashIcon";

describe("EditIcon", () => {
  it("renders correctly", () => {
    render(<TrashIcon />);

    const svgElement = screen.getByTestId('trash-icon');
    expect(svgElement).toBeInTheDocument();
  });
});