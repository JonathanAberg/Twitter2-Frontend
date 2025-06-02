import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/login");

  await page.fill('input[type="email"]', "remanrada8@gmail.com");
  await page.fill('input[type="password"]', "RemRam20");

  const loginButton = page.getByRole("button", { name: "Login" });

  await expect(loginButton).toBeEnabled({ timeout: 15000 });

  await loginButton.click();

  await page.waitForURL(/.*\/home\/.*/, { timeout: 45000 });

  await expect(page.getByPlaceholder("What's happening?")).toBeVisible({
    timeout: 45000,
  });
});

test.describe("Tweet Functionality", () => {
  test("should create a new tweet", async ({ page }) => {
    const uniqueTweetContent = `My new tweet content ${Math.random()
      .toString(36)
      .substring(7)}`;

    await page.getByPlaceholder("What's happening?").fill(uniqueTweetContent);

    await page
      .getByRole("main")
      .getByRole("button", { name: "Tweet", exact: true })
      .first()
      .click();

    await expect(page.getByText(uniqueTweetContent)).toBeVisible({
      timeout: 20000,
    });
  });
});
