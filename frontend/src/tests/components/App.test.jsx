import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../../App";

describe("App Component", () => {
  it("redirects to loginselect page on root path", () => {
    render(<App />);

    expect(window.location.pathname).toBe("/loginselect");
  });

  it("contains all required routes", () => {
    const { container } = render(<App />);

    expect(container.innerHTML).toBeTruthy();

    const routes = [
      "/login",
      "/loginselect",
      "/register",
      "/home/:id",
      "/profile",
      "/profile/:id",
      "/infoCompletion/:id",
    ];

    routes.forEach((route) => {
      expect(document.querySelector(`[path="${route}"]`)).toBeTruthy();
    });
  });
});
