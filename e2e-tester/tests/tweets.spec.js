import { test, expect } from "@playwright/test";

test.describe("Tweet Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.getByRole("link", { name: "Login" }).click();
    await page.getByPlaceholder("Email").fill("test@test.com");
    await page.getByPlaceholder("Password").fill("password123");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL("http://localhost:5173/home");
  });

  test("should create a new tweet", async ({ page }) => {
    const tweetContent = `Test tweet ${Date.now()}`;
    await page.getByPlaceholder("What's happening?").fill(tweetContent);
    await page.getByRole("button", { name: "Tweet" }).click();

    await expect(page.getByText(tweetContent)).toBeVisible();
  });

  test("should like a tweet", async ({ page }) => {
    const likeButton = page.locator('button[aria-label="Like"]').first();
    await likeButton.click();

    const likeCount = await page
      .locator('span[aria-label="Like count"]')
      .first();
    await expect(likeCount).toHaveText("1");
  });

  test("should retweet a tweet", async ({ page }) => {
    const retweetButton = page.locator('button[aria-label="Retweet"]').first();
    await retweetButton.click();

    const retweetCount = await page
      .locator('span[aria-label="Retweet count"]')
      .first();
    await expect(retweetCount).toHaveText("1");
  });

  test("should delete own tweet", async ({ page }) => {
    const tweetContent = `Tweet to delete ${Date.now()}`;
    await page.getByPlaceholder("What's happening?").fill(tweetContent);
    await page.getByRole("button", { name: "Tweet" }).click();

    const deleteButton = page
      .getByText(tweetContent)
      .locator("..")
      .locator('button[aria-label="Delete"]');
    await deleteButton.click();

    await expect(page.getByText(tweetContent)).not.toBeVisible();
  });
});
