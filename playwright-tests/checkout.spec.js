import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';

test('User selects products and completes checkout with validations', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await loginPage.login();
  await expect(page).toHaveURL(/inventory/);

  // Select products
  const selectedProducts = await productsPage.addFirstNItems(3);

  await productsPage.goToCart();

  // ASSERTION #2 – Cart contains same products
  const cartNames = await cartPage.getCartItemNames();
  const selectedNames = selectedProducts.map(p => p.name);

  expect(cartNames).toEqual(expect.arrayContaining(selectedNames));

  await cartPage.proceedToCheckout();

  // Checkout Step One
  await checkoutPage.fillUserDetails();

  // ASSERTION #3 – Item total calculation
  const expectedItemTotal = selectedProducts
    .reduce((sum, p) => sum + p.price, 0);

  const summary = await checkoutPage.getSummaryValues();

  expect(summary.itemTotal).toBeCloseTo(expectedItemTotal, 2);

  // ASSERTION #4 – Item total + tax = total
  expect(summary.itemTotal + summary.tax)
    .toBeCloseTo(summary.total, 2);

  await checkoutPage.finishCheckout();
});
