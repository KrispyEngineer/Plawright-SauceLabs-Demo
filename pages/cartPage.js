export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItemNames = page.locator('.inventory_item_name');
    this.checkoutBtn = '#checkout';
  }

  async getCartItemNames() {
    return await this.cartItemNames.allInnerTexts();
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutBtn);
  }
}
