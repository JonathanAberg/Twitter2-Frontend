import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("should show login and register options on landing page", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: "Twitter 2" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Create account" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign in" })).toBeVisible();
  });

  test("should navigate to login page", async ({ page }) => {
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

  test("should navigate to register page", async ({ page }) => {
    await page.getByRole("link", { name: "Create account" }).click();
    await expect(
      page.getByRole("heading", { name: "Create your account" })
    ).toBeVisible();
    await expect(page.getByPlaceholder("Name")).toBeVisible();
    await expect(page.getByPlaceholder("E-mail")).toBeVisible();
    await expect(page.getByPlaceholder("Password").first()).toBeVisible();
  });
});
