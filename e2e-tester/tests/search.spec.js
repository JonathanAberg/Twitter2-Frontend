import { test, expect } from "@playwright/test";

test.describe("Search Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.getByRole("link", { name: "Login" }).click();
    await page.getByPlaceholder("Email").fill("test@test.com");
    await page.getByPlaceholder("Password").fill("password123");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL("http://localhost:5173/home");
  });

  test("should search for users", async ({ page }) => {
    await page.getByPlaceholder("Search Twitter").fill("testuser");
    await page.keyboard.press("Enter");

    await expect(page.getByText("Search Results")).toBeVisible();
    await expect(page.getByText("testuser")).toBeVisible();
  });

  test("should search for tweets", async ({ page }) => {
    await page.getByPlaceholder("Search Twitter").fill("test tweet");
    await page.keyboard.press("Enter");

    await expect(page.getByText("Search Results")).toBeVisible();
    await expect(page.getByText("test tweet")).toBeVisible();
  });
});
