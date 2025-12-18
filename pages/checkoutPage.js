export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = '#first-name';
    this.lastName = '#last-name';
    this.postalCode = '#postal-code';
    this.continueBtn = '#continue';

    this.itemTotal = '.summary_subtotal_label';
    this.tax = '.summary_tax_label';
    this.total = '.summary_total_label';
    this.finishBtn = '#finish';
  }

  async fillUserDetails() {
    await this.page.fill(this.firstName, 'Test');
    await this.page.fill(this.lastName, 'User');
    await this.page.fill(this.postalCode, '12345');
    await this.page.click(this.continueBtn);
  }

  async getSummaryValues() {
    const itemTotalText = await this.page.locator(this.itemTotal).innerText();
    const taxText = await this.page.locator(this.tax).innerText();
    const totalText = await this.page.locator(this.total).innerText();

    return {
      itemTotal: parseFloat(itemTotalText.replace('Item total: $', '')),
      tax: parseFloat(taxText.replace('Tax: $', '')),
      total: parseFloat(totalText.replace('Total: $', '')),
    };
  }

  async finishCheckout() {
    await this.page.click(this.finishBtn);
  }
}
