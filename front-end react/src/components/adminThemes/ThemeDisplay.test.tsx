import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import ThemeDisplay from "./ThemeDisplay";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");

describe("ThemeDisplay Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetches themes and displays them correctly", () => {
    const themesData = [
      {
        themeId: 1,
        themeName: "Theme 1",
        themePrice: "$10",
        themeDetails: "Theme 1 Details",
      },
      {
        themeId: 2,
        themeName: "Theme 2",
        themePrice: "$20",
        themeDetails: "Theme 2 Details",
      },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: themesData,
    } as AxiosResponse);

    const { getByText } = render(<ThemeDisplay />);

    return waitFor(() => {
      expect(getByText("Theme 1")).toBeInTheDocument();
      expect(getByText("Theme 2")).toBeInTheDocument();
    });
  });

  test("filters themes based on search query", () => {
    const themesData = [
      {
        themeId: 1,
        themeName: "Theme 1",
        themePrice: "$10",
        themeDetails: "Theme 1 Details",
      },
      {
        themeId: 2,
        themeName: "Theme 2",
        themePrice: "$20",
        themeDetails: "Theme 2 Details",
      },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: themesData,
    } as AxiosResponse);

    const { getByText, getByPlaceholderText, queryByText } = render(
      <ThemeDisplay />
    );

    return waitFor(() => {
      expect(getByText("Theme 1")).toBeInTheDocument();
      expect(getByText("Theme 2")).toBeInTheDocument();
    }).then(() => {
      const searchInput = getByPlaceholderText("🔍Search Theme ...");
      fireEvent.change(searchInput, { target: { value: "Theme 1" } });

      return waitFor(() => {
        expect(getByText("Theme 1")).toBeInTheDocument();
        expect(queryByText("Theme 2")).not.toBeInTheDocument();
      });
    });
  });
  test("opens and closes the Delete Theme modal correctly", () => {
    const themesData = [
      {
        themeId: 1,
        themeName: "Theme 1",
        themePrice: "$10",
        themeDetails: "Theme 1 Details",
      },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: themesData,
    } as AxiosResponse);

    const { getByLabelText, queryByText } = render(<ThemeDisplay />);

    return waitFor(() => {
      const deleteIconButtons = document.querySelectorAll(
        'button[aria-label="delete"]'
      );
      const deleteButtonOfFirstTheme = deleteIconButtons[0];
      fireEvent.click(deleteButtonOfFirstTheme);
    })
      .then(() => {
        return waitFor(() => {
          expect(queryByText("Delete Theme")).toBeInTheDocument();
        });
      })
      .then(() => {
        const closeModalButton = getByLabelText("Close"); 
        fireEvent.click(closeModalButton);

        return waitFor(() => {
          expect(queryByText("Delete Theme")).not.toBeInTheDocument();
        });
      });
  });
  test("opens and closes the Edit Theme modal correctly", () => {
    const themesData = [
      {
        themeId: 1,
        themeName: "Theme 1",
        themePrice: "$10",
        themeDetails: "Theme 1 Details",
      },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: themesData,
    } as AxiosResponse);

    const { queryByText } = render(<ThemeDisplay />);

    return waitFor(() => {
      const editIconButtons = document.querySelectorAll(
        'button[aria-label="edit"]'
      );
      const editButtonOfFirstTheme = editIconButtons[0];
      fireEvent.click(editButtonOfFirstTheme);
    })
      .then(() => {
        return waitFor(() => {
          expect(queryByText("Edit Theme")).toBeInTheDocument();
        });
      })

  });
});
