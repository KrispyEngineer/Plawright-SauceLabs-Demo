export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.items = page.locator('.inventory_item');
    this.cartIcon = '.shopping_cart_link';
  }

async addFirstNItems(count = 3) {
  const selectedProducts = [];

  for (let i = 0; i < count; i++) {
    const item = this.items.nth(i);

    const name = await item.locator('.inventory_item_name').innerText();
    const priceText = await item.locator('.inventory_item_price').innerText();
    const price = parseFloat(priceText.replace('$', ''));

    await item.locator('button').click();

    selectedProducts.push({ name, price });
  }

  return selectedProducts;
}

  async goToCart() {
    await this.page.click(this.cartIcon);
  }
}
