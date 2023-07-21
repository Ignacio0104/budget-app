import React from "react";
import {
  cleanup,
  getByRole,
  prettyDOM,
  render,
  screen,
} from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { getAuth } from "firebase/auth";
import LoginPage from "../components/pages/LoginPage";
import userEvent from "@testing-library/user-event";
import App from "../App";

jest.mock("firebase/auth");

beforeEach(() => cleanup());

describe("login process works correctly", () => {
  test("should render the login page correctly", async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    const loginTitle = screen.getByRole("heading", { name: "Bienvenido/a" });
    expect(loginTitle).toBeInTheDocument();
  });
  test("should show error when submitting empty form", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    const loginButton = await screen.findByRole("button", {
      name: "Login",
    });
    await user.click(loginButton);
    const errorForms = screen.getAllByRole("textbox");
    errorForms.forEach((element) => {
      expect(element).toHaveClass("input-error");
    });
  });

  test("should specific error when submitting edited form", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    const loginButton = await screen.findByRole("button", {
      name: "Login",
    });

    const inputForms = screen.getAllByRole("textbox");
    await user.type(inputForms[0], "textoPrueba");
    await user.click(loginButton);
    const errorText = await screen.findByText(/valid email/i);
    expect(errorText).toBeInTheDocument();
  });

  test("toogle visibility of password", async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const divContainers = screen.getAllByRole("generic");
    const eyeIconContainer = divContainers.filter((div) =>
      div.classList.contains("eye-icon-container")
    );
    expect(eyeIconContainer[0]).toBeInTheDocument();
    const passwordInput = screen.getByPlaceholderText(/Password.../i);
    expect(passwordInput.type).toBe("password");
    await user.click(eyeIconContainer[0]);
    expect(passwordInput.type).toBe("text");
  });
});

//!Esto no funciona, preguntar!!

describe("forgot password work correctly", () => {
  test("should open the forgot password form when clicking 'Olvidaste tu clave'", async () => {
    const user = userEvent.setup();
    getAuth.mockReturnValue({
      onAuthStateChanged: jest.fn((callback) => {
        callback(null);
      }),
      currentUser: null,
    });
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    const forgotPasswordLink = await screen.findByRole("link", {
      name: /olvidaste tu clave/i,
    });
    await user.click(forgotPasswordLink);
    expect(window.location.href).toContain("/resetPassword");
  });
});

describe("register  work correctly", () => {
  test("should open the register form when clicking 'registrate'", async () => {
    const user = userEvent.setup();
    getAuth.mockReturnValue({
      onAuthStateChanged: jest.fn((callback) => {
        callback(null);
      }),
      currentUser: null,
    });
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    const registerLink = screen.getByRole("link", {
      name: /registrate/i,
    });
    await user.click(registerLink);
    expect(window.location.href).toContain("/register");
  });
});
