export class CheckoutStepTwoPage{

    constructor(page) {
    this.page = page;

    this.orderItems = page.locator('[data-test="inventory-item"]');
    this.totalPrice = page.locator('[data-test="total-label"]');
    this.finishBtn = page.locator('[data-test="finish"]');
  }

  async finishCheckout() {
    await this.finishBtn.click();
  }
}