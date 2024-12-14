class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.submitButton = '#signin-button';
    this.welcomeMessage = '#welcome-message';

  }

  async navigate() {
    await this.page.goto('/login');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
  }

  async getWelcomeMessage() {
    return this.page.textContent(this.welcomeMessage);
  }

  async returnLoginMessage(expectedMessage) {

    const messageLocator = this.page.getByText(expectedMessage, { exact: true });
    await messageLocator.waitFor({ state: 'visible' });
    return await messageLocator.innerText();
  }


}

export default LoginPage;
