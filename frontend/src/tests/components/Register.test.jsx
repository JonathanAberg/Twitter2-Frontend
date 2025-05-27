import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "../../components/Register";

global.fetch = vi.fn();

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Register Component", () => {
  const renderRegister = () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders registration form correctly", () => {
    renderRegister();

    expect(screen.getByAltText("Twitter Logo")).toBeInTheDocument();
    expect(screen.getByText("Create your account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
    expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Log in" })).toBeInTheDocument();
  });

  it("shows error when passwords don't match", async () => {
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm password"), {
      target: { value: "password456" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));
    expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("handles successful registration", async () => {
    const mockUser = { _id: "123", token: "fake-token" };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUser),
    });

    renderRegister();
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholdertext("Confirm password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:5001/api/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Test User",
            email: "test@example.com",
            password: "password123",
          }),
        }
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "token",
        mockUser.token
      );
      expect(mockNavigate).toHaveBeenCalledWith(
        `/infoCompletion/${mockUser._id}`
      );
    });
  });

  it("handles registration failure", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: "Registration failed" }),
    });

    renderRegister();
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(screen.getByText("Registration failed")).toBeInTheDocument();
    });
  });
});
