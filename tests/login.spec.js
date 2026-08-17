import { test, expect } from "@playwright/test";

test.describe("Авторизация на SauseDemo", { tag: "@ui" }, () => {
  test("Успешная авторизация", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    await page.getByRole("textbox", { name: "Username" }).fill("standard_user");

    await page.locator("#password").fill("secret_sauce");

    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Неуспешная авторизация с заблокированным пользователем", async ({
    page,
  }) => {
    await page.goto("https://www.saucedemo.com/");

    await page
      .getByRole("textbox", { name: "Username" })
      .fill("locked_out_user");

    await page.locator("#password").fill("secret_sauce");

    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]')).toHaveText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });
});
