import { test, expect } from "@playwright/test";

test.describe("Login Flow", () => {
  test("should navigate to login page and show login form", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000");

    await expect(page).toHaveURL(/.*loginselect/);

    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.getByPlaceholder("Email")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
  });

  test("should show error with invalid credentials", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await page.getByPlaceholder("Email").fill("invalid@email.com");
    await page.getByPlaceHolder("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Invalid email or password")).toBeVisible();
  });
});
