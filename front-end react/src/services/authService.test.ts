import AuthLoginService from "./authService";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const userData = {
  email: "epam123@epam.com",
  password: "Epam@123",
};

describe("AuthLoginService", () => {
  it("returns data on successful login", async () => {
    const responseData = { token: "mockToken" };
    mockedAxios.post.mockResolvedValue({ data: responseData });

    const response = await AuthLoginService(userData);

    expect(response.data.token).toEqual("mockToken");
  });

  it("returns error message on failed login", async () => {
    const errorMessage = "Invalid email or password.";
    mockedAxios.post.mockRejectedValue({
      response: { data: { message: errorMessage } },
    });

    const response = await AuthLoginService(userData);

    expect(response.error).toEqual(errorMessage);
  });

  it("returns error message on other errors", async () => {
    const errorMessage = "Unknown error occurred.";
    mockedAxios.post.mockRejectedValue(new Error(errorMessage));

    const response = await AuthLoginService(userData);
    expect(response.error).toEqual(errorMessage);
  });
});
