import { test, expect } from "@playwright/test";

test.describe("Profile Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.getByRole("link", { name: "Sign in" }).click();
    await page
      .getByPlaceholder("Enter your E-mail address..")
      .fill("test@example.com");
    await page
      .getByPlaceholder("Enter your password details..")
      .fill("password123");
    await page.getByRole("button", { name: "Login" }).click();

    const currentUrl = page.url();
    if (currentUrl.includes("/login")) {
      console.log("Login failed, trying to register...");
      await page.goto("http://localhost:5173");
      await page.getByRole("link", { name: "Create account" }).click();

      await page.getByPlaceholder("Name").fill("User");
      await page.getByPlaceholder("E-mail").fill("test@example.com");
      await page.getByPlaceholder("Password").first().fill("password123");
      await page.getByPlaceholder("Confirm password").fill("password123");
      await page.getByRole("button", { name: "Sign Up" }).click();

      await page.waitForTimeout(2000);

      if (page.url().includes("/register")) {
        await page.goto("http://localhost:5173");
        await page.getByRole("link", { name: "Sign in" }).click();
        await page
          .getByPlaceholder("Enter your E-mail address..")
          .fill("test@example.com");
        await page
          .getByPlaceholder("Enter your password details..")
          .fill("password123");
        await page.getByRole("button", { name: "Login" }).click();
      }
    }

    await expect(page).toHaveURL(/.*home\/.*/);
  });

  test("should view own profile", async ({ page }) => {
    await page.getByRole("link", { name: "Profile" }).click();
    await expect(page).toHaveURL(/.*profile/);

    await expect(page.locator("h2.user-name")).toBeVisible({ timeout: 10000 });

    await expect(page.locator("h2.user-name")).toContainText("User", {
      timeout: 10000,
    });
  });

  test("should update profile information", async ({ page }) => {
    await page.getByRole("link", { name: "Profile" }).click();
    await expect(page).toHaveURL(/.*profile/);

    const initialBioLocator = page.locator(".user-bio");

    await page.getByRole("button", { name: "Edit profile" }).click();
    await page.waitForSelector(".modal-content", { state: "visible" });

    const uniqueId = Math.random().toString(36).substring(2, 15);
    const newBioInput = `My Updated Test Bio ${uniqueId}`;

    await page.getByPlaceholder("Your bio").fill(newBioInput);
    await page.getByRole("button", { name: "Save" }).click();
    await page.waitForSelector(".modal-content", { state: "hidden" });
    await page.waitForLoadState("networkidle");

    const updatedBioText = await initialBioLocator.textContent();
    console.log("Updated Bio:", updatedBioText);

    await expect(updatedBioText).not.toBeNull();
    await expect(updatedBioText).not.toBe("");

    await expect(initialBioLocator).toContainText("My Updated Test Bio", {
      timeout: 10000,
    });
  });

  test("should view other user profiles", async ({ page }) => {
    await page.goto("http://localhost:5173/register");
    await page.getByPlaceholder("Name").fill("User Two");
    await page.getByPlaceholder("E-mail").fill("user2@example.com");
    await page.getByPlaceholder("Password").first().fill("password123");
    await page.getByPlaceholder("Confirm password").fill("password123");
    await page.getByRole("button", { name: "Sign Up" }).click();
    await page.waitForURL(/.*(home|profile|register).*/);

    if (!page.url().includes("/home") && !page.url().includes("/profile")) {
      console.log(
        "User Two registration might have failed or stayed on register page. Attempting login as User Two."
      );
      await page.goto("http://localhost:5173/login");
      await page
        .getByPlaceholder("Enter your E-mail address..")
        .fill("user2@example.com");
      await page
        .getByPlaceholder("Enter your password details..")
        .fill("password123");
      await page.getByRole("button", { name: "Login" }).click();
      await page.waitForURL(/.*home\/.*/);
    }

    await page.goto("http://localhost:5173/login");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[type="password"]', "password123");
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForURL(/.*home\/.*/);

    await expect(page.getByPlaceholder("Search Twitter")).toBeVisible({
      timeout: 15000,
    });

    await page.getByPlaceholder("Search Twitter").fill("User Two");
    await page.keyboard.press("Enter");

    await page.waitForSelector("text=User Two", { timeout: 15000 });

    const userTwoHeading = page.locator('h2:has-text("User Two")');
    await expect(userTwoHeading).toBeVisible({ timeout: 15000 });
    await userTwoHeading.click();

    await page.waitForURL(/.*profile\/.*/);

    await expect(page.locator("h2.user-name")).toContainText("User Two", {
      timeout: 15000,
    });
  });
});
