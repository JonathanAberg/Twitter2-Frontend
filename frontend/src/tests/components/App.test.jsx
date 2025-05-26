import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../../App";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../components/Login", () => ({
  default: () => <div data-testid="login-component">Login Component</div>,
}));

vi.mock("../../components/LoginSelect", () => ({
  default: () => (
    <div data-testid="login-select-component">Login Select Component</div>
  ),
}));

describe("App Component", () => {
  it("navigates to login page correctly", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("login-component")).toBeInTheDocument();
  });

  it("redirects to login select page from root", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("login-select-component")).toBeInTheDocument();
  });
});
