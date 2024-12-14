class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.fullNameInput = '#fname';
        this.emailInput = '#email'
        this.addressInput = '#adr';
        this.cityInput = '#city';
        this.stateInput = '#state';
        this.zipInput = '#zip';
        this.nameOnCardInput = '#cname',
        this.creditCardNumberInput = '#ccnum',
        this.expMonthInput = '#expmonth',
        this.expYearInput = '#expyear',
        this.cvvInput = '#cvv',
        this.billingCheckbox = '[name="sameadr"]';
        this.submitButton = this.page.getByText('Continue to checkout', { exact: true });
        this.orderConfirmation = '#order-confirmation';
        this.orderNumber = '[data-id="ordernumber"]';
    }

    async navigate() {
        await this.page.goto('/checkout');
    }

    async completeForm(details) {
        await this.page.fill(this.fullNameInput, details.name);
        await this.page.fill(this.emailInput, details.email); // Incluye email si es necesario
        await this.page.fill(this.addressInput, details.address);
        await this.page.fill(this.cityInput, details.city);
        await this.page.fill(this.stateInput, details.state);
        await this.page.fill(this.zipInput, details.zip);

        // Seleccionar mes y año de expiración
        await this.page.selectOption(this.expMonthInput, details.expMonth); // Value de <option>
        await this.page.fill(this.expYearInput, details.expYear);

        // Completar información de tarjeta de crédito
        await this.page.fill(this.nameOnCardInput, details.cardName);
        await this.page.fill(this.creditCardNumberInput, details.cardNumber);
        await this.page.fill(this.cvvInput, details.cvv);
    }

    async fillPersonalDetails(details) {
        await this.page.fill(this.fullNameInput, details.name);
        await this.page.fill(this.emailInput, details.email);
        await this.page.fill(this.addressInput, details.address);
        await this.page.fill(this.cityInput, details.city);
        await this.page.fill(this.stateInput, details.state);
        await this.page.fill(this.zipInput, details.zip);
    }

    async fillPaymentDetails(details) {
        await this.page.selectOption(this.expMonthInput, details.expMonth);
        await this.page.fill(this.expYearInput, details.expYear);
        await this.page.fill(this.nameOnCardInput, details.cardName);
        await this.page.fill(this.creditCardNumberInput, details.cardNumber);
        await this.page.fill(this.cvvInput, details.cvv);
    }



    async checkBillingCheckbox() {
        const isChecked = await this.page.isChecked(this.billingCheckbox);
        if (!isChecked) {
            await this.page.check(this.billingCheckbox);
        }
    }

    async submitForm() {
        try {
            await this.submitButton.click();
        } catch (error) {
            throw new Error('Error al intentar enviar el formulario: ' + error.message);
        }
    }


    async getOrderNumber() {
        const orderNumber = await this.page.textContent(this.orderNumber);
        if (!orderNumber) {
            throw new Error('No se generó un número de orden.');
        }
        return orderNumber;
    }

}

export default CheckoutPage;
