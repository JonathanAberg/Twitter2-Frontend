import { test, expect } from "@playwright/test";

test.describe("Login Flow", () => {
  test("should navigate to login page and show login form", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173");

    await expect(page).toHaveURL(/.*loginselect/);

    await page.getByRole("link", { name: "Sign in" }).click();
    await expect(
      page.getByRole("heading", { name: "Log in to Twitter 2" })
    ).toBeVisible();
    await expect(
      page.getByPlaceholder("Enter your E-mail address..")
    ).toBeVisible();
    await expect(
      page.getByPlaceholder("Enter your password details..")
    ).toBeVisible();
  });

  test("should show error with invalid credentials", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.getByRole("link", { name: "Sign in" }).click();

    await page
      .getByPlaceholder("Enter your E-mail address..")
      .fill("invalid@email.com");
    await page
      .getByPlaceholder("Enter your password details..")
      .fill("wrongpassword");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Invalid email or password")).toBeVisible();
  });
});
