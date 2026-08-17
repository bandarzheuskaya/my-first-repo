// @ts-check
import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutStepOnePage } from "../pages/CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "../pages/CheckoutStepTwoPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";

test("E2E test @ui", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  await loginPage.open();
  await loginPage.login("standard_user", "secret_sauce");

  const title = await inventoryPage.getPageTitle();
  await expect(title).toBe("Products");

  const products = await inventoryPage.getProductsList();
  products.sort((a,b) => b.price - a.price);
  const mostExpensiveProduct = products[0];
  await inventoryPage.addItemToCart(mostExpensiveProduct.name);

  await inventoryPage.openCart();
  const cartProduct = cartPage.getCartItem(mostExpensiveProduct.name)
  await expect(cartProduct).toBeVisible();
  await cartPage.goToCheckout();

  await checkoutStepOnePage.fillUserInfo('Test', 'User', '12345');
  await checkoutStepOnePage.continueToSecondStep();

  await checkoutStepTwoPage.finishCheckout();

  await expect(checkoutCompletePage.getCompletionMessage()).toContainText("Thank you for your order!")

});
