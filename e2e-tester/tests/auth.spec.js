import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should show login and register options on landing page", async ({
    page,
  }) => {
    await expect(
      page.getByRole("heading", { name: "Welcome to Twitter Clone" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Register" })).toBeVisible();
  });

  test("should successfully register a new user", async ({ page }) => {
    const randomUsername = `testuser${Math.floor(Math.random() * 10000)}`;
    const randomEmail = `${randomUsername}@test.com`;

    await page.getByRole("link", { name: "Register" }).click();
    await page.getByPlaceholder("Username").fill(randomUsername);
    await page.getByPlaceHolder("Email").fill(randomEmail);
    await page.getByPlaceHolder("Password").fill("password123");
    await page.getByRole("button", { name: "Register" }).click();

    await expect(page).toHaveURL("http://localhost:3000/home");
  });

  test("should sucessfully login with valid credentials", async ({ page }) => {
    await page.getByRole("link", { name: "Login" }).click();
    await page.getByPlaceholder("Email").fill("test@test.com");
    await page.getByPlaceholder("Password").fill("password123");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL("http://localhost:3000/home");
  });

  test("should show error with invalid login credentials", async ({ page }) => {
    await page.getByRole("link", { name: "Login" }).click();
    await page.getByPlaceholder("Email").fill("wrong@test.com");
    await page.getByPlaceholder("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Invalid email or password")).toBeVisible();
  });
});
