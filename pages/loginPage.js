export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = '#user-name';
    this.password = '#password';
    this.loginBtn = '#login-button';
  }

  async login() {
    await this.page.goto('https://www.saucedemo.com/');
    await this.page.fill(this.username, 'standard_user');
    await this.page.fill(this.password, 'secret_sauce');
    await this.page.click(this.loginBtn);
  }
}
