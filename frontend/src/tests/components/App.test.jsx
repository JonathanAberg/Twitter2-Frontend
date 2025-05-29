import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../../App";

describe("App Component", () => {
  it("redirects to loginselect page on root path", () => {
    render(<App />);

    expect(window.location.pathname).toBe("/loginselect");
  });

  test("contains all required routes", () => {
    render(<App />);

    expect(screen.getByText("Twitter 2")).toBeInTheDocument();
    expect(screen.getByText("Create account")).toBeInTheDocument();
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });
});
