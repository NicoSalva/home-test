import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login.page';
import CheckoutPage from '../pages/checkout.page';

test.describe('Checkout Form', () => {
  let checkoutPage;

  // Antes de cada test: iniciar sesión y navegar a la página de checkout
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login('johndoe', 'supersecurepassword');
    await checkoutPage.navigate();
  });

  // Test para "Checkout Form Order Success"
  test('TEST04 - Checkout Form Order Success', async () => {
    await checkoutPage.completeForm({
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: '123 Main St',
      city: 'Metropolis',
      state: 'NY',
      zip: '12345',
      cardName: 'John Doe',
      cardNumber: '4111111111111111',
      expMonth: 'January',
      expYear: '2025',
      cvv: '123',
    });

    // Verificar y marcar el checkbox si no está marcado
    await checkoutPage.checkBillingCheckbox();

    await checkoutPage.submitForm();

    // Validar que el número de orden no esté vacío
    const orderNumber = await checkoutPage.getOrderNumber();
    console.log('Order Number:', orderNumber);
    expect(orderNumber).not.toBe('');
  });

  // Test para "Checkout Form Alert"
  test('TEST05 - Checkout Form Alert', async ({ page }) => {
    await checkoutPage.completeForm({
      name: 'John Doe',
      email: 'johndoe@example.com',
      address: '123 Main St',
      city: 'Metropolis',
      state: 'NY',
      zip: '12345',
      cardName: 'John Doe',
      cardNumber: '4111111111111111',
      expMonth: 'January',
      expYear: '2025',
      cvv: '123',
    });

    // Verificar el estado inicial del checkbox y desmarcar si está marcado
    if (await page.isChecked(checkoutPage.billingCheckbox)) {
      await page.uncheck(checkoutPage.billingCheckbox);
    }

    // Capturar alerta con window.alert
    const alertPromise = page.evaluate(() => {
      return new Promise((resolve) => {
        window.alert = (message) => {
          resolve(message);
        };
      });
    });

    await checkoutPage.submitForm();

    const alertMessage = await alertPromise;

    // Validar el mensaje de la alerta
    expect(alertMessage).toContain('Shipping address same as billing checkbox must be selected.');
  });

  test('TEST06 - Cart Total Test', async () => {
    await checkoutPage.navigate();
    const productCount = await checkoutPage.getProductCount();
    const productPrices = await checkoutPage.getProductPricesFromText(productCount);
    const totalPrice = await checkoutPage.getTotalPrice();
    const calculatedTotal = productPrices.reduce((sum, price) => sum + price, 0);

    expect(calculatedTotal).toBe(totalPrice);
  });

});
