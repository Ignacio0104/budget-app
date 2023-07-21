import React from "react";
import { prettyDOM, render, screen } from "@testing-library/react";
import App from "./App";
import { getAuth } from "firebase/auth";
import userEvent from "@testing-library/user-event";

jest.mock("firebase/auth");

describe("App component", () => {
  test("should render LoginPage when user is not logged in", async () => {
    // Mockear la función onAuthStateChanged para simular que el usuario no está logueado
    getAuth.mockReturnValue({
      onAuthStateChanged: jest.fn((callback) => {
        callback(null);
      }),
      currentUser: null,
    });
    render(<App />);

    const loginPage = screen.getByText("Bienvenido/a");
    expect(loginPage).toBeInTheDocument();
  });

  test("should render HomePage when user is logged in", async () => {
    getAuth.mockReturnValue({
      onAuthStateChanged: jest.fn((callback) => {
        callback({ uid: "userUid" });
      }),
      currentUser: { uid: "userUid" },
    });

    render(<App />);

    const homePageCards = screen.getByText("Tus gastos mensuales");
    expect(homePageCards).toBeInTheDocument();
  });

  test("should logged out when clicked in Salir", async () => {
    const user = userEvent.setup();
    getAuth.mockReturnValue({
      onAuthStateChanged: jest.fn((callback) => {
        callback({ uid: "userUid" });
      }),
      currentUser: { uid: "userUid" },
    });

    render(<App />);
    const logoutButton = screen.getByText("Salir");
    await user.click(logoutButton);
    const loginPage = screen.getByText("Bienvenido/a");
    expect(loginPage).toBeInTheDocument();
  });
});
