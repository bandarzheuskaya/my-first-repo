export class CartPage {
  constructor(page) {
    this.page = page;

    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
    this.checkoutBtn = page.locator('[data-test="checkout"]');
  }

  async goToCheckout() {
    await this.checkoutBtn.click();
  }

  getCartItem(itemName) {
    return this.cartItems.filter({ hasText: itemName });
  }
}
