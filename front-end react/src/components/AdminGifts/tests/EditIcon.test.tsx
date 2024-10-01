import React from "react";
import { render, screen } from "@testing-library/react";
import EditIcon from "../icons/EditIcon";

describe("EditIcon", () => {
  it("renders correctly", () => {
    render(<EditIcon />);

    const svgElement = screen.getByTestId('edit-icon');
    expect(svgElement).toBeInTheDocument();
  });
});