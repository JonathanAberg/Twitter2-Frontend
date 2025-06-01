import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../../App";

describe("App Component", () => {
  it.skip("redirects to loginselect page on root path", () => {
    render(<App />);

    expect(window.location.pathname).toBe("/loginselect");
  });

  it.skip("contains all required routes", () => {
    render(<App />);

    expect(screen.getByText("Twitter 2")).toBeInTheDocument();
    expect(screen.getByText("Create account")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });
});
