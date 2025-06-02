import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../../components/Login";

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

global.fetch = vi.fn();

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Login Component", () => {
  const renderLogin = () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders login form correctly", () => {
    renderLogin();

    expect(screen.getByAltText("Twitter Logo")).toBeInTheDocument();
    expect(screen.getByText("Log in to Twitter 2")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your E-mail address..")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your password details..")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Forgot your password?" })
    ).toBeInTheDocument();
  });

  it("handles successful login", async () => {
    const mockUser = { _id: "123", token: "fake-token", name: "Test User" };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUser),
    });

    renderLogin();

    const emailInput = screen.getByPlaceholderText(
      "Enter your E-mail address.."
    );
    const passwordInput = screen.getByPlaceholderText(
      "Enter your password details.."
    );
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:5001/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "test@example.com",
            password: "password123",
          }),
        }
      );
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "token",
      "fake-token"
    );
    expect(localStorageMock.setItem).toHaveBeenCalledWith("userId", "123");
    expect(mockNavigate).toHaveBeenCalledWith("/home/123", { replace: true });
  });

  it("handles failed login", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: "incorrect email or password" }),
    });

    renderLogin();

    const emailInput = screen.getByPlaceholderText(
      "Enter your E-mail address.."
    );
    const passwordInput = screen.getByPlaceholderText(
      "Enter your password details.."
    );
    const submitButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrong-password" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("incorrect email or password")
      ).toBeInTheDocument();
    });
  });
});
