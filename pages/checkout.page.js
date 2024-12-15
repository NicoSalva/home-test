class CheckoutPage {
    constructor(page) {
      this.page = page;
  
      this.fullNameInput = '#fname';
      this.emailInput = '#email';
      this.addressInput = '#adr';
      this.cityInput = '#city';
      this.stateInput = '#state';
      this.zipInput = '#zip';
      this.nameOnCardInput = '#cname';
      this.creditCardNumberInput = '#ccnum';
      this.expMonthInput = '#expmonth';
      this.expYearInput = '#expyear';
      this.cvvInput = '#cvv';
      this.billingCheckbox = '[name="sameadr"]';
      this.submitButton = this.page.getByText('Continue to checkout', { exact: true });
      this.orderConfirmation = '#order-confirmation';
      this.orderNumber = '[data-id="ordernumber"]';
  
      // Localizadores para productos
      this.productPrices = '.container p:not(:has-text("Total")) span.price';
      this.totalPrice = '.container p:has-text("Total ") span.price > b';
      this.cartHeading = this.page.getByRole('heading', { name: 'Cart ' });
      this.productSelector = (productName) => this.page.getByText(productName);
    }
  
    async navigate() {
      await this.page.goto('/checkout');
    }
  
    async completeForm(details) {
      await this.page.fill(this.fullNameInput, details.name);
      await this.page.fill(this.emailInput, details.email);
      await this.page.fill(this.addressInput, details.address);
      await this.page.fill(this.cityInput, details.city);
      await this.page.fill(this.stateInput, details.state);
      await this.page.fill(this.zipInput, details.zip);
      await this.page.selectOption(this.expMonthInput, details.expMonth);
      await this.page.fill(this.expYearInput, details.expYear);
      await this.page.fill(this.nameOnCardInput, details.cardName);
      await this.page.fill(this.creditCardNumberInput, details.cardNumber);
      await this.page.fill(this.cvvInput, details.cvv);
    }
  
    async checkBillingCheckbox() {
      if (!await this.page.isChecked(this.billingCheckbox)) {
        await this.page.check(this.billingCheckbox);
      }
    }
  
    async submitForm() {
      await this.submitButton.click();
    }
  
    async getOrderNumber() {
      const orderNumber = await this.page.textContent(this.orderNumber);
      if (!orderNumber) {
        throw new Error('No se generó un número de orden.');
      }
      return orderNumber;
    }
  
    async getProductPrices() {
      const pricesText = await this.page.locator(this.productPrices).allTextContents();
      return pricesText.map(price => parseFloat(price.replace('$', '').trim()));
    }
  
    async getProductCount() {
      const cartText = await this.cartHeading.textContent();
      return parseInt(cartText.match(/\d+/)?.[0] || '0', 10);
    }
  
    async getProductPricesFromText(productCount) {
      const prices = [];
      for (let i = 1; i <= productCount; i++) {
        const productPriceText = await this.productSelector(`Product ${i} $`).textContent();
        const match = productPriceText.match(/\$(\d+(\.\d{1,2})?)/);
        prices.push(match ? parseFloat(match[1]) : 0);
      }
      return prices;
    }
  
    async getTotalPrice() {
      const totalText = await this.page.locator(this.totalPrice).textContent();
      return parseFloat(totalText.replace('$', '').trim());
    }
  }
  
  export default CheckoutPage;