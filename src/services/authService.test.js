import AuthService from "./authService";
import api from "./api";
jest.mock("./api");

describe("authService", () => {
  beforeAll(() => {
    api.__resetMockResponse();
  });

  test("Successfull login setSession token", async () => {
    api.__setMockResponse({ data: { token: "session_token" } });

    let authService = new AuthService();
    await authService.logIn("user", "pass");
    expect(api.setSessionToken).toHaveBeenCalledWith("session_token");
  });
});
