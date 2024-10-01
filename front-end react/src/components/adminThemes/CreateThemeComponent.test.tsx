import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import CreateThemeForm from "./CreateThemeComponent";

jest.mock("axios");

describe("CreateThemeForm", () => {
  let onThemeAddedMock:any;

  beforeEach(() => {
    onThemeAddedMock = jest.fn();
    (axios.post as jest.Mock).mockResolvedValueOnce({});
  });

  test("adds theme on button click", async () => {
    const { getByText, getByLabelText } = render(
      <CreateThemeForm onThemeAdded={onThemeAddedMock} />
    );

    const themeNameInput = getByLabelText(/theme name:/i);
    userEvent.type(themeNameInput, "New Theme");

    const themePriceInput = getByLabelText(/theme price:/i);
    userEvent.type(themePriceInput, "50");

    const themeDetailsInput = getByLabelText(/theme description:/i);
    userEvent.type(themeDetailsInput, "A brand new theme");

    const addButton = getByText(/add/i);
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:4000/admin/addTheme",
        {
          themeName: "New Theme",
          themePrice: "50",
          themeDetails: "A brand new theme",
        }
      );
    });

    
  });
});
