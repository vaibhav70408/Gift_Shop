import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter as Router } from "react-router-dom";
import Login from "./Login";
import AuthLoginService from "../../services/authService";

jest.mock("../../services/authService");

const mockLoginData = {
  email: "epam123@epam.com",
  password: "Epam@123",
};

describe("Login", () => {
  beforeEach(() => {
    (AuthLoginService as jest.Mock).mockResolvedValue({
      data: { token: "mockToken" },
      error: null,
    });
  });

  afterEach(() => {
    (AuthLoginService as jest.Mock).mockClear();
  });

  it("submits login form with valid data", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
      target: { value: mockLoginData.email },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Password"), {
      target: { value: mockLoginData.password },
    });

    fireEvent.submit(screen.getByTestId("loginForm"));
    await waitFor(() => {
      expect(AuthLoginService).toHaveBeenCalledWith(mockLoginData);
    });
  });

  it("displays error message if login fails", async () => {
    const errorMessage = "Invalid email or password.";

    (AuthLoginService as jest.Mock).mockResolvedValueOnce({
      data: {},
      error: errorMessage,
    });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter Email"), {
      target: { value: mockLoginData.email },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter Password"), {
      target: { value: mockLoginData.password },
    });

    fireEvent.submit(screen.getByTestId("loginForm"));

    await waitFor(() => {
      expect(AuthLoginService).toHaveBeenCalledWith(mockLoginData);
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
