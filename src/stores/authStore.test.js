import { AuthStore } from "./authStore";

describe("authStore tests", () => {
  test("Successfull logIn sets isLoggedIn to true", async () => {
    let store = new AuthStore({
      onAuthError: jest.fn(),
      logIn: jest.fn().mockResolvedValue({ data: "success" })
    });

    await expect(store.logIn("user", "pass")).resolves.toBe("success");
    expect(store.isLoggedIn).toBe(true);
  });

  test("Failed login changes set does change isLoggedIn state", async () => {
    let store = new AuthStore({
      onAuthError: jest.fn(),
      logIn: jest.fn().mockRejectedValue("error")
    });

    await expect(store.logIn("user", "pass")).rejects.toBe("error");
    expect(store.isLoggedIn).toBe(false);
  });

  test("logOut sets isLoggedIn to false", async () => {
    let store = new AuthStore({
      onAuthError: jest.fn(),
      logIn: jest.fn().mockResolvedValue({ data: "success" }),
      logOut: jest.fn()
    });

    await store.logIn("user", "pass");
    expect(store.isLoggedIn).toBe(true);
    store.logOut();
    expect(store.isLoggedIn).toBe(false);
  });
});
