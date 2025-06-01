import { test, expect } from "@playwright/test";

test.describe("Profile Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.getByRole("link", { name: "Login" }).click();
    await page.getByPlaceholder("Email").fill("test@test.com");
    await page.getByPlaceholder("Password").fill("password123");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL("http://localhost:5173/home");
  });

  test("should view own profile", async ({ page }) => {
    await page.getByRole("link", { name: "Profile" }).click();
    await expect(page).toHaveURL(/.*profile/);
    await expect(page.getByRole("heading", { name: /Profile/ })).toBeVisible();
  });

  test("should update profile information", async ({ page }) => {
    await page.getByRole("link", { name: "Profile" }).click();

    const newBio = `Test bio ${Date.now()}`;
    await page.getByPlaceholder("Write a bio...").fill(newBio);
    await page.getByRole("button", { name: "Save Changes" }).click();

    await expect(page.getByText(newBio)).toBeVisible();
  });

  test("should view other user profiles", async ({ page }) => {
    await page.goto("http://localhost:5173/profile/otheruser");
    await expect(page.getByRole("heading", { name: /Profile/ })).toBeVisible();
  });
});
