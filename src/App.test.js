import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { act } from "@testing-library/react-hooks";

jest.mock("firebase/auth");

describe("App component", () => {
  test("should render LoginPage when user is not logged in", async () => {
    // Mockear la función onAuthStateChanged para simular que el usuario no está logueado
    getAuth.mockReturnValue({
      onAuthStateChanged: jest.fn((callback) => {
        callback(null); // Pasar null para simular que el usuario no está logueado
      }),
      currentUser: null, // Simular que el usuario no está logueado
    });

    // Renderizar el componente App
    render(<App />);

    // Verificar que se muestra el componente LoginPage
    const loginPage = screen.getByText("Bienvenido/a");
    expect(loginPage).toBeInTheDocument();
  });

  test("should render HomePage when user is logged in", async () => {
    // Mockear la función onAuthStateChanged para simular que el usuario está logueado
    getAuth.mockReturnValue({
      onAuthStateChanged: jest.fn((callback) => {
        callback({ uid: "userUid" }); // Pasar el usuario para simular que está logueado
      }),
      currentUser: { uid: "userUid" }, // Simular que el usuario está logueado
    });

    // Renderizar el componente App
    render(<App />);

    // Verificar que se muestra el componente HomePage
    const homePageCards = screen.getByText("Tus gastos mensuales");
    expect(homePageCards).toBeInTheDocument();
  });
});
