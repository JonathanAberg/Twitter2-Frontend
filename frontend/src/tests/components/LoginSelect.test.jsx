import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginSelect from "../../components/LoginSelect";

describe("LoginSelect Component", () => {
  const renderLoginSelect = () => {
    render(
      <BrowserRouter>
        <LoginSelect />
      </BrowserRouter>
    );
  };

  it("renders all main elements correctly", () => {
    renderLoginSelect();

    expect(screen.getByAltText("Twitter Logo")).toBeInTheDocument();

    expect(screen.getByText("Twitter 2")).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Create account" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign in" })).toBeInTheDocument();

    expect(screen.getByText("or")).toBeInTheDocument();

    expect(
      screen.getByText(
        /By signing up, you agree to the Terms of Service and Privacy Policy./i
      )
    ).toBeInTheDocument();
  });

  it("has correct navigation links", () => {
    renderLoginSelect();

    const createAccountLink = screen.getByRole("link", {
      name: "Create account",
    });
    const signInLink = screen.getByRole("link", { name: "Sign in" });

    expect(createAccountLink.getAttribute("href")).toBe("/register");
    expect(signInLink.getAttribute("href")).toBe("/login");
  });

  it("renders all footer links", () => {
    renderLoginSelect();

    const footerLinks = [
      "About",
      "Help Center",
      "Terms of Service",
      "Privacy Policy",
      "Cookie Policy",
      "Accessibility",
    ];

    footerLinks.forEach((linkText) => {
      expect(screen.getByText(linkText)).toBeInTheDocument();
    });
  });

  it("applies correct button classes", () => {
    renderLoginSelect();

    const createAccountButton = screen.getByRole("link", {
      name: "Create account",
    });
    const signInButton = screen.getByRole("link", { name: "Sign in" });

    expect(createAccountButton).toHaveClass("twitter-button", "primary-button");
    expect(signInButton).toHaveClass("twitter-button", "secondary-button");
  });
});
